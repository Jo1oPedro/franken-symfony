<?php

namespace App\Identity\Ui\Http;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'app_identity_ui_http_login')]
    public function index(): Response
    {
        return $this->render('identity/ui/http/login/index.html.twig', [
            'controller_name' => 'Identity/Ui/Http/LoginController',
        ]);
    }
}
