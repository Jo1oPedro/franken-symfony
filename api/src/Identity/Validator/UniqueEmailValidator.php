<?php

namespace App\Identity\Validator;

use App\Identity\Repository\UserRepositoryInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

final class UniqueEmailValidator extends ConstraintValidator
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
    ) {}

    public function validate(mixed $value, Constraint $constraint): void
    {
        if(!$constraint instanceof UniqueEmail) {
            throw new UnexpectedTypeException($constraint, UniqueEmail::class);
        }

        if(empty($value)) {
            return;
        }

        if(!is_string($value)) {
            throw new UnexpectedTypeException($value, 'string');
        }

        if($this->userRepository->findByEmail($value) !== null) {
            $this->context
                ->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
