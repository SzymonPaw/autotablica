<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOgloszenieRequest;
use App\Http\Requests\UpdateOgloszenieRequest;
use App\Http\Resources\OgloszenieCollection;
use App\Http\Resources\OgloszenieResource;
use App\Models\Ogloszenie;
use App\Services\HistoriaPojazdu\HistoriaPojazduManager;
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
            ->whereIn('status', ['aktywne', 'aktywny'])
            ->with(['marka', 'modelPojazdu', 'zdjecia', 'historiaPojazdu']);

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

        $markaFilters = $this->normalizeIds($request->input('marka_ids', $request->input('marka_id')));
        if (! empty($markaFilters)) {
            if (count($markaFilters) === 1) {
                $query->where('marka_id', $markaFilters[0]);
                $filters['marka_id'] = $markaFilters[0];
            } else {
                $query->whereIn('marka_id', $markaFilters);
                $filters['marka_ids'] = $markaFilters;
            }
        }

        $modelFilters = $this->normalizeIds($request->input('model_ids', $request->input('model_id')));
        if (! empty($modelFilters)) {
            if (count($modelFilters) === 1) {
                $query->where('model_id', $modelFilters[0]);
                $filters['model_id'] = $modelFilters[0];
            } else {
                $query->whereIn('model_id', $modelFilters);
                $filters['model_ids'] = $modelFilters;
            }
        }

        if ($request->filled('paliwo')) {
            $value = trim((string) $request->input('paliwo'));
            $query->where('rodzaj_paliwa', $value);
            $filters['paliwo'] = $value;
        }

        if ($request->filled('przebieg_min') && is_numeric($request->input('przebieg_min'))) {
            $value = (int) $request->input('przebieg_min');
            $query->where('przebieg', '>=', $value);
            $filters['przebieg_min'] = $value;
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

        if ($request->filled('moc_min') && is_numeric($request->input('moc_min'))) {
            $value = (int) $request->input('moc_min');
            $query->where('moc_silnika', '>=', $value);
            $filters['moc_min'] = $value;
        }

        if ($request->filled('moc_max') && is_numeric($request->input('moc_max'))) {
            $value = (int) $request->input('moc_max');
            $query->where('moc_silnika', '<=', $value);
            $filters['moc_max'] = $value;
        }

        if ($request->filled('pojemnosc_min') && is_numeric($request->input('pojemnosc_min'))) {
            $value = (float) $request->input('pojemnosc_min');
            $query->where('pojemnosc_silnika', '>=', $value);
            $filters['pojemnosc_min'] = $value;
        }

        if ($request->filled('pojemnosc_max') && is_numeric($request->input('pojemnosc_max'))) {
            $value = (float) $request->input('pojemnosc_max');
            $query->where('pojemnosc_silnika', '<=', $value);
            $filters['pojemnosc_max'] = $value;
        }

        if ($request->filled('skrzynia_biegow')) {
            $value = trim((string) $request->input('skrzynia_biegow'));
            if ($value !== '') {
                $query->where('skrzynia_biegow', $value);
                $filters['skrzynia_biegow'] = $value;
            }
        }

        if ($request->filled('naped')) {
            $value = trim((string) $request->input('naped'));
            if ($value !== '') {
                $query->where('naped', $value);
                $filters['naped'] = $value;
            }
        }

        if ($request->filled('stan')) {
            $value = trim((string) $request->input('stan'));
            if ($value !== '') {
                $query->where('stan', $value);
                $filters['stan'] = $value;
            }
        }

        if ($request->filled('kolor')) {
            $value = trim((string) $request->input('kolor'));
            if ($value !== '') {
                $query->where('kolor', 'like', "%{$value}%");
                $filters['kolor'] = $value;
            }
        }

        if ($request->filled('liczba_drzwi') && is_numeric($request->input('liczba_drzwi'))) {
            $value = (int) $request->input('liczba_drzwi');
            $query->where('liczba_drzwi', $value);
            $filters['liczba_drzwi'] = $value;
        }

        if ($request->filled('liczba_miejsc') && is_numeric($request->input('liczba_miejsc'))) {
            $value = (int) $request->input('liczba_miejsc');
            $query->where('liczba_miejsc', $value);
            $filters['liczba_miejsc'] = $value;
        }

        foreach (['bezwypadkowy', 'pierwszy_wlasciciel', 'serwisowany_w_aso', 'zarejestrowany_w_polsce', 'metalik', 'wypadkowy'] as $booleanField) {
            if ($request->filled($booleanField)) {
                $rawValue = $request->input($booleanField);
                $value = filter_var($rawValue, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                if ($value !== null) {
                    $query->where($booleanField, $value);
                    $filters[$booleanField] = $value;
                }
            }
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
        $user = $request->user();

        if (! $user) {
            abort(401, 'Musisz być zalogowany, aby dodać ogłoszenie.');
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
        $ogloszenie->loadMissing(['marka', 'modelPojazdu', 'zdjecia', 'historiaPojazdu', 'uzytkownik']);

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

    /**
     * Normalize incoming request values into an array of unique positive integers.
     */
    private function normalizeIds($value): array
    {
        if ($value === null || $value === '') {
            return [];
        }

        $items = is_array($value)
            ? $value
            : array_map('trim', explode(',', (string) $value));

        return collect($items)
            ->map(function ($item): ?int {
                if (is_numeric($item)) {
                    return (int) $item;
                }

                return null;
            })
            ->filter(fn (?int $id): bool => $id !== null && $id > 0)
            ->unique()
            ->values()
            ->all();
    }
}
