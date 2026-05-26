<?php

namespace App\Identity\Repository;

use App\Identity\Entity\EmailVerificationToken;
use App\Identity\Entity\User;

interface EmailVerificationTokenRepositoryInterface
{
    public function save(EmailVerificationToken $emailVerificationToken);

    public function findByToken(string $token): ?EmailVerificationToken;

    public function revokeActiveTokensForUser(User $user): void;
}
