<?php

namespace App\Identity\Controller;

use App\Identity\DTO\RegisterRequestDTO;
use App\Identity\Service\Auth\CookieAuthIssuer;
use App\Identity\Service\Auth\RegisterUserCase;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

final class RegisterController extends AbstractController
{
    public function __construct(
        private readonly RegisterUserCase $registerUserCase,
        private readonly CookieAuthIssuer $cookieAuthIssuer,
    ) {}

    #[Route("/api/register", methods: ["POST"])]
    public function __invoke(
        #[MapRequestPayload] RegisterRequestDTO $request
    ): JsonResponse {
        $authResponseDTO = ($this->registerUserCase)($request);

        $response = $this->json(
            [
                "user" => [
                    "id" => $authResponseDTO->id,
                    "email" => $authResponseDTO->email
                ],
            ],
            Response::HTTP_CREATED
        );

        $this->cookieAuthIssuer->attachCookies($response, $authResponseDTO);

        return $response;
    }
}
