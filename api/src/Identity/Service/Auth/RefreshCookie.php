<?php

declare(strict_types=1);

namespace App\Identity\Service\Auth;

use App\Identity\DTO\AuthResponseDTO;
use App\Identity\Repository\RefreshTokenInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

final readonly class RefreshCookie
{
    public function __construct(
        private RefreshTokenInterface $refreshToken,
        private AttachAuthCookiesToRequest $attachAuthCookiesToRequest,
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $plain = $request->cookies->get('refresh_token');
        if (!$plain) {
            return new JsonResponse(['error' => 'No refresh token'], 401);
        }

        $hash = hash('sha256', $plain);
        $refresh = $this->refreshToken->findByToken($hash);

        if (!$refresh || !$refresh->isValid()) {
            return new JsonResponse(['error' => 'Invalid refresh token'], 401);
        }

        $refresh->revoke();
        $this->refreshToken->save($refresh);

        $response = new JsonResponse(status: 204);
        ($this->attachAuthCookiesToRequest)(
            $response,
            AuthResponseDTO::fromEntity($refresh->getUser())
        );

        return $response;
    }
}
