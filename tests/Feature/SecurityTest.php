<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_is_redirected_to_login(): void
    {
        $this->get('/dashboard/orders')->assertRedirect('/login');
        $this->get('/settings/profile')->assertRedirect('/login');
    }

    public function test_client_cannot_access_admin_dashboard(): void
    {
        $client = User::factory()->create(['role' => 'client']);
        $this->actingAs($client)->get('/dashboard')->assertRedirect();
    }

    public function test_admin_can_access_dashboard(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin)->get('/dashboard')->assertOk();
    }

    public function test_user_can_delete_own_account_with_correct_password(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)
            ->delete('/settings/profile', ['password' => 'password']);
        $response->assertSessionHasNoErrors()->assertRedirect('/');
        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_user_cannot_delete_account_with_wrong_password(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->from('/settings/profile')
            ->delete('/settings/profile', ['password' => 'mauvais-mdp'])
            ->assertSessionHasErrors('password');
        $this->assertNotNull($user->fresh());
    }

    public function test_password_is_never_exposed_in_serialized_user(): void
    {
        $user = User::factory()->create();
        $this->assertArrayNotHasKey('password', $user->toArray());
        $this->assertArrayNotHasKey('remember_token', $user->toArray());
    }

    public function test_password_is_hashed_in_database(): void
    {
        $user = User::factory()->create();
        $this->assertNotEquals('password', $user->password);
        $this->assertTrue(
            str_starts_with($user->password, '$2y$') ||
            str_starts_with($user->password, '$2b$') ||
            str_starts_with($user->password, '$argon')
        );
    }

    public function test_password_change_requires_correct_current_password(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->put('/settings/password', [
            'current_password'      => 'mauvais-mdp',
            'password'              => 'NouveauMdp123!',
            'password_confirmation' => 'NouveauMdp123!',
        ])->assertSessionHasErrors('current_password');
    }

    public function test_user_can_change_password_with_correct_current_password(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->put('/settings/password', [
            'current_password'      => 'password',
            'password'              => 'NouveauMdp123!',
            'password_confirmation' => 'NouveauMdp123!',
        ])->assertSessionHasNoErrors();
    }

    public function test_user_only_sees_own_orders(): void
    {
        $user1 = User::factory()->create(['role' => 'client']);
        $user2 = User::factory()->create(['role' => 'client']);

        Order::create([
            'user_id'      => $user1->id,
            'order_number' => 'WEVA-USER1ONLY',
            'subtotal'     => 50,
            'discount'     => 0,
            'total'        => 50,
            'status'       => 'paid',
            'email'        => $user1->email,
        ]);

        $this->actingAs($user2)
            ->get(route('client.orders'))
            ->assertOk()
            ->assertDontSee('WEVA-USER1ONLY');
    }
}
