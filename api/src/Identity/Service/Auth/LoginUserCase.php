<?php

namespace App\Identity\Service\Auth;

use App\Identity\DTO\AuthResponseDTO;
use App\Identity\DTO\LoginRequestDTO;
use App\Identity\Exception\InvalidCredentialsException;
use App\Identity\Repository\UserRepositoryInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class LoginUserCase
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly UserPasswordHasherInterface $userPasswordHasher
    ) {}

    public function __invoke(LoginRequestDTO $loginRequestDTO): AuthResponseDTO
    {
        $user = $this->userRepository->findByEmail($loginRequestDTO->email)
            ?? throw new InvalidCredentialsException();

        if(!$this->userPasswordHasher->isPasswordValid($user, $loginRequestDTO->password)) {
            throw new InvalidCredentialsException();
        }

        return AuthResponseDTO::fromEntity($user);
    }
}
