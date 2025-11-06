<?php

namespace Database\Seeders;

use App\Models\Ogloszenie;
use App\Models\Zdjecie;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class EnsureSingleVisiblePhotoSeeder extends Seeder
{
    /**
     * Zapewnij, że każde ogłoszenie ma dokładnie jedno zdjęcie PNG (widoczne w przeglądarce).
     */
    public function run(): void
    {
        $disk = Storage::disk('public');

        // Przygotuj domyślny PNG 1x1 (biały piksel)
        $defaultDir = 'defaults';
        $defaultName = 'ogloszenie1.png';
        $defaultPath = $defaultDir . '/' . $defaultName;
        $pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMBgQ9p6Y0AAAAASUVORK5CYII=';

        if (! $disk->exists($defaultPath)) {
            $disk->makeDirectory($defaultDir);
            $disk->put($defaultPath, base64_decode($pngBase64));
        }

        $listings = Ogloszenie::query()->get();
        $count = 0;

        foreach ($listings as $item) {
            // Usuń wszystkie istniejące zdjęcia wraz z plikami
            $existing = Zdjecie::query()->where('ogloszenie_id', $item->id)->get();
            foreach ($existing as $photo) {
                if ($photo->sciezka && $disk->exists($photo->sciezka)) {
                    $disk->delete($photo->sciezka);
                }
                $photo->delete();
            }

            // Skopiuj domyślne PNG do katalogu ogłoszenia jako jedyne zdjęcie
            $destDir = 'ogloszenia/' . $item->id;
            $destName = 'ogloszenie1.png';
            $destPath = $destDir . '/' . $destName;

            $disk->makeDirectory($destDir);
            if (! $disk->copy($defaultPath, $destPath)) {
                $this->command?->warn("Nie udało się skopiować PNG dla ogłoszenia #{$item->id}");
                continue;
            }

            Zdjecie::create([
                'ogloszenie_id' => $item->id,
                'sciezka' => $destPath,
                'nazwa_pliku' => $destName,
            ]);

            $count++;
        }

        $this->command?->info("Ustawiono pojedyncze widoczne zdjęcie PNG dla ogłoszeń: {$count}.");
    }
}
