<?php

namespace App\Identity\Repository;

use App\Identity\Entity\EmailVerificationToken;

interface EmailVerificationTokenRepositoryInterface
{
    public function save(EmailVerificationToken $emailVerificationToken);

    public function findByToken(string $token): ?EmailVerificationToken;
}
