<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260525042510 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE email_verification_tokens (id UUID NOT NULL, token VARCHAR(128) NOT NULL, expires_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, consumed_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, user_id VARCHAR(36) NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C81CA2AC5F37A13B ON email_verification_tokens (token)');
        $this->addSql('CREATE INDEX IDX_C81CA2ACA76ED395 ON email_verification_tokens (user_id)');
        $this->addSql('ALTER TABLE email_verification_tokens ADD CONSTRAINT FK_C81CA2ACA76ED395 FOREIGN KEY (user_id) REFERENCES users (id) NOT DEFERRABLE');
        $this->addSql('ALTER TABLE users ADD is_verified BOOLEAN DEFAULT FALSE NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE email_verification_tokens DROP CONSTRAINT FK_C81CA2ACA76ED395');
        $this->addSql('DROP TABLE email_verification_tokens');
        $this->addSql('ALTER TABLE users DROP COLUMN is_verified');
    }
}
