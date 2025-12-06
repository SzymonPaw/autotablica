<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ZdjecieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'ogloszenie_id' => $this->ogloszenie_id,
            'sciezka' => $this->sciezka,
            'nazwa_pliku' => $this->nazwa_pliku,
            'url' => $this->sciezka ? Storage::disk('public')->url($this->sciezka) : null,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
