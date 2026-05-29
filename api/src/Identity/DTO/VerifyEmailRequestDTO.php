<?php

declare(strict_types=1);

namespace App\Identity\DTO;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

final readonly class VerifyEmailRequestDTO
{
    public function __construct(
        #[NotBlank(message: 'Token is required')]
        #[Length(min: 64, max: 64, exactMessage: 'Invalid token format')]
        public string $token,
    ) {
    }
}
