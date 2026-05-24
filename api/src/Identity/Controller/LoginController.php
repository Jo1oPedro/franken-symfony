<?php

namespace App\Identity\Controller;

use App\Identity\DTO\LoginRequestDTO;
use App\Identity\Service\Auth\LoginUserCase;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

final class LoginController extends AbstractController
{
    public function __construct(
        private LoginUserCase $loginUserCase
    ) {}

    #[Route('/api/login', name: 'login')]
    public function index(
        #[MapRequestPayload] LoginRequestDTO $loginRequestDTO
    ): Response
    {
        $authResponseDTO = ($this->loginUserCase)($loginRequestDTO);

        return $this->json(
            [
                "user" => ["id" => $authResponseDTO->id, "email" => $authResponseDTO->email],
                "token" => $authResponseDTO->token
            ],
            Response::HTTP_OK,
        );
    }
}
