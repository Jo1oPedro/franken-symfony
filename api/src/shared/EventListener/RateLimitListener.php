<?php

declare(strict_types=1);

namespace App\shared\EventListener;

use App\shared\Attribute\RateLimit;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\RateLimiter\RateLimiterFactory;

#[AsEventListener]
class RateLimitListener
{
    /** @var RateLimiterFactory[] */
    private array $limiters;

    public function __construct(
        RateLimiterFactory $loginLimiter,
        RateLimiterFactory $registerLimiter,
        RateLimiterFactory $resendVerificationEmailLimiter,
        private Security $security,
    ) {
        $this->limiters = [
            'login' => $loginLimiter,
            'register' => $registerLimiter,
            'resend_verification_email' => $resendVerificationEmailLimiter,
        ];
    }

    public function __invoke(ControllerEvent $event): void
    {
        $controller = $event->getController();

        if (\is_array($controller)) {
            [$instance, $method] = $controller;
            $reflection = new \ReflectionMethod($instance, $method);
        } elseif (\is_object($controller) && method_exists($controller, '__invoke')) {
            $reflection = new \ReflectionMethod($controller, '__invoke');
        } else {
            return;
        }

        $attributes = $reflection->getAttributes(RateLimit::class);
        if (empty($attributes)) {
            return;
        }

        $request = $event->getRequest();

        foreach ($attributes as $attribute) {
            /** @var RateLimit $config */
            $config = $attribute->newInstance();

            $key = match ($config->by) {
                'user' => $this->security->getUser()?->getUserIdentifier()
                            ?? $request->getClientIp()
                            ?? 'anonymous',
                default => $request->getClientIp() ?? 'anonymous',
            };

            $factory = $this->limiters[$config->limiter]
                ?? throw new \LogicException(\sprintf('Unknown rate limiter "%s".', $config->limiter));

            $limit = $factory->create($key)->consume(1);

            if (!$limit->isAccepted()) {
                throw new TooManyRequestsHttpException($limit->getRetryAfter()->getTimestamp() - time(), \sprintf("Rate limit exceeded for '%s'.", $config->limiter));
            }

            $request->attributes->set('_rate_limit', $limit);
        }
    }
}
