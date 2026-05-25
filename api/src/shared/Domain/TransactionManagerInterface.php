<?php

namespace App\shared\Domain;

interface TransactionManagerInterface
{
    public function transactional(callable $callback): mixed;
}
