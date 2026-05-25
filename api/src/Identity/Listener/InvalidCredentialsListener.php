<?php

namespace App\Identity\Listener;

use App\Identity\Exception\InvalidCredentialsException;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

#[AsEventListener(event: KernelEvents::EXCEPTION)]
class InvalidCredentialsListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        if(!$event->getThrowable() instanceof InvalidCredentialsException) {
            return;
        }

        $event->setResponse(new JsonResponse([
            ["error" => "Invalid credentials"],
            Response::HTTP_UNAUTHORIZED
        ]));
    }
}
