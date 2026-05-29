<?php

declare(strict_types=1);

namespace App\Identity\Exception;

use App\shared\Exception\HasHttpRepresentation;
use Symfony\Component\HttpFoundation\Response;

class InvalidCredentialsException extends \DomainException implements HasHttpRepresentation
{
    public function __construct()
    {
        parent::__construct('Invalid credentials.');
    }

    public function getStatusCode(): int
    {
        return Response::HTTP_UNAUTHORIZED;
    }

    public function getErrorCode(): string
    {
        return 'INVALID_CREDENTIALS';
    }
}
