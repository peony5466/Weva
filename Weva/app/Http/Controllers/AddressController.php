<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = Auth::user()->addresses()->orderBy('is_default', 'desc')->get();

        return Inertia::render('client/addresses', [
            'addresses' => $addresses,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'is_default' => 'nullable|boolean',
        ]);

        $user = Auth::user();

        if ($request->boolean('is_default')) {
            $user->addresses()->update(['is_default' => false]);
        }

        $address = $user->addresses()->create($validated);

        return redirect()->back()->with('success', 'Adresse ajoutée avec succès');
    }

    public function update(Request $request, Address $address)
    {
        $this->authorize('update', $address);

        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'is_default' => 'nullable|boolean',
        ]);

        $user = Auth::user();

        if ($request->boolean('is_default')) {
            $user->addresses()->where('id', '!=', $address->id)->update(['is_default' => false]);
        }

        $address->update($validated);

        return redirect()->back()->with('success', 'Adresse mise à jour');
    }

    public function destroy(Address $address)
    {
        $this->authorize('destroy', $address);

        $address->delete();

        return redirect()->back()->with('success', 'Adresse supprimée');
    }

    public function setDefault(Address $address)
    {
        $this->authorize('update', $address);

        Auth::user()->addresses()->update(['is_default' => false]);
        $address->update(['is_default' => true]);

        return redirect()->back()->with('success', 'Adresse par défaut définie');
    }
}
