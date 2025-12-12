<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
                'password' => ['required', 'string', Password::defaults()],
                'token_name' => ['nullable', 'string', 'max:255'],
                'abilities' => ['nullable', 'array'],
                'abilities.*' => ['string', 'max:255'],
            ]);

        $userData = Arr::only($validated, ['name', 'email', 'password']);

        $user = User::create($userData);

        $token = $user->createToken(
            $validated['token_name'] ?? 'api-token',
            $validated['abilities'] ?? ['*']
        )->plainTextToken;

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'data' => $user,
        ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => method_exists($e, 'errors') ? $e->errors() : null,
            ], 422);
        }
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string'],
            'token_name' => ['nullable', 'string', 'max:255'],
            'abilities' => ['nullable', 'array'],
            'abilities.*' => ['string', 'max:255'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are invalid.',
            ], 401);
        }

        $token = $user->createToken(
            $validated['token_name'] ?? 'api-token',
            $validated['abilities'] ?? ['*']
        )->plainTextToken;

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'data' => $user,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->user()->currentAccessToken();

        if ($token !== null) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Wylogowano pomyślnie.',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'data' => $this->serializeUser($user),
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $user = $request->user();

        // Revoke active tokens before removing the account
        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'message' => 'Konto zostało pomyślnie usunięte.',
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['sometimes', 'filled', 'string', 'max:255'],
            'email' => ['sometimes', 'filled', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
        ]);

        $filtered = array_filter($validated, static fn ($value) => $value !== null);

        if (! empty($filtered)) {
            $user->fill($filtered);
            if ($user->isDirty()) {
                $user->save();
            }
        }

        return response()->json([
            'data' => $this->serializeUser($user),
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Podane obecne hasło jest nieprawidłowe.',
                'errors' => [
                    'current_password' => ['Podane obecne hasło jest nieprawidłowe.'],
                ],
            ], 422);
        }

        $user->password = $validated['password'];
        $user->save();

        return response()->json([
            'message' => 'Hasło zostało zaktualizowane.',
        ]);
    }

    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at?->toIso8601String(),
            'updated_at' => $user->updated_at?->toIso8601String(),
        ];
    }
}
