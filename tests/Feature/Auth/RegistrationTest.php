<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');
        $response->assertStatus(200);
    }

    public function test_new_users_can_register_with_rgpd_consent(): void
    {
        $response = $this->post('/register', [
            'name'                  => 'Test User',
            'email'                 => 'test@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
            'rgpd'                  => true,
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('shop.index'));
    }

    public function test_registration_fails_without_rgpd_consent(): void
    {
        $response = $this->post('/register', [
            'name'                  => 'Test User',
            'email'                 => 'test@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
            'rgpd'                  => false,
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('rgpd');
    }

    public function test_registration_fails_when_rgpd_is_missing(): void
    {
        $response = $this->post('/register', [
            'name'                  => 'Test User',
            'email'                 => 'test@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('rgpd');
    }

    public function test_registration_fails_with_duplicate_email(): void
    {
        $this->post('/register', [
            'name'                  => 'First User',
            'email'                 => 'same@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
            'rgpd'                  => true,
        ]);

        $this->post('/logout');

        $response = $this->post('/register', [
            'name'                  => 'Second User',
            'email'                 => 'same@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
            'rgpd'                  => true,
        ]);

        $response->assertSessionHasErrors('email');
    }
}
