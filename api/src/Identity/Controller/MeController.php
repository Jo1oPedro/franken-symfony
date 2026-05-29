<?php

declare(strict_types=1);

namespace App\Identity\Controller;

use App\Identity\DTO\AuthResponseDTO;
use App\Identity\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class MeController extends AbstractController
{
    #[Route('/api/me', methods: ['GET'])]
    public function __invoke(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        return $this->json([
            'user' => AuthResponseDTO::fromEntity($user),
        ]);
    }
}
