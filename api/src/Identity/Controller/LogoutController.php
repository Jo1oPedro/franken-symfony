<?php

namespace App\Identity\Controller;

use App\Identity\Entity\RefreshToken;
use App\Identity\Service\Auth\ClearAuthCookies;
use App\Identity\Service\Auth\LogoutUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class LogoutController extends AbstractController
{
    public function __construct(
        private LogoutUser $logoutUser,
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
        return ($this->logoutUser)($request);
    }
}
