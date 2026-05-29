<?php

declare(strict_types=1);

namespace App\Identity\DTO;

use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class LoginRequestDTO
{
    public function __construct(
        #[NotBlank(message: 'Email is required')]
        #[Email(message: 'Email is required')]
        public string $email,

        #[NotBlank(message: 'Password is required')]
        public string $password,
    ) {
    }
}
