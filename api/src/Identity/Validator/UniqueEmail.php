<?php

namespace App\Identity\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_PROPERTY)]
class UniqueEmail extends Constraint
{
    public string $message = "Email is already registered.";
}
