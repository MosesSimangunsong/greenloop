<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Role;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'availableRoles' => Role::query()
                ->whereIn('name', ['producer', 'receiver'])
                ->orderBy('name')
                ->pluck('name'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        $roleIds = Role::query()
            ->whereIn('name', $request->validated('roles', []))
            ->pluck('id')
            ->all();

        $request->user()->roles()->syncWithoutDetaching($roleIds);

        $removableRoleIds = Role::query()
            ->whereIn('name', ['producer', 'receiver'])
            ->when(
                $roleIds !== [],
                fn ($query) => $query->whereNotIn('id', $roleIds),
            )
            ->pluck('id')
            ->all();

        if ($removableRoleIds !== []) {
            $request->user()->roles()->detach($removableRoleIds);
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
