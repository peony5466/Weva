<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_admin_can_visit_the_dashboard()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->get('/dashboard')->assertOk();
    }

    public function test_client_is_redirected_from_admin_dashboard()
    {
        $client = User::factory()->create(['role' => 'client']);

        // Le RoleMiddleware redirige les clients vers leur espace (wevavip)
        $this->actingAs($client)->get('/dashboard')->assertRedirect();
    }
}
