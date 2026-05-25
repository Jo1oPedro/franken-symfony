<?php

namespace App\Identity\Repository;

use App\Identity\Entity\EmailVerificationToken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class EmailVerificationTokenRepository extends ServiceEntityRepository implements EmailVerificationTokenRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EmailVerificationToken::class);
    }

    public function save(EmailVerificationToken $emailVerificationToken): void
    {
        $this->getEntityManager()->persist($emailVerificationToken);
        $this->getEntityManager()->flush();
    }

    public function findByToken(string $token): ?EmailVerificationToken
    {
        return $this->findOneBy(['token' => $token]);
    }
}
