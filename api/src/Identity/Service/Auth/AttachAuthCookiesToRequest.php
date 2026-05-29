<?php

namespace App\Identity\Service\Auth;

use App\Identity\DTO\AuthResponseDTO;
use App\Identity\Entity\RefreshToken;
use App\Identity\Repository\UserRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;

final readonly class AttachAuthCookiesToRequest
{
    public function __construct(
        private JWTTokenManagerInterface $jwtTokenManager,
        private EntityManagerInterface $entityManager,
        private UserRepositoryInterface $userRepository,
        //private string $environment
    ) {}

    public function __invoke(Response $response, AuthResponseDTO $user): void
    {
        $userRecord = $this->userRepository->findByEmail($user->email);

        if(!$userRecord) {
            $exception = new UserNotFoundException();
            $exception->setUserIdentifier($user->email);
            throw $exception;
        }

        $accessJwt = $this->jwtTokenManager->create($userRecord);

        $refreshPlain = bin2hex(random_bytes(48));
        $refreshExpires = new \DateTimeImmutable("+7 days");
        $refresh = new RefreshToken($userRecord, hash('sha256', $refreshPlain), $refreshExpires);
        $this->entityManager->persist($refresh);
        $this->entityManager->flush();

        //$secure = $this->environment === "prod";

        $response->headers->setCookie(
            Cookie::create("auth_token")
                ->withValue($accessJwt)
                ->withHttpOnly(true)
                ->withSecure(true)
                ->withSameSite(Cookie::SAMESITE_NONE)
                ->withPath("/")
                ->withExpires(time() + 3600)
        );

        $response->headers->setCookie(
            Cookie::create("refresh_token")
                ->withValue($refreshPlain)
                ->withHttpOnly(true)
                ->withSecure(true)
                ->withSameSite(Cookie::SAMESITE_NONE)
                ->withPath("/api/auth")
                ->withExpires($refreshExpires->getTimestamp())
        );
    }
}
