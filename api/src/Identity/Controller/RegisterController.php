<?php

namespace App\Identity\Controller;

use App\Identity\DTO\RegisterRequestDTO;
use App\Identity\Service\Auth\AttachAuthCookiesToRequest;
use App\Identity\Service\Auth\RegisterUser;
use App\shared\Attribute\RateLimit;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

final class RegisterController extends AbstractController
{
    public function __construct(
        private readonly RegisterUser $registerUserCase,
        private readonly AttachAuthCookiesToRequest $attachAuthCookiesToRequest,
    ) {}

    #[Route("/api/register", methods: ["POST"])]
    #[RateLimit(limiter: "register", by: "ip")]
    public function __invoke(
        #[MapRequestPayload] RegisterRequestDTO $request
    ): JsonResponse {
        $authResponseDTO = ($this->registerUserCase)($request);

        $response = $this->json(
            [
                "user" => [
                    "id" => $authResponseDTO->id,
                    "email" => $authResponseDTO->email,
                    "verified" => $authResponseDTO->verified,
                ],
            ],
            Response::HTTP_CREATED
        );

        ($this->attachAuthCookiesToRequest)($response, $authResponseDTO);

        return $response;
    }
}
