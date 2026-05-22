<?php

namespace App\Identity\Controller;

use App\Identity\DTO\RegisterRequestDTO;
use App\Identity\Service\Auth\RegisterUserCase;
use App\Identity\Service\RegisterUserCommand;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class RegisterController extends AbstractController
{
    public function __construct(
        private readonly RegisterUserCase $registerUserCase,
    ) {}

    #[Route("/api/register", methods: ["POST"])]
    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $userDTO = ($this->registerUserCase) (
            new RegisterRequestDTO(
                email: $data['email'],
                plainPassword: $data['password'],
            )
        );

        return $this->json(["user" => $userDTO], Response::HTTP_CREATED);
    }
}
