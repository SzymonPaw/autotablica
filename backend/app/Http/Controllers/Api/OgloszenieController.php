<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOgloszenieRequest;
use App\Http\Requests\UpdateOgloszenieRequest;
use App\Http\Resources\OgloszenieCollection;
use App\Http\Resources\OgloszenieResource;
use App\Models\Ogloszenie;
use App\Models\User;
use App\Services\HistoriaPojazdu\HistoriaPojazduManager;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OgloszenieController extends Controller
{
    public function __construct(private readonly HistoriaPojazduManager $historiaPojazduManager)
    {
    }

    public function index(Request $request): OgloszenieCollection
    {
        $query = Ogloszenie::query()
            ->with(['marka', 'modelPojazdu', 'zdjecia']);

        $filters = [];

        if ($request->filled('q')) {
            $search = trim((string) $request->input('q'));

            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('tytul', 'like', "%{$search}%")
                    ->orWhere('opis', 'like', "%{$search}%")
                    ->orWhere('vin', 'like', "%{$search}%")
                    ->orWhere('numer_rejestracyjny', 'like', "%{$search}%");
            });

            $filters['q'] = $search;
        }

        if ($request->filled('cena_min') && is_numeric($request->input('cena_min'))) {
            $value = (float) $request->input('cena_min');
            $query->where('cena', '>=', $value);
            $filters['cena_min'] = $value;
        }

        if ($request->filled('cena_max') && is_numeric($request->input('cena_max'))) {
            $value = (float) $request->input('cena_max');
            $query->where('cena', '<=', $value);
            $filters['cena_max'] = $value;
        }

        if ($request->filled('marka_id')) {
            $value = (int) $request->input('marka_id');
            $query->where('marka_id', $value);
            $filters['marka_id'] = $value;
        }

        if ($request->filled('model_id')) {
            $value = (int) $request->input('model_id');
            $query->where('model_id', $value);
            $filters['model_id'] = $value;
        }

        if ($request->filled('paliwo')) {
            $value = trim((string) $request->input('paliwo'));
            $query->where('rodzaj_paliwa', $value);
            $filters['paliwo'] = $value;
        }

        if ($request->filled('przebieg_max') && is_numeric($request->input('przebieg_max'))) {
            $value = (int) $request->input('przebieg_max');
            $query->where('przebieg', '<=', $value);
            $filters['przebieg_max'] = $value;
        }

        if ($request->filled('rok_min') && is_numeric($request->input('rok_min'))) {
            $value = (int) $request->input('rok_min');
            $query->whereYear('data_pierwszej_rej', '>=', $value);
            $filters['rok_min'] = $value;
        }

        if ($request->filled('rok_max') && is_numeric($request->input('rok_max'))) {
            $value = (int) $request->input('rok_max');
            $query->whereYear('data_pierwszej_rej', '<=', $value);
            $filters['rok_max'] = $value;
        }

        $sortable = [
            'created_at' => 'created_at',
            'cena' => 'cena',
            'przebieg' => 'przebieg',
            'tytul' => 'tytul',
        ];

        $sortParameters = collect(explode(',', (string) $request->input('sort', '-created_at')))
            ->map(fn (string $value): string => trim($value))
            ->filter()
            ->values();

        if ($sortParameters->isEmpty()) {
            $sortParameters = collect(['-created_at']);
        }

        $appliedSort = [];

        foreach ($sortParameters as $parameter) {
            $direction = Str::startsWith($parameter, '-') ? 'desc' : 'asc';
            $fieldKey = ltrim($parameter, '-');

            if (! array_key_exists($fieldKey, $sortable)) {
                continue;
            }

            $query->orderBy($sortable[$fieldKey], $direction);
            $appliedSort[] = ($direction === 'desc' ? '-' : '') . $fieldKey;
        }

        if (empty($appliedSort)) {
            $query->latest('created_at');
            $appliedSort[] = '-created_at';
        }

        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(1, min($perPage, 50));

        $paginator = $query
            ->paginate($perPage)
            ->appends($request->query());

        return (new OgloszenieCollection($paginator))->additional([
            'filters' => $filters,
            'sort' => $appliedSort,
        ]);
    }

    public function my(Request $request)
    {
        $user = $request->user();

        $listings = Ogloszenie::query()
            ->where('uzytkownik_id', $user?->id)
            ->with(['marka', 'modelPojazdu', 'zdjecia', 'historiaPojazdu'])
            ->latest('created_at')
            ->get();

        return OgloszenieResource::collection($listings);
    }

    public function store(StoreOgloszenieRequest $request): JsonResponse
    {
        $payload = $request->validated();

        // Ustal użytkownika. Najpierw spróbuj z bearer tokenu Sanctum (endpoint jest publiczny),
        // a jeśli brak, użyj/utwórz konto gościa.
        $user = $request->user();

        if (! $user && $request->bearerToken()) {
            $token = PersonalAccessToken::findToken($request->bearerToken());
            if ($token && $token->tokenable instanceof User) {
                $user = $token->tokenable;
            }
        }

        if (! $user) {
            $user = User::firstOrCreate(
                ['email' => 'guest@autotablica.local'],
                [
                    'name' => 'Gość',
                    'password' => bcrypt(Str::random(24)),
                ]
            );
        }

        $ogloszenie = Ogloszenie::create([
            ...$payload,
            'uzytkownik_id' => $user->id,
        ]);

        $this->historiaPojazduManager->refreshForListing($ogloszenie);

        $ogloszenie->load(['marka', 'modelPojazdu', 'zdjecia', 'historiaPojazdu']);

        return (new OgloszenieResource($ogloszenie))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Ogloszenie $ogloszenie): OgloszenieResource
    {
        $ogloszenie->loadMissing(['marka', 'modelPojazdu', 'zdjecia', 'historiaPojazdu']);

        return new OgloszenieResource($ogloszenie);
    }

    public function update(UpdateOgloszenieRequest $request, Ogloszenie $ogloszenie): OgloszenieResource
    {
        $validated = $request->validated();

        $ogloszenie->fill($validated);
        $ogloszenie->save();

        $shouldRefreshHistory = $ogloszenie->wasChanged(['vin', 'numer_rejestracyjny', 'data_pierwszej_rej']);

        if (! $shouldRefreshHistory) {
            $shouldRefreshHistory = ! $ogloszenie->historiaPojazdu()->exists();
        }

        if ($shouldRefreshHistory) {
            $this->historiaPojazduManager->refreshForListing($ogloszenie);
        }

        $ogloszenie->load(['marka', 'modelPojazdu', 'zdjecia', 'historiaPojazdu']);

        return new OgloszenieResource($ogloszenie);
    }

    public function destroy(Ogloszenie $ogloszenie): JsonResponse
    {
        $this->authorize('delete', $ogloszenie);

        $ogloszenie->delete();

        return response()->json(null, 204);
    }
}
