<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:255',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|min:10|max:2000',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Message envoyé avec succès !');
    }
}