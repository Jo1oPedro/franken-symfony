<?php

namespace App\Identity\Controller;

use App\Identity\DTO\LoginRequestDTO;
use App\Identity\Service\Auth\AttachAuthCookiesToRequest;
use App\Identity\Service\Auth\LoginUserCase;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

final class LoginController extends AbstractController
{
    public function __construct(
        private LoginUserCase $loginUserCase,
        private AttachAuthCookiesToRequest $attachAuthCookiesToRequest,
    ) {}

    #[Route('/api/login', name: 'login')]
    public function index(
        #[MapRequestPayload] LoginRequestDTO $loginRequestDTO
    ): JsonResponse
    {
        $authResponseDTO = ($this->loginUserCase)($loginRequestDTO);

        $response = $this->json(
            [
                "user" => [
                    "id" => $authResponseDTO->id,
                    "email" => $authResponseDTO->email,
                    "verified" => $authResponseDTO->verified
                ]
            ],
            Response::HTTP_OK,
        );

        ($this->attachAuthCookiesToRequest)($response, $authResponseDTO);
        return $response;
    }
}
