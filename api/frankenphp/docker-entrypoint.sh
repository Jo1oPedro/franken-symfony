#!/bin/sh
set -e

# Trigger init for frankenphp/php/console AND for supervisord (our dev CMD).
case "$1" in
	frankenphp|php|bin/console|/usr/bin/supervisord|supervisord) RUN_INIT=1 ;;
	*) RUN_INIT=0 ;;
esac

if [ "$RUN_INIT" = "1" ]; then

	if [ -z "$(ls -A 'vendor/' 2>/dev/null)" ]; then
		composer install --prefer-dist --no-progress --no-interaction
	fi

	# Auto-install bundles (each check independent so partial states recover)
	if [ ! -d vendor/symfony/property-access ]; then
		composer require --no-interaction --no-progress \
			symfony/property-access symfony/property-info symfony/serializer symfony/validator
	fi
	if [ ! -d vendor/api-platform/symfony ]; then
		composer require --no-interaction --no-progress api
	fi
	if [ ! -f config/packages/doctrine.yaml ]; then
		composer require --no-interaction --no-progress symfony/orm-pack
	fi
	if [ ! -d vendor/symfony/amqp-messenger ]; then
		composer require --no-interaction --no-progress \
			symfony/messenger symfony/amqp-messenger symfony/redis-messenger
		if [ -f config/packages/messenger.yaml ]; then
			sed -i 's|# async: .*|async: "%env(MESSENGER_TRANSPORT_DSN)%"|' config/packages/messenger.yaml || true
		fi
	fi
	if [ ! -d vendor/symfony/maker-bundle ]; then
		composer require --no-interaction --no-progress --dev symfony/maker-bundle
	fi
	if [ ! -d vendor/phpunit/phpunit ]; then
		composer require --no-interaction --no-progress --dev symfony/test-pack
	fi

	# Display information about the current project
	php bin/console -V || true

	if grep -q ^DATABASE_URL= .env; then
		echo 'Waiting for database to be ready...'
		ATTEMPTS_LEFT_TO_REACH_DATABASE=60
		until [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ] || DATABASE_ERROR=$(php bin/console dbal:run-sql -q "SELECT 1" 2>&1); do
			if [ $? -eq 255 ]; then
				ATTEMPTS_LEFT_TO_REACH_DATABASE=0
				break
			fi
			sleep 1
			ATTEMPTS_LEFT_TO_REACH_DATABASE=$((ATTEMPTS_LEFT_TO_REACH_DATABASE - 1))
			echo "Still waiting for database to be ready... $ATTEMPTS_LEFT_TO_REACH_DATABASE attempts left."
		done

		if [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ]; then
			echo 'The database is not up or not reachable:'
			echo "$DATABASE_ERROR"
		else
			echo 'The database is now ready and reachable'
			if [ "$(find ./migrations -iname '*.php' -print -quit 2>/dev/null)" ]; then
				php bin/console doctrine:migrations:migrate --no-interaction --all-or-nothing || true
			fi
		fi
	fi

	echo 'PHP app ready!'
fi

exec docker-php-entrypoint "$@"
