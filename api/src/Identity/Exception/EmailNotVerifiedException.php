<?php

namespace App\Identity\Exception;

use App\shared\Exception\HasHttpRepresentation;
use Symfony\Component\HttpFoundation\Response;

class EmailNotVerifiedException extends \DomainException implements HasHttpRepresentation
{
    public function __construct()
    {
        parent::__construct("Email not verified.");
    }

    public function getStatusCode(): int
    {
        return Response::HTTP_FORBIDDEN;
    }

    public function getErrorCode(): string
    {
        return "EMAIL_NOT_VERIFIED";
    }
}
