<?php

declare(strict_types=1);

namespace App\Identity\Repository;

use App\Identity\Entity\RefreshToken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<RefreshToken>
 */
class RefreshTokenRepository extends ServiceEntityRepository implements RefreshTokenInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RefreshToken::class);
    }

    public function save(RefreshToken $refreshToken): void
    {
        $this->getEntityManager()->persist($refreshToken);
        $this->getEntityManager()->flush();
    }

    public function findByToken(string $token): ?RefreshToken
    {
        return $this->findOneBy(['token' => $token]);
    }
}
