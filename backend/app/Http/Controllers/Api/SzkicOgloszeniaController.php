<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SzkicOgloszenia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SzkicOgloszeniaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $szkice = SzkicOgloszenia::where('uzytkownik_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $szkice]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tytul' => 'nullable|string|max:255',
            'opis' => 'nullable|string',
            'cena' => 'nullable|numeric|min:0',
            'marka_id' => 'nullable|integer',
            'model_id' => 'nullable|integer',
            'rok_produkcji' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'vin' => 'nullable|string|max:100',
            'numer_rejestracyjny' => 'nullable|string|max:100',
            'data_pierwszej_rej' => 'nullable|date',
            'przebieg' => 'nullable|integer|min:0',
            'moc_silnika' => 'nullable|integer|min:0',
            'naped' => 'nullable|string|max:50',
            'liczba_drzwi' => 'nullable|integer|min:1|max:10',
            'liczba_miejsc' => 'nullable|integer|min:1|max:20',
            'kolor' => 'nullable|string|max:100',
            'metalik' => 'nullable|boolean',
            'stan' => 'nullable|string|max:50',
            'wypadkowy' => 'nullable|boolean',
            'zarejestrowany_w_polsce' => 'nullable|boolean',
            'pierwszy_wlasciciel' => 'nullable|boolean',
            'serwisowany_w_aso' => 'nullable|boolean',
            'bezwypadkowy' => 'nullable|boolean',
            'rodzaj_paliwa' => 'nullable|string|max:50',
            'skrzynia_biegow' => 'nullable|string|max:50',
            'pojemnosc_silnika' => 'nullable|numeric|min:0',
        ]);

        $validated['uzytkownik_id'] = Auth::id();

        $szkic = SzkicOgloszenia::create($validated);

        return response()->json(['data' => $szkic, 'message' => 'Szkic zapisany pomyślnie'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $szkic = SzkicOgloszenia::where('uzytkownik_id', Auth::id())
            ->findOrFail($id);

        return response()->json(['data' => $szkic]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $szkic = SzkicOgloszenia::where('uzytkownik_id', Auth::id())
            ->findOrFail($id);

        $validated = $request->validate([
            'tytul' => 'nullable|string|max:255',
            'opis' => 'nullable|string',
            'cena' => 'nullable|numeric|min:0',
            'marka_id' => 'nullable|integer',
            'model_id' => 'nullable|integer',
            'rok_produkcji' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'vin' => 'nullable|string|max:100',
            'numer_rejestracyjny' => 'nullable|string|max:100',
            'data_pierwszej_rej' => 'nullable|date',
            'przebieg' => 'nullable|integer|min:0',
            'moc_silnika' => 'nullable|integer|min:0',
            'naped' => 'nullable|string|max:50',
            'liczba_drzwi' => 'nullable|integer|min:1|max:10',
            'liczba_miejsc' => 'nullable|integer|min:1|max:20',
            'kolor' => 'nullable|string|max:100',
            'metalik' => 'nullable|boolean',
            'stan' => 'nullable|string|max:50',
            'wypadkowy' => 'nullable|boolean',
            'zarejestrowany_w_polsce' => 'nullable|boolean',
            'pierwszy_wlasciciel' => 'nullable|boolean',
            'serwisowany_w_aso' => 'nullable|boolean',
            'bezwypadkowy' => 'nullable|boolean',
            'rodzaj_paliwa' => 'nullable|string|max:50',
            'skrzynia_biegow' => 'nullable|string|max:50',
            'pojemnosc_silnika' => 'nullable|numeric|min:0',
        ]);

        $szkic->update($validated);

        return response()->json(['data' => $szkic, 'message' => 'Szkic zaktualizowany']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $szkic = SzkicOgloszenia::where('uzytkownik_id', Auth::id())
            ->findOrFail($id);

        $szkic->delete();

        return response()->json(['message' => 'Szkic usunięty']);
    }
}
