<?php

declare(strict_types=1);

namespace App\Identity\Exception;

use App\shared\Exception\HasHttpRepresentation;
use Symfony\Component\HttpFoundation\Response;

class InvalidVerificationTokenException extends \DomainException implements HasHttpRepresentation
{
    public function __construct()
    {
        parent::__construct('Invalid or expired verification token.');
    }

    public function getStatusCode(): int
    {
        return Response::HTTP_BAD_REQUEST;
    }

    public function getErrorCode(): string
    {
        return 'INVALID_VERIFICATION_TOKEN';
    }
}
