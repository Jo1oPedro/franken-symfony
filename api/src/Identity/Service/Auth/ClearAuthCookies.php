<?php

namespace App\Identity\Service\Auth;

use Symfony\Component\HttpFoundation\Response;

final readonly class ClearAuthCookies
{
    public function __invoke(Response $response): void
    {
        $response->headers->clearCookie("auth_token", "/");
        $response->headers->clearCookie("refresh_token", "/api/auth");
    }
}
