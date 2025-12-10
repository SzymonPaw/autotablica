<?php

namespace App\Http\Requests;

use App\Models\Ogloszenie;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOgloszenieRequest extends FormRequest
{
    public function authorize(): bool
    {
        $ogloszenie = $this->route('ogloszenie');

        if (! $ogloszenie instanceof Ogloszenie) {
            return false;
        }

        return $this->user()?->can('update', $ogloszenie) ?? false;
    }

    public function rules(): array
    {
        return [
            'tytul' => ['sometimes', 'string', 'max:255'],
            'opis' => ['sometimes', 'string'],
            'cena' => ['sometimes', 'numeric', 'min:0'],
            'marka_id' => ['sometimes', 'integer', 'min:1'],
            'model_id' => ['sometimes', 'integer', 'min:1'],
            'rok_produkcji' => ['sometimes', 'nullable', 'integer', 'min:1900', 'max:' . (int) date('Y')],
            'vin' => ['sometimes', 'string', 'max:100'],
            'numer_rejestracyjny' => ['sometimes', 'string', 'max:100'],
            'data_pierwszej_rej' => ['sometimes', 'date'],
            'przebieg' => ['sometimes', 'integer', 'min:0'],
            'moc_silnika' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'naped' => ['sometimes', 'nullable', 'string', 'max:20'],
            'liczba_drzwi' => ['sometimes', 'nullable', 'integer', 'min:1', 'max:10'],
            'liczba_miejsc' => ['sometimes', 'nullable', 'integer', 'min:1', 'max:10'],
            'kolor' => ['sometimes', 'nullable', 'string', 'max:50'],
            'metalik' => ['sometimes', 'nullable', 'boolean'],
            'stan' => ['sometimes', 'nullable', 'string', 'max:20'],
            'wypadkowy' => ['sometimes', 'nullable', 'boolean'],
            'zarejestrowany_w_polsce' => ['sometimes', 'nullable', 'boolean'],
            'pierwszy_wlasciciel' => ['sometimes', 'nullable', 'boolean'],
            'serwisowany_w_aso' => ['sometimes', 'nullable', 'boolean'],
            'bezwypadkowy' => ['sometimes', 'nullable', 'boolean'],
            'rodzaj_paliwa' => ['sometimes', 'string', 'max:50'],
            'skrzynia_biegow' => ['sometimes', 'string', 'max:50'],
            'pojemnosc_silnika' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'status' => ['sometimes', 'string', 'max:50'],
            'wyposazenie' => ['sometimes', 'nullable', 'array'],
            'wyposazenie.*' => ['boolean'],
        ];
    }
}
