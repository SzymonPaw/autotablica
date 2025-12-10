<?php

namespace App\Providers;

use App\Services\HistoriaPojazdu\HistoriaPojazduClient;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(HistoriaPojazduClient::class, function ($app) {
            return new HistoriaPojazduClient(config('services.historia_pojazdu', []));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by((string) ($request->user()?->getAuthIdentifier() ?? $request->ip()));
        });

        RateLimiter::for('auth-login', function (Request $request) {
            $key = sprintf('login|%s', $request->ip());

            return Limit::perMinute(10)->by($key);
        });

        RateLimiter::for('upload-images', function (Request $request) {
            $identifier = $request->user()?->getAuthIdentifier() ?? $request->ip();

            return Limit::perMinutes(5, 30)->by((string) $identifier);
        });
    }
}
