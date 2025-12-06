<?php

namespace App\Providers;

use App\Models\Ogloszenie;
use App\Models\Zdjecie;
use App\Policies\OgloszeniePolicy;
use App\Policies\ZdjeciePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Ogloszenie::class => OgloszeniePolicy::class,
        Zdjecie::class => ZdjeciePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
