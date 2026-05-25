<?php

namespace App\Identity\DTO;

use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

final readonly class ResendVerificationEmailRequestDTO
{
    public function __construct(
        #[NotBlank(message: "Email is required")]
        #[Email(message: "Invalid email")]
        public string $email
    ) {}
}
