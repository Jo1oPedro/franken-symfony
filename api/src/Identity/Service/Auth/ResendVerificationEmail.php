<?php

declare(strict_types=1);

namespace App\Identity\Service\Auth;

use App\Identity\Repository\UserRepositoryInterface;

final readonly class ResendVerificationEmail
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private SendVerificationEmail $sendVerificationEmail,
    ) {
    }

    public function __invoke(string $email): void
    {
        $user = $this->userRepository->findByEmail($email);

        if (null === $user || $user->isVerified()) {
            return;
        }

        ($this->sendVerificationEmail)($user);
    }
}
