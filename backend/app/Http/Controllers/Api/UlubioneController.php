<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OgloszenieCollection;
use App\Models\Ogloszenie;
use App\Models\Ulubione;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UlubioneController extends Controller
{
    public function index(Request $request): OgloszenieCollection
    {
        $user = $request->user();

        $query = Ogloszenie::query()
            ->with(['marka', 'modelPojazdu', 'zdjecia', 'historiaPojazdu'])
            ->whereHas('ulubione', function ($builder) use ($user): void {
                $builder->where('uzytkownik_id', $user->id);
            });

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
            'filters' => [
                'ulubione' => true,
            ],
            'sort' => $appliedSort,
        ]);
    }

    public function store(Request $request, Ogloszenie $ogloszenie): JsonResponse
    {
        $user = $request->user();

        $favorite = Ulubione::firstOrCreate([
            'uzytkownik_id' => $user->id,
            'ogloszenie_id' => $ogloszenie->id,
        ]);

        $status = $favorite->wasRecentlyCreated ? 201 : 200;

        return response()->json([
            'message' => $favorite->wasRecentlyCreated
                ? 'Dodano ogłoszenie do ulubionych.'
                : 'Ogłoszenie już było w ulubionych.',
        ], $status);
    }

    public function destroy(Request $request, Ogloszenie $ogloszenie): JsonResponse
    {
        $user = $request->user();

        $deleted = Ulubione::where('uzytkownik_id', $user->id)
            ->where('ogloszenie_id', $ogloszenie->id)
            ->delete();

        if (! $deleted) {
            return response()->json([
                'message' => 'Ogłoszenie nie znajdowało się w ulubionych.',
            ]);
        }

        return response()->json(null, 204);
    }
}
