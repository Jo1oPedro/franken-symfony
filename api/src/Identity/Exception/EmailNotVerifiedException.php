<?php

namespace App\Identity\Exception;

class EmailNotVerifiedException extends \DomainException
{
    public function __construct()
    {
        parent::__construct("Email not verified.");
    }
}
