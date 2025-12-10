<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OgloszenieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'uzytkownik_id' => $this->uzytkownik_id,
            'tytul' => $this->tytul,
            'opis' => $this->opis,
            'cena' => $this->cena !== null ? (float) $this->cena : null,
            'marka_id' => $this->marka_id,
            'model_id' => $this->model_id,
            'rok_produkcji' => $this->rok_produkcji,
            'vin' => $this->vin,
            'numer_rejestracyjny' => $this->numer_rejestracyjny,
            'data_pierwszej_rej' => $this->data_pierwszej_rej?->format('Y-m-d'),
            'przebieg' => $this->przebieg,
            'moc_silnika' => $this->moc_silnika,
            'naped' => $this->naped,
            'liczba_drzwi' => $this->liczba_drzwi,
            'liczba_miejsc' => $this->liczba_miejsc,
            'kolor' => $this->kolor,
            'metalik' => $this->metalik,
            'stan' => $this->stan,
            'wypadkowy' => $this->wypadkowy,
            'zarejestrowany_w_polsce' => $this->zarejestrowany_w_polsce,
            'pierwszy_wlasciciel' => $this->pierwszy_wlasciciel,
            'serwisowany_w_aso' => $this->serwisowany_w_aso,
            'bezwypadkowy' => $this->bezwypadkowy,
            'rodzaj_paliwa' => $this->rodzaj_paliwa,
            'skrzynia_biegow' => $this->skrzynia_biegow,
            'pojemnosc_silnika' => $this->pojemnosc_silnika !== null ? (float) $this->pojemnosc_silnika : null,
            'status' => $this->status,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'marka' => $this->whenLoaded('marka', function () {
                return [
                    'id' => $this->marka->id,
                    'nazwa' => $this->marka->nazwa,
                ];
            }),
            'model' => $this->whenLoaded('modelPojazdu', function () {
                return [
                    'id' => $this->modelPojazdu->id,
                    'nazwa' => $this->modelPojazdu->nazwa,
                ];
            }),
            'zdjecia' => ZdjecieResource::collection($this->whenLoaded('zdjecia')),
            'historia_pojazdu' => $this->whenLoaded('historiaPojazdu', function () {
                return [
                    'status' => $this->historiaPojazdu->status,
                    'payload' => $this->historiaPojazdu->payload,
                    'fetched_at' => $this->historiaPojazdu->fetched_at?->toIso8601String(),
                    'last_error_message' => $this->historiaPojazdu->last_error_message,
                ];
            }),
        ];
    }
}
