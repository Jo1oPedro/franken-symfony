<?php

namespace App\Identity\Controller;

use App\Identity\Service\Auth\RefreshCookie;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class RefreshController extends AbstractController
{
    public function __construct(
        private RefreshCookie $refreshCookie,
    ) {}

    #[Route("/api/auth/refresh", methods: ["POST"])]
    public function __invoke(Request $request): JsonResponse
    {
        return ($this->refreshCookie)($request);
    }
}
