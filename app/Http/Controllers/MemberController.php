<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MemberController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/users/index', [
            'users' => User::latest()->get()
        ]);
    }

    // AJOUTE CETTE MÉTHODE ICI
    public function create()
    {
        return Inertia::render('admin/users/create');
        // Assure-toi que le fichier est bien dans resources/js/Pages/admin/users/Create.jsx
    }

    public function toggleBan(User $user)
    {
        $user->status = $user->status === 'Banned' ? 'Active' : 'Banned';
        $user->save();
        return back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role'     => 'required|string|in:admin,client', // <--- Changé 'user' en 'client'
        ]);

        User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role'     => $validated['role'], // Sera soit 'admin' soit 'client'
            'status'   => 'Active',
        ]);

        return redirect()->route('admin.users.index');
    }
}
