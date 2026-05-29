<?php

declare(strict_types=1);

namespace App\Identity\Controller;

use App\Identity\DTO\ResendVerificationEmailRequestDTO;
use App\Identity\Service\Auth\ResendVerificationEmail;
use App\shared\Attribute\RateLimit;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class ResendVerificationEmailController extends AbstractController
{
    public function __construct(
        private readonly ResendVerificationEmail $resendUseCase,
    ) {
    }

    #[Route('/api/auth/resend-verification-email', methods: ['POST'])]
    #[RateLimit(limiter: 'resend_verification_email', by: 'ip')]
    public function __invoke(
        #[MapRequestPayload] ResendVerificationEmailRequestDTO $resendVerificationEmailRequestDTO,
    ): JsonResponse {
        ($this->resendUseCase)($resendVerificationEmailRequestDTO->email);

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
