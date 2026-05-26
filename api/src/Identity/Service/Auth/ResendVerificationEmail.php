<?php

namespace App\Identity\Service\Auth;

use App\Identity\Repository\UserRepositoryInterface;

final readonly class ResendVerificationEmail
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private SendVerificationEmail   $sendVerificationEmail,
    ) {}

    public function __invoke(string $email): void
    {
        $user = $this->userRepository->findByEmail($email);

        if($user === null || $user->isVerified()) {
            return;
        }

        ($this->sendVerificationEmail)($user);
    }
}
