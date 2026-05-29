<?php

namespace App\Identity\Exception;

use App\shared\Exception\HasHttpRepresentation;
use Symfony\Component\HttpFoundation\Response;

class UserAlreadyVerifiedException extends \DomainException implements HasHttpRepresentation
{
    public function __construct()
    {
        parent::__construct("User is already verified");
    }

    public function getStatusCode(): int
    {
        return Response::HTTP_CONFLICT;
    }

    public function getErrorCode(): string
    {
        return "USER_ALREADY_VERIFIED";
    }
}
