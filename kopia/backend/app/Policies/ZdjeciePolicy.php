<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Zdjecie;

class ZdjeciePolicy
{
    public function delete(User $user, Zdjecie $zdjecie): bool
    {
        return $zdjecie->ogloszenie?->uzytkownik_id === $user->id;
    }
}
