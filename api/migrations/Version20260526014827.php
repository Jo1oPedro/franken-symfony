<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260526014827 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Ensure at most one active (non-consumed) email verification token per user.';
    }

    public function up(Schema $schema): void
    {
        // Limpa tokens duplicados pré-existentes, mantendo só o mais recente por usuário.
        // Sem isso, o CREATE INDEX abaixo falha se já houver duplicatas.
        $this->addSql(<<<'SQL'
            UPDATE email_verification_tokens t
            SET consumed_at = NOW()
            WHERE consumed_at IS NULL
              AND id NOT IN (
                  SELECT DISTINCT ON (user_id) id
                  FROM email_verification_tokens
                  WHERE consumed_at IS NULL
                  ORDER BY user_id, id DESC
              )
        SQL);

        // 2) Cria o índice único parcial.
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX uniq_evt_active_per_user
            ON email_verification_tokens (user_id)
            WHERE consumed_at IS NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX uniq_evt_active_per_user');
    }
}
