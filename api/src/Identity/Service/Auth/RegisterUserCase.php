<?php

namespace App\Identity\Service\Auth;

use App\Identity\DTO\RegisterRequestDTO;
use App\Identity\DTO\UserResponseDTO;
use App\Identity\Entity\User;
use App\Identity\Repository\UserRepositoryInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;

class RegisterUserCase
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly UserPasswordHasherInterface $hasher
    ) {}

    public function __invoke(RegisterRequestDTO $requestDTO): UserResponseDTO
    {
        if($this->userRepository->findByEmail($requestDTO->email) !== null) {
            throw new \DomainException('Email already registered.');
        }

        $tempUser = new User(Uuid::v7()->toRfc4122(), $requestDTO->email, "");

        $hashedPassword = $this->hasher->hashPassword($tempUser, $requestDTO->password);

        $user = new User(
            id: $tempUser->getId(),
            email :$tempUser->getEmail(),
            password: $hashedPassword
        );

        $this->userRepository->save($user);

        return UserResponseDTO::fromEntity($user);
    }
}
