<?php

namespace App\shared\Infrastructure;

use App\shared\Port\TransactionManagerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\AsAlias;

#[AsAlias(id: TransactionManagerInterface::class)]
class DoctrineTransactionManager implements TransactionManagerInterface
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    ) {}

    public function transactional(callable $callback): mixed
    {
        return $this->entityManager->wrapInTransaction($callback);
    }
}
