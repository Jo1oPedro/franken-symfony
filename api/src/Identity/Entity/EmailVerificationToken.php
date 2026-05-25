<?php

namespace App\Identity\Entity;

use App\Identity\Repository\EmailVerificationTokenRepository;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;
use Symfony\Component\Uid\Uuid;

#[Entity(repositoryClass: EmailVerificationTokenRepository::class)]
#[Table(name: "email_verification_tokens")]
class EmailVerificationToken
{
    #[Id]
    #[Column(type: "uuid", unique: true)]
    private string $id;

    #[Column(type: "string", length: 128, unique: true)]
    private string $token;

    #[ManyToOne(targetEntity: User::class)]
    #[JoinColumn(nullable: false)]
    private User $user;

    #[Column(type: "datetime_immutable")]
    private \DateTimeImmutable $expiresAt;

    #[Column(type: "datetime_immutable", nullable: true)]
    private ?\DateTimeImmutable $consumedAt = null;

    public function __construct(
        User $user,
        string $token,
        \DateTimeImmutable $expiresAt,
    ) {
        $this->id = Uuid::v7()->toRfc4122();
        $this->user = $user;
        $this->token = $token;
        $this->expiresAt = $expiresAt;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function isUsable(): bool
    {
        return $this->consumedAt === null
            && $this->expiresAt > new \DateTimeImmutable();
    }

    public function consume(): void
    {
        if($this->consumedAt !== null) {
            throw new \DomainException("Token already consumed");
        }
        $this->consumedAt = new \DateTimeImmutable();
    }
}
