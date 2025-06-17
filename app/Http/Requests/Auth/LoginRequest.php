<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        // Step 1: Check if the user has exceeded login attempts (rate limiting)
        $this->ensureIsNotRateLimited();

        // Step 2: Attempt to authenticate the user using email and password
        // If the credentials are invalid:
        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            // Register a failed login attempt
            RateLimiter::hit($this->throttleKey());

            // Throw a validation error with a failed login message
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        // Step 3: If login is successful, clear the rate limiter for this user
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request has not exceeded the allowed number of attempts.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        // Allow up to 5 attempts; if not exceeded, continue
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        // Fire a lockout event (could be used for logging or alerts)
        event(new Lockout($this));

        // Get the remaining seconds until the next allowed attempt
        $seconds = RateLimiter::availableIn($this->throttleKey());

        // Throw a validation error indicating the user is temporarily locked out
        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Generate a unique rate limiting key for the login attempt.
     * Combines the user's email and IP address to uniquely identify the attempt.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')) . '|' . $this->ip());
    }
}
