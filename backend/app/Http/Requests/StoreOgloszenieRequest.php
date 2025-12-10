<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOgloszenieRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Tymczasowo zezwalamy na tworzenie ogłoszeń także bez logowania
        return true;
    }

    public function rules(): array
    {
        return [
            'tytul' => ['required', 'string', 'max:255'],
            'opis' => ['required', 'string'],
            'cena' => ['required', 'numeric', 'min:0'],
            'marka_id' => ['required', 'integer', 'min:1'],
            'model_id' => ['required', 'integer', 'min:1'],
            'rok_produkcji' => ['nullable', 'integer', 'min:1900', 'max:' . (int) date('Y')],
            'vin' => ['required', 'string', 'max:100'],
            'numer_rejestracyjny' => ['required', 'string', 'max:100'],
            'data_pierwszej_rej' => ['required', 'date'],
            'przebieg' => ['required', 'integer', 'min:0'],
            'moc_silnika' => ['nullable', 'integer', 'min:0'],
            'naped' => ['nullable', 'string', 'max:20'],
            'liczba_drzwi' => ['nullable', 'integer', 'min:1', 'max:10'],
            'liczba_miejsc' => ['nullable', 'integer', 'min:1', 'max:10'],
            'kolor' => ['nullable', 'string', 'max:50'],
            'metalik' => ['nullable', 'boolean'],
            'stan' => ['nullable', 'string', 'max:20'],
            'wypadkowy' => ['nullable', 'boolean'],
            'zarejestrowany_w_polsce' => ['nullable', 'boolean'],
            'pierwszy_wlasciciel' => ['nullable', 'boolean'],
            'serwisowany_w_aso' => ['nullable', 'boolean'],
            'bezwypadkowy' => ['nullable', 'boolean'],
            'rodzaj_paliwa' => ['required', 'string', 'max:50'],
            'skrzynia_biegow' => ['required', 'string', 'max:50'],
            'pojemnosc_silnika' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'string', 'max:50'],
            'wyposazenie' => ['nullable', 'array'],
            'wyposazenie.*' => ['boolean'],
        ];
    }
}
