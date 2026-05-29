<?php

declare(strict_types=1);

namespace App\Identity\Repository;

use App\Identity\Entity\User;

interface UserRepositoryInterface
{
    public function save(User $user): void;

    public function findByEmail(string $email): ?User;
}
