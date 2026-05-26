<?php

namespace App\Identity\Service\Auth;

use App\Identity\Entity\RefreshToken;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final readonly class RefreshCookie
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private AttachAuthCookiesToRequest $attachAuthCookiesToRequest
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
        $plain = $request->cookies->get("refresh_token");
        if(!$plain) {
            return new JsonResponse(["error" => "No refresh token"], 401);
        }

        $hash = hash("sha256", $plain);
        $refresh = $this->entityManager->getRepository(RefreshToken::class)
            ->findOneBy(["token" => $hash]);

        if(!$refresh || !$refresh->isValid()) {
            return new JsonResponse(["error" => "Invalid refresh token"], 401);
        }

        $refresh->revoke();
        $this->entityManager->flush();

        $response = new JsonResponse(status: 204);
        ($this->attachAuthCookiesToRequest)($response, $refresh->getUser());

        return $response;
    }
}
