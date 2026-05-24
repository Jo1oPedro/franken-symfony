<?php

namespace App\Identity\DTO;

use App\Identity\Validator\UniqueEmail;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

final readonly class RegisterRequestDTO
{
    public function __construct(
        #[NotBlank(message: "Email is required")]
        #[Email(message: "Email is required")]
        #[Length(max: 100, maxMessage: "Email must not exceed 100 characters")]
        #[UniqueEmail]
        public string $email,

        #[NotBlank(message: "Password is required")]
        #[Length(
            min: 8,
            max: 72,
            minMessage: "Password must be at least 8 characters",
            maxMessage: "Password must not exceed 72 characters",
        )]
        public string $password,
    ) {}
}
