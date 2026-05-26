<?php

namespace App\Identity\Service\Auth;

use App\Identity\Exception\InvalidVerificationTokenException;
use App\Identity\Exception\UserAlreadyVerifiedException;
use App\Identity\Repository\EmailVerificationTokenRepositoryInterface;
use App\Identity\Repository\UserRepositoryInterface;

class VerifyUserEmail
{
    public function __construct(
        private readonly EmailVerificationTokenRepositoryInterface $emailVerifierRepository,
        private readonly UserRepositoryInterface $userRepository,
    ) {}

    public function __invoke(string $token): void
    {
        $verificationToken = $this->emailVerifierRepository->findByToken($token);

        if($verificationToken === null || !$verificationToken->isUsable()) {
            throw new InvalidVerificationTokenException();
        }

        $user = $verificationToken->getUser();

        if($user->isVerified()) {
            throw new UserAlreadyVerifiedException();
        }

        $verificationToken->consume();
        $user->markAsVerified();

        $this->userRepository->save($user);
        $this->emailVerifierRepository->save($verificationToken);
    }
}
