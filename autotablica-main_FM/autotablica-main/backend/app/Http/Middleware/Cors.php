<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $request, Closure $next)
    {
        // No-op CORS middleware: Laravel's HandleCors handles CORS globally.
        return $next($request);
    }
}