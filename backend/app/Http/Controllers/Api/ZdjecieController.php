<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreZdjecieRequest;
use App\Http\Resources\ZdjecieResource;
use App\Models\Ogloszenie;
use App\Models\Zdjecie;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ZdjecieController extends Controller
{
    public function store(StoreZdjecieRequest $request, Ogloszenie $ogloszenie)
    {
        $this->authorize('update', $ogloszenie);

        $createdPhotos = [];

        foreach ($request->file('photos', []) as $uploadedFile) {
            $path = $uploadedFile->storeAs(
                'ogloszenia/'.$ogloszenie->id,
                Str::uuid().'.'.$uploadedFile->getClientOriginalExtension(),
                'public'
            );

            $createdPhotos[] = $ogloszenie->zdjecia()->create([
                'sciezka' => $path,
                'nazwa_pliku' => $uploadedFile->getClientOriginalName(),
            ]);
        }

        return ZdjecieResource::collection(collect($createdPhotos))
            ->additional([
                'message' => 'Zdjęcia zapisano pomyślnie.',
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(Zdjecie $zdjecie): JsonResponse
    {
        $this->authorize('delete', $zdjecie);

        if ($zdjecie->sciezka) {
            Storage::disk('public')->delete($zdjecie->sciezka);
        }

        $zdjecie->delete();

        return response()->json(null, 204);
    }
}
