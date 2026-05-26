<?php

namespace App\Identity\Service\Auth;

use App\Identity\Entity\RefreshToken;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class LogoutUser
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ClearAuthCookies $clearAuthCookies
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
        ($this->clearAuthCookies)($response);

        return $response;
    }
}
