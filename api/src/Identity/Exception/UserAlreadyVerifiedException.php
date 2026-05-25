<?php

namespace App\Identity\Exception;

class UserAlreadyVerifiedException extends \DomainException
{
    public function __construct()
    {
        parent::__construct("User is already verified");
    }
}
