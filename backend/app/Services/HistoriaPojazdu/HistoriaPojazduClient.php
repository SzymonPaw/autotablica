<?php

namespace App\Services\HistoriaPojazdu;

use App\Services\HistoriaPojazdu\Exceptions\HistoriaPojazduException;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use Psr\Http\Message\ResponseInterface;
use Throwable;

class HistoriaPojazduClient
{
    private Client $client;

    private CookieJar $cookieJar;

    private string $baseUrl;

    private string $appName;

    private string $apiVersion;

    private int $timeout;

    private ?string $nfWid = null;

    public function __construct(private readonly array $config = [])
    {
        $this->baseUrl = rtrim($this->config['base_url'] ?? 'https://moj.gov.pl', '/');
        $this->appName = $this->config['app_name'] ?? 'HistoriaPojazdu';
        $this->apiVersion = $this->config['api_version'] ?? '1.0.17';
        $this->timeout = (int) ($this->config['timeout'] ?? 15);

        if (! $this->baseUrl || ! $this->appName || ! $this->apiVersion) {
            throw HistoriaPojazduException::missingConfiguration();
        }

        $this->cookieJar = new CookieJar();

        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout' => $this->timeout,
            'cookies' => $this->cookieJar,
            'http_errors' => false,
            'headers' => [
                'Accept' => 'application/json, text/plain, */*',
                'Accept-Language' => 'pl-PL,pl;q=0.9',
                'User-Agent' => $this->config['user_agent'] ?? 'AutotablicaHistoriaClient/1.0',
            ],
        ]);
    }

    /**
     * Pobierz połączone dane techniczne i oś czasu z HistoriaPojazdu.
     */
    public function fetch(string $vin, string $registrationNumber, string $firstRegistrationDate): array
    {
        $vin = strtoupper(trim($vin));
        $registrationNumber = strtoupper(trim($registrationNumber));
        $firstRegistrationDate = trim($firstRegistrationDate);

        if ($vin === '' || $registrationNumber === '' || $firstRegistrationDate === '') {
            throw HistoriaPojazduException::requestFailed('Brakuje wymaganych danych do pobrania historii pojazdu.');
        }

        try {
            $this->initializeSession();

            $vehicleData = $this->callDataEndpoint('vehicle-data', $vin, $registrationNumber, $firstRegistrationDate);
            $timelineData = $this->callDataEndpoint('timeline-data', $vin, $registrationNumber, $firstRegistrationDate);

            return [
                'vehicle_data' => $vehicleData,
                'timeline_data' => $timelineData,
            ];
        } finally {
            $this->closeSessionQuietly();
        }
    }

    private function initializeSession(): void
    {
        $this->createSession();
        $this->authenticateSession();
    }

    private function createSession(): void
    {
        $url = sprintf('/uslugi/engine/ng/index?xFormsAppName=%s', $this->appName);

        $response = $this->request('GET', $url, [
            'headers' => [
                'Referer' => $this->baseUrl . '/',
            ],
        ]);

        if ($response->getStatusCode() !== 200) {
            throw HistoriaPojazduException::requestFailed('Nie udało się nawiązać sesji z HistoriaPojazdu.', [
                'status' => $response->getStatusCode(),
            ]);
        }

        if (empty($this->cookieJar->toArray())) {
            throw HistoriaPojazduException::requestFailed('Serwer nie odesłał wymaganych cookies HistoriaPojazdu.');
        }
    }

    private function authenticateSession(): void
    {
        $this->nfWid = sprintf('%s:%d', $this->appName, (int) round(microtime(true) * 1000));

        $url = sprintf('/uslugi/engine/ng/index?xFormsAppName=%s', $this->appName);

        $response = $this->request('POST', $url, [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Referer' => $this->baseUrl . '/',
            ],
            'form_params' => [
                'NF_WID' => $this->nfWid,
            ],
        ]);

        if ($response->getStatusCode() !== 200) {
            throw HistoriaPojazduException::requestFailed('Nie udało się uwierzytelnić sesji HistoriaPojazdu.', [
                'status' => $response->getStatusCode(),
            ]);
        }
    }

    private function callDataEndpoint(
        string $endpoint,
        string $vin,
        string $registrationNumber,
        string $firstRegistrationDate
    ): array {
        if (! $this->nfWid) {
            throw HistoriaPojazduException::requestFailed('Sesja HistoriaPojazdu nie została zainicjowana.');
        }

        $xsrfToken = $this->resolveXsrfToken();

        $url = sprintf('/nforms/api/%s/%s/data/%s', $this->appName, $this->apiVersion, $endpoint);

        $response = $this->request('POST', $url, [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-Xsrf-Token' => $xsrfToken,
                'Nf_wid' => $this->nfWid,
            ],
            'json' => [
                'registrationNumber' => $registrationNumber,
                'VINNumber' => $vin,
                'firstRegistrationDate' => $firstRegistrationDate,
            ],
        ]);

        $payload = json_decode((string) $response->getBody(), true);

        if (! is_array($payload)) {
            throw HistoriaPojazduException::invalidResponse('HistoriaPojazdu zwróciła niepoprawne dane.', [
                'body' => (string) $response->getBody(),
            ]);
        }

        return $payload;
    }

    private function closeSessionQuietly(): void
    {
        try {
            $this->closeSession();
        } catch (Throwable) {
            // Sesja bywa niestabilna — ignorujemy błędy zamknięcia.
        } finally {
            $this->nfWid = null;
            $this->cookieJar->clear();
        }
    }

    private function closeSession(): void
    {
        if (! $this->nfWid) {
            return;
        }

        $url = sprintf('/nforms/api/%s/%s/close', $this->appName, $this->apiVersion);

        $this->request('GET', $url, [
            'headers' => [
                'Nf_wid' => $this->nfWid,
            ],
        ]);
    }

    private function resolveXsrfToken(): string
    {
        foreach ($this->cookieJar->toArray() as $cookie) {
            if (($cookie['Name'] ?? '') === 'XSRF-TOKEN') {
                $token = (string) ($cookie['Value'] ?? '');

                if ($token !== '') {
                    return urldecode($token);
                }
            }
        }

        throw HistoriaPojazduException::requestFailed('Brak tokenu XSRF w odpowiedzi HistoriaPojazdu.');
    }

    private function request(string $method, string $uri, array $options = []): ResponseInterface
    {
        try {
            $response = $this->client->request($method, $uri, $options);

            if ($response->getStatusCode() >= 400) {
                throw HistoriaPojazduException::requestFailed(
                    sprintf('HistoriaPojazdu zwróciła kod %s', $response->getStatusCode()),
                    [
                        'uri' => $uri,
                        'status' => $response->getStatusCode(),
                        'body' => (string) $response->getBody(),
                    ]
                );
            }

            return $response;
        } catch (HistoriaPojazduException $exception) {
            throw $exception;
        } catch (Throwable $exception) {
            throw HistoriaPojazduException::requestFailed('HistoriaPojazdu nie odpowiada.', [
                'uri' => $uri,
                'error' => $exception->getMessage(),
            ]);
        }
    }
}
