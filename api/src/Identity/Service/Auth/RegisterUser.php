<?php

namespace App\Identity\Service\Auth;

use App\Identity\DTO\RegisterRequestDTO;
use App\Identity\DTO\AuthResponseDTO;
use App\Identity\Entity\User;
use App\Identity\Repository\UserRepositoryInterface;
use App\shared\Port\TransactionManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;

final readonly class RegisterUser
{
    public function __construct(
        private UserRepositoryInterface     $userRepository,
        private UserPasswordHasherInterface $hasher,
        private SendVerificationEmail       $sendVerificationEmail,
        private TransactionManagerInterface $entityManager
    ) {}

    public function __invoke(RegisterRequestDTO $requestDTO): AuthResponseDTO
    {
        $user = $this->entityManager->transactional(function () use ($requestDTO): User {
            $tempUser = new User(Uuid::v7()->toRfc4122(), $requestDTO->email, "");

            $hashedPassword = $this->hasher->hashPassword($tempUser, $requestDTO->password);

            $user = new User(
                id: $tempUser->getId(),
                email :$tempUser->getEmail(),
                password: $hashedPassword
            );


            $this->userRepository->save($user);
            ($this->sendVerificationEmail)($user);

            return $user;
        });

        return new AuthResponseDTO(
            id: $user->getId(),
            email: $user->getEmail()
        );
    }
}
