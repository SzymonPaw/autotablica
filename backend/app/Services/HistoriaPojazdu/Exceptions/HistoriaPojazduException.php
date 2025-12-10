<?php

namespace App\Services\HistoriaPojazdu\Exceptions;

use RuntimeException;

class HistoriaPojazduException extends RuntimeException
{
    public function __construct(
        string $message,
        private readonly array $context = [],
        private readonly string $reason = 'request'
    ) {
        parent::__construct($message);
    }

    public static function missingConfiguration(): self
    {
        return new self(
            'Konfiguracja HistoriaPojazdu jest niepełna (sprawdź zmienne środowiskowe).',
            [],
            'configuration'
        );
    }

    public static function requestFailed(string $message, array $context = []): self
    {
        return new self($message, $context, 'request');
    }

    public static function invalidResponse(string $message, array $context = []): self
    {
        return new self($message, $context, 'response');
    }

    public function context(): array
    {
        return $this->context;
    }

    public function reason(): string
    {
        return $this->reason;
    }
}
