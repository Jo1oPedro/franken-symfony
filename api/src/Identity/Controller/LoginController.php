<?php

namespace App\Identity\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'login')]
    public function index(): Response
    {
        return $this->render('identity/ui/http/login/index.html.twig', [
            'controller_name' => 'Identity/Ui/Http/LoginController',
        ]);
    }
}
