<?php

declare(strict_types=1);

namespace App\shared\Exception;

interface HasHttpRepresentation
{
    public function getStatusCode(): int;

    public function getErrorCode(): string;
}
