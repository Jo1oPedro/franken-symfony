<?php

namespace App\Identity\DTO;

final readonly class RegisterRequestDTO
{
    public function __construct(
        public string $email,
        public string $plainPassword,
    ) {}
}
