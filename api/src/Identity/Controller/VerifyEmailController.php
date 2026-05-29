<?php

declare(strict_types=1);

namespace App\Identity\Controller;

use App\Identity\DTO\VerifyEmailRequestDTO;
use App\Identity\Service\Auth\VerifyUserEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class VerifyEmailController extends AbstractController
{
    public function __construct(
        private readonly VerifyUserEmail $verifyEmailUseCase,
    ) {
    }

    #[Route('/api/auth/verify-email', methods: ['POST'], name: 'verify-email')]
    public function __invoke(
        #[MapRequestPayload] VerifyEmailRequestDTO $verifyEmailRequestDTO,
    ): JsonResponse {
        ($this->verifyEmailUseCase)($verifyEmailRequestDTO->token);

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
