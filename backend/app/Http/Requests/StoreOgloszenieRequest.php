<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOgloszenieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'tytul' => ['required', 'string', 'max:255'],
            'opis' => ['required', 'string'],
            'cena' => ['required', 'numeric', 'min:0'],
            'marka_id' => ['required', 'integer', 'min:1'],
            'model_id' => ['required', 'integer', 'min:1'],
            'vin' => ['required', 'string', 'max:100'],
            'numer_rejestracyjny' => ['required', 'string', 'max:100'],
            'data_pierwszej_rej' => ['required', 'date'],
            'przebieg' => ['required', 'integer', 'min:0'],
            'rodzaj_paliwa' => ['required', 'string', 'max:50'],
            'skrzynia_biegow' => ['required', 'string', 'max:50'],
            'pojemnosc_silnika' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'string', 'max:50'],
        ];
    }
}
