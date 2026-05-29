<?php

namespace App\Identity\Repository;

use App\Identity\Entity\EmailVerificationToken;
use App\Identity\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EmailVerificationToken>
 */
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

    public function revokeActiveTokensForUser(User $user): void
    {
        $this->createQueryBuilder("t")
            ->update()
            ->set("t.consumedAt", ":now")
            ->where("t.user = :user")
            ->andWhere("t.consumedAt IS NULL")
            ->setParameter("now", new \DateTime())
            ->setParameter("user", $user)
            ->getQuery()
            ->execute();
    }
}
