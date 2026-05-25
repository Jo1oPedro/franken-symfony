<?php

namespace App\Identity\Controller;

use App\Identity\Entity\RefreshToken;
use App\Identity\Service\Auth\CookieAuthIssuer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class LogoutController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private CookieAuthIssuer $cookieAuthIssuer
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
        $plain = $request->cookies->get("refresh_token");
        if($plain) {
            $refresh = $this->entityManager->getRepository(RefreshToken::class)
                ->findOneBy(["token" => hash("sha256", $plain)]);
            if($refresh) {
                $refresh->revoke();
                $this->entityManager->flush();
            }
        }

        $response = new JsonResponse(status: 204);
        $this->cookieAuthIssuer->clearCookies($response);
        return $response;
    }
}
