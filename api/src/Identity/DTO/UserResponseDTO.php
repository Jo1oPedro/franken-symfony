<?php

namespace App\Identity\DTO;

use App\Identity\Entity\User;

final readonly class UserResponseDTO
{
    public function __construct(
        public string $id,
        public string $email
    ) {}

    public static function fromEntity(User $user): self
    {
        return new self(
            id: $user->getId(),
            email: $user->getEmail(),
        );
    }
}
