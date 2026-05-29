<?php

declare(strict_types=1);

namespace App\Identity\Controller;

use App\Identity\Service\Auth\LogoutUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class LogoutController extends AbstractController
{
    public function __construct(
        private LogoutUser $logoutUser,
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        return ($this->logoutUser)($request);
    }
}
