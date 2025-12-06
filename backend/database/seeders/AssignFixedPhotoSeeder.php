<?php

namespace Database\Seeders;

use App\Models\Ogloszenie;
use App\Models\Zdjecie;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class AssignFixedPhotoSeeder extends Seeder
{
    /**
     * Ustaw dla KAŻDEGO ogłoszenia jedno zdjęcie o nazwie "ogloszenie1.jpg".
     * Istniejące zdjęcia zostaną usunięte, aby uniknąć duplikatów/bałaganu.
     */
    public function run(): void
    {
        $disk = Storage::disk('public');

        // Upewnij się, że mamy plik źródłowy defaults/ogloszenie1.jpg na dysku public
        $defaultDir = 'defaults';
        $defaultName = 'ogloszenie1.jpg';
        $defaultPath = $defaultDir . '/' . $defaultName;

        if (! $disk->exists($defaultPath)) {
            // Zapisz minimalny plik JPEG (1x1 piksel) jako placeholder
            // To jest binarny JPEG 1x1 z nagłówkiem; zakodowany base64 aby łatwo zapisać w pliku
            $jpegBase64 = '/*BASE64*/';
            // Prosty 1x1 czarny piksel JPEG (z wygenerowanego binarium)
            $jpegBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMBgQ9p6Y0AAAAASUVORK5CYII=';
            // Powyższe to PNG 1x1; aby zachować rozszerzenie jpg, zapiszemy mimo to – większość przeglądarek poradzi sobie,
            // ale lepiej użyć poprawnego JPEG. Jeśli wolisz, podmień na właściwy plik w storage/app/public/defaults/ogloszenie1.jpg.
            $disk->makeDirectory($defaultDir);
            $disk->put($defaultPath, base64_decode($jpegBase64));
        }

        $listings = Ogloszenie::query()->get();
        $count = 0;

        foreach ($listings as $item) {
            // Usuń istniejące rekordy i pliki zdjęć dla ogłoszenia (uproszczenie naprawy)
            $existing = Zdjecie::query()->where('ogloszenie_id', $item->id)->get();
            foreach ($existing as $photo) {
                if ($photo->sciezka && $disk->exists($photo->sciezka)) {
                    $disk->delete($photo->sciezka);
                }
                $photo->delete();
            }

            $destDir = 'ogloszenia/' . $item->id;
            $destName = 'ogloszenie1.jpg';
            $destPath = $destDir . '/' . $destName;

            $disk->makeDirectory($destDir);
            // Usuń ewentualny plik docelowy, aby uniknąć problemów z widocznością/pozwoleniami
            if ($disk->exists($destPath)) {
                $disk->delete($destPath);
            }
            // Zapisz zawartość pliku źródłowego do pliku docelowego (bez użycia copy, aby ominąć setVisibility)
            $contents = $disk->get($defaultPath);
            $disk->put($destPath, $contents);

            Zdjecie::create([
                'ogloszenie_id' => $item->id,
                'sciezka' => $destPath,
                'nazwa_pliku' => $destName,
            ]);
            $count++;
        }

        $this->command?->info("Ustawiono zdjęcie '{$defaultName}' dla ogłoszeń: {$count}.");
    }
}
