<?php

declare(strict_types=1);

namespace App\Identity\Repository;

use App\Identity\Entity\RefreshToken;

interface RefreshTokenInterface
{
    public function save(RefreshToken $refreshToken): void;

    public function findByToken(string $token): ?RefreshToken;
}
