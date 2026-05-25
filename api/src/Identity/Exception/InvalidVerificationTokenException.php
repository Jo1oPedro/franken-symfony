<?php

namespace App\Identity\Exception;

class InvalidVerificationTokenException extends \DomainException
{
    public function __construct()
    {
        parent::__construct("Invalid or expired verification token.");
    }
}
