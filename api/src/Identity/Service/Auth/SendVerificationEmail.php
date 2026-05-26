<?php

namespace App\Identity\Service\Auth;

use App\Identity\Entity\EmailVerificationToken;
use App\Identity\Entity\User;
use App\Identity\Repository\EmailVerificationTokenRepositoryInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

final class SendVerificationEmail
{
    private const TOKEN_TTL = "+24 hours";

    public function __construct(
        private readonly EmailVerificationTokenRepositoryInterface $emailVerificationTokenRepository,
        private readonly MailerInterface $mailer,
        private readonly string $mailerFrom,
    ) {}

    public function __invoke(User $user): void
    {
        $this->emailVerificationTokenRepository->revokeActiveTokensForUser($user);

        $token = $this->createToken($user);

        $verifyUrl = sprintf(
            "%s/verify-email?token=%s",
            "app.localhost",
            $token->getToken()
        );

        $email = (new TemplatedEmail())
            ->from(new Address($this->mailerFrom, "Todo App"))
            ->to($user->getEmail())
            ->subject("Verify your email address")
            ->htmlTemplate("emails/verify_email.html.twig")
            ->context([
                "verifyUrl" => $verifyUrl,
                "expiresInHours" => 24
            ]);

        $this->mailer->send($email);
    }

    private function createToken(User $user): EmailVerificationToken
    {
        $rawToken = bin2hex(random_bytes(32));
        $expiresAt = new \DateTimeImmutable(self::TOKEN_TTL);

        $token = new EmailVerificationToken($user, $rawToken, $expiresAt);
        $this->emailVerificationTokenRepository->save($token);

        return $token;
    }
}
