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
        // Si l'utilisateur n'est pas connecté ou n'a pas le bon rôle
        if (!$request->user() || $request->user()->role !== $role) {
            // Si c'est un client, on l'envoie vers son espace "Avatar"
            if ($request->user() && $request->user()->role === 'client') {
                return redirect()->route('avatar');
            }
            // Sinon (visiteur), retour à l'accueil ou login
            return redirect()->route('login');
        }

        return $next($request);
    }
}
