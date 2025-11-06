<?php

namespace Database\Seeders;

use App\Models\Marka;
use App\Models\ModelPojazdu;
use Illuminate\Database\Seeder;

class MarkiModeleSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'Audi' => ['A3', 'A4', 'Q5'],
            'BMW' => ['Seria 3', 'Seria 5', 'X3'],
            'Toyota' => ['Corolla', 'Yaris', 'RAV4'],
            'Volkswagen' => ['Golf', 'Passat', 'Tiguan'],
            'Mercedes-Benz' => ['C-Class', 'E-Class', 'GLC'],
        ];

        foreach ($data as $brand => $models) {
            /** @var \App\Models\Marka $marka */
            $marka = Marka::firstOrCreate(['nazwa' => $brand]);

            foreach ($models as $modelName) {
                ModelPojazdu::firstOrCreate([
                    'marka_id' => $marka->id,
                    'nazwa' => $modelName,
                ]);
            }
        }
    }
}
