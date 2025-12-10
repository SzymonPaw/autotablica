<?php

namespace App\Services\HistoriaPojazdu;

use App\Models\HistoriaPojazdu;
use App\Models\Ogloszenie;
use App\Services\HistoriaPojazdu\Exceptions\HistoriaPojazduException;
use Illuminate\Support\Facades\Log;
use Throwable;

class HistoriaPojazduManager
{
    public function __construct(private readonly HistoriaPojazduClient $client)
    {
    }

    public function refreshForListing(Ogloszenie $ogloszenie): HistoriaPojazdu
    {
        $history = $ogloszenie->historiaPojazdu()->updateOrCreate([], [
            'vin' => $ogloszenie->vin,
            'numer_rejestracyjny' => $ogloszenie->numer_rejestracyjny,
            'data_pierwszej_rej' => $ogloszenie->data_pierwszej_rej,
            'status' => HistoriaPojazdu::STATUS_PENDING,
            'last_error_message' => null,
        ]);

        if (! $ogloszenie->vin || ! $ogloszenie->numer_rejestracyjny || ! $ogloszenie->data_pierwszej_rej) {
            return $this->markHistory(
                $history,
                HistoriaPojazdu::STATUS_SKIPPED,
                null,
                'Brakuje wymaganych danych do pobrania historii pojazdu.'
            );
        }

        try {
            $payload = $this->client->fetch(
                (string) $ogloszenie->vin,
                (string) $ogloszenie->numer_rejestracyjny,
                $ogloszenie->data_pierwszej_rej->format('Y-m-d')
            );

            return $this->markHistory(
                $history,
                HistoriaPojazdu::STATUS_SUCCESS,
                $payload,
                null
            );
        } catch (HistoriaPojazduException $exception) {
            $status = $exception->reason() === 'configuration'
                ? HistoriaPojazdu::STATUS_SKIPPED
                : HistoriaPojazdu::STATUS_FAILED;

            $this->logFailure($ogloszenie, $exception);

            return $this->markHistory(
                $history,
                $status,
                $status === HistoriaPojazdu::STATUS_SKIPPED ? $history->payload : null,
                $exception->getMessage()
            );
        } catch (Throwable $throwable) {
            Log::error('HistoriaPojazdu: nieoczekiwany błąd', [
                'ogloszenie_id' => $ogloszenie->id,
                'exception' => $throwable->getMessage(),
            ]);

            return $this->markHistory(
                $history,
                HistoriaPojazdu::STATUS_FAILED,
                null,
                'Nie udało się pobrać danych z HistoriaPojazdu.'
            );
        }
    }

    private function markHistory(
        HistoriaPojazdu $history,
        string $status,
        ?array $payload,
        ?string $errorMessage
    ): HistoriaPojazdu {
        $history->fill([
            'status' => $status,
            'payload' => $payload,
            'fetched_at' => now(),
            'last_error_message' => $errorMessage,
        ])->save();

        return $history->refresh();
    }

    private function logFailure(Ogloszenie $ogloszenie, HistoriaPojazduException $exception): void
    {
        if ($exception->reason() === 'configuration') {
            Log::info('HistoriaPojazdu: pominięto wywołanie z powodu brakującej konfiguracji.');

            return;
        }

        Log::warning('HistoriaPojazdu: żądanie nie powiodło się', [
            'ogloszenie_id' => $ogloszenie->id,
            'context' => $exception->context(),
        ]);
    }
}
