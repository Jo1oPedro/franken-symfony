<?php

declare(strict_types=1);

namespace App\shared\Attribute;

#[\Attribute(\Attribute::TARGET_METHOD | \Attribute::TARGET_CLASS)]
class RateLimit
{
    public function __construct(
        public string $limiter,
        public string $by = 'ip',
    ) {
    }
}
