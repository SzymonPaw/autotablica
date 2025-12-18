<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    private const CACHE_TTL_SECONDS = 300;

    public function popular(): array
    {
        return Cache::remember('stats_popular_brands_models', self::CACHE_TTL_SECONDS, function (): array {
            $brandStats = DB::table('ogloszenia')
                ->select('marki.id', 'marki.nazwa', DB::raw('COUNT(ogloszenia.id) as listings_count'))
                ->join('marki', 'marki.id', '=', 'ogloszenia.marka_id')
                ->whereIn('ogloszenia.status', ['aktywne', 'aktywny'])
                ->groupBy('marki.id', 'marki.nazwa')
                ->orderByDesc('listings_count')
                ->limit(10)
                ->get();

            $modelStats = DB::table('ogloszenia')
                ->select(
                    'modele.id',
                    'modele.nazwa',
                    'marki.id as marka_id',
                    'marki.nazwa as marka_nazwa',
                    DB::raw('COUNT(ogloszenia.id) as listings_count')
                )
                ->join('modele', 'modele.id', '=', 'ogloszenia.model_id')
                ->join('marki', 'marki.id', '=', 'modele.marka_id')
                ->whereIn('ogloszenia.status', ['aktywne', 'aktywny'])
                ->groupBy('modele.id', 'modele.nazwa', 'marki.id', 'marki.nazwa')
                ->orderByDesc('listings_count')
                ->limit(10)
                ->get();

            return [
                'brands' => $brandStats,
                'models' => $modelStats,
            ];
        });
    }
}
