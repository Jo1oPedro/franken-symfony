<?php

declare(strict_types=1);

namespace App\Identity\Security;

use App\Identity\Entity\User;
use App\Identity\Exception\EmailNotVerifiedException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

/**
 * @extends Voter<self::ATTRIBUTE, mixed>
 */
final class EmailVerifiedVoter extends Voter
{
    public const string ATTRIBUTE = 'EMAIL_VERIFIED';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return self::ATTRIBUTE === $attribute;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        if (!$user->isVerified()) {
            throw new EmailNotVerifiedException();
        }

        return true;
    }
}
