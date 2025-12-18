<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MarkaResource;
use App\Http\Resources\ModelPojazduResource;
use App\Models\Marka;
use App\Models\ModelPojazdu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SlownikController extends Controller
{
    private const CACHE_TTL_SECONDS = 600;

    public function marki(Request $request): AnonymousResourceCollection
    {
        $marki = Cache::remember(
            'slowniki_marki',
            self::CACHE_TTL_SECONDS,
            static fn (): Collection => Marka::query()
                ->withCount('ogloszenia')
                ->orderBy('nazwa')
                ->get()
        );

        return MarkaResource::collection($marki);
    }

    public function modele(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'marka_id' => ['nullable', 'integer', 'exists:marki,id'],
        ]);

        $markaId = $validated['marka_id'] ?? null;

        $cacheKey = 'slowniki_modele_' . ($markaId ?? 'all');

        $modele = Cache::remember(
            $cacheKey,
            self::CACHE_TTL_SECONDS,
            static function () use ($markaId): Collection {
                $query = ModelPojazdu::query()
                    ->withCount('ogloszenia')
                    ->orderBy('nazwa');

                if ($markaId !== null) {
                    $query->where('marka_id', $markaId);
                }

                return $query->get();
            }
        );

        return ModelPojazduResource::collection($modele);
    }
}
