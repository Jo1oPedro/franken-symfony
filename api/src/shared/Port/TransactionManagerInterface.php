<?php

namespace App\shared\Port;

interface TransactionManagerInterface
{
    /**
     * @template T
     * @param callable(): T $callback
     * @return T
     */
    public function transactional(callable $callback): mixed;
}
