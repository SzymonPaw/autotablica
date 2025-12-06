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
            'vin' => ['sometimes', 'string', 'max:100'],
            'numer_rejestracyjny' => ['sometimes', 'string', 'max:100'],
            'data_pierwszej_rej' => ['sometimes', 'date'],
            'przebieg' => ['sometimes', 'integer', 'min:0'],
            'rodzaj_paliwa' => ['sometimes', 'string', 'max:50'],
            'skrzynia_biegow' => ['sometimes', 'string', 'max:50'],
            'pojemnosc_silnika' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'status' => ['sometimes', 'string', 'max:50'],
        ];
    }
}
