<?php

namespace App\shared\Exception;

interface HasHttpRepresentation
{
    public function getStatusCode(): int;

    public function getErrorCode(): string;
}
