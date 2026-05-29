<?php

declare(strict_types=1);

namespace App\shared\EventListener;

use App\shared\Exception\HasHttpRepresentation;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

#[AsEventListener(priority: -100)]
class ApiExceptionListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        $request = $event->getRequest();

        if (!str_starts_with($request->getPathInfo(), '/api')) {
            return;
        }

        if (null !== $event->getResponse()) {
            return;
        }

        $exception = $event->getThrowable();

        if ($exception instanceof HasHttpRepresentation) {
            $status = $exception->getStatusCode();
            $headers = [];
            $code = $this->codeFromStatus($status);
            $message = $exception->getMessage() ?: Response::$statusTexts[$status] ?? 'Error';
        } elseif ($exception instanceof HttpExceptionInterface) {
            $status = $exception->getStatusCode();
            $headers = $exception->getHeaders();
            $code = $this->codeFromStatus($status);
            $message = $exception->getMessage() ?: Response::$statusTexts[$status] ?? 'Error';
        } else {
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
            $headers = [];
            $code = 'INTERNAL_ERROR';
            $message = 'Internal Server Error';
        }

        $event->setResponse(new JsonResponse(
            ['error' => ['code' => $code, 'message' => $message]],
            $status,
            $headers
        ));
    }

    private function codeFromStatus(int $status): string
    {
        return match ($status) {
            400 => 'BAD_REQUEST',
            401 => 'UNAUTHORIZED',
            403 => 'FORBIDDEN',
            404 => 'NOT_FOUND',
            405 => 'METHOD_NOT_ALLOWED',
            422 => 'UNPROCESSABLE_ENTITY',
            429 => 'TOO_MANY_REQUESTS',
            default => 'HTTP_ERROR',
        };
    }
}
