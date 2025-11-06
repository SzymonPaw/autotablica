<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreZdjecieRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Tymczasowo zezwalamy na wysyłkę zdjęć bez logowania
        return true;
    }

    public function rules(): array
    {
        return [
            'photos' => ['required', 'array', 'min:1', 'max:10'],
            // Dopuszczamy popularne formaty, w tym HEIC/HEIF (iPhone)
            // Podnosimy limit rozmiaru do 10 MB na plik
            'photos.*' => [
                'file',
                'mimes:jpeg,jpg,png,webp,heic,heif',
                'mimetypes:image/jpeg,image/png,image/webp,image/heic,image/heif',
                'max:10240',
            ],
        ];
    }
}
