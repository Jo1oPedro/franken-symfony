<?php

namespace App\Identity\Service\Auth;

use App\Identity\Repository\UserRepositoryInterface;

class ResendVerificationEmailUseCase
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private EmailVerifier $emailVerifier,
    ) {}

    public function __invoke(string $email): void
    {
        $user = $this->userRepository->findByEmail($email);

        if($user === null || $user->isVerified()) {
            return;
        }

        $this->emailVerifier->sendVerificationEmail($user);
    }
}
