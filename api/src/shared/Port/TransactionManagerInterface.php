<?php

namespace App\shared\Port;

interface TransactionManagerInterface
{
    public function transactional(callable $callback): mixed;
}
