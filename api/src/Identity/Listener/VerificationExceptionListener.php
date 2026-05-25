<?php

namespace App\Identity\Listener;

use App\Identity\Exception\InvalidVerificationTokenException;
use App\Identity\Exception\UserAlreadyVerifiedException;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

#[AsEventListener(event: KernelEvents::EXCEPTION)]
class VerificationExceptionListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        $throwable = $event->getThrowable();

        if($throwable instanceof InvalidVerificationTokenException) {
            $event->setResponse(new JsonResponse(
                ["error" => $throwable->getMessage()],
                Response::HTTP_BAD_REQUEST
            ));
        }

        if($throwable instanceof UserAlreadyVerifiedException) {
            $event->setResponse(new JsonResponse(
                ["error" => $throwable->getMessage()],
                Response::HTTP_CONFLICT
            ));
        }
    }
}
