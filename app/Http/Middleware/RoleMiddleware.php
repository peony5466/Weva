<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user() || $request->user()->role !== $role) {

            if (!$request->user()) {
                return redirect()->route('login');
            }

            // Redirection selon le rôle réel
            if ($request->user()->role === 'admin') {
                return redirect()->route('dashboard');
            }

            if ($request->user()->role === 'client') {
                return redirect()->route('wevavip'); // ✅ route qui existe
            }

            return redirect()->route('welcome');
        }

        return $next($request);
    }
}
