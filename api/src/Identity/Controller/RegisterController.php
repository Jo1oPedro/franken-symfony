<?php

namespace App\Identity\Controller;

use App\Identity\DTO\RegisterRequestDTO;
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
    ) {}

    #[Route("/api/register", methods: ["POST"])]
    public function __invoke(
        #[MapRequestPayload] RegisterRequestDTO $request
    ): JsonResponse {
        $authDTO = ($this->registerUserCase)($request);

        return $this->json(
            [
                "user" => ["id" => $authDTO->id, "email" => $authDTO->email],
                "token" => $authDTO->token
            ],
            Response::HTTP_CREATED
        );
    }
}
