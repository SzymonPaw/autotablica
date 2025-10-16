<?php

namespace App\Policies;

use App\Models\Ogloszenie;
use App\Models\User;

class OgloszeniePolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Ogloszenie $ogloszenie): bool
    {
        return $ogloszenie->uzytkownik_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Ogloszenie $ogloszenie): bool
    {
        return $ogloszenie->uzytkownik_id === $user->id;
    }
}
