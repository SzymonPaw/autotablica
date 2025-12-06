<?php

namespace Database\Seeders;

use App\Models\Ogloszenie;
use App\Models\Zdjecie;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AssignRandomPhotosSeeder extends Seeder
{
    /**
     * Uruchom seeder: dla ogłoszeń bez zdjęć przypisz losowe zdjęcia
     * skopiowane z już istniejących.
     */
    public function run(): void
    {
        $disk = Storage::disk('public');

        // Zbierz pulę istniejących zdjęć jako źródła
        $sourcePhotos = Zdjecie::query()
            ->whereNotNull('sciezka')
            ->get()
            ->filter(function (Zdjecie $z) use ($disk) {
                return $z->sciezka && $disk->exists($z->sciezka);
            })
            ->values();

        if ($sourcePhotos->isEmpty()) {
            $this->command?->warn('Brak źródłowych zdjęć do skopiowania.');
            return;
        }

        // Ogłoszenia bez zdjęć
        $targets = Ogloszenie::query()
            ->doesntHave('zdjecia')
            ->get();

        if ($targets->isEmpty()) {
            $this->command?->info('Brak ogłoszeń wymagających przypisania zdjęć.');
            return;
        }

        $assignedCount = 0;

        foreach ($targets as $ogloszenie) {
            // Losowo 1-3 zdjęcia
            $count = random_int(1, 3);
            $picked = $sourcePhotos->shuffle()->take($count);

            foreach ($picked as $src) {
                $ext = pathinfo($src->nazwa_pliku ?: $src->sciezka, PATHINFO_EXTENSION);
                $filename = (string) Str::uuid() . ($ext ? ('.' . $ext) : '');
                $destDir = 'ogloszenia/' . $ogloszenie->id;
                $destPath = $destDir . '/' . $filename;

                // Upewnij się, że katalog docelowy istnieje
                $disk->makeDirectory($destDir);

                // Skopiuj plik w obrębie tego samego dysku
                $copied = $disk->copy($src->sciezka, $destPath);
                if (! $copied) {
                    $this->command?->warn("Nie udało się skopiować pliku: {$src->sciezka}");
                    continue;
                }

                Zdjecie::create([
                    'ogloszenie_id' => $ogloszenie->id,
                    'sciezka' => $destPath,
                    'nazwa_pliku' => $filename,
                ]);
                $assignedCount++;
            }
        }

        $this->command?->info("Przypisano skopiowane zdjęcia: {$assignedCount}.");
    }
}
