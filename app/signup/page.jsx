'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { AuthShell, Alert, inputClass, labelClass, primaryButtonClass } from '@/app/components/auth-ui';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // If email confirmation is disabled, a session is returned immediately.
        if (data.session) {
            router.push('/dashboard');
            router.refresh();
            return;
        }

        setLoading(false);
        setMessage('Check your email to confirm your account, then log in.');
    };

    return (
        <AuthShell title="Create Account" subtitle="Join PT Cikal Citra Mapan">
            <Alert>{error}</Alert>
            <Alert type="success">{message}</Alert>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className={labelClass}>Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}
                        placeholder="At least 6 characters"
                    />
                </div>
                <div>
                    <label htmlFor="confirm" className={labelClass}>Confirm Password</label>
                    <input
                        id="confirm"
                        type="password"
                        required
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className={inputClass}
                        placeholder="••••••••"
                    />
                </div>
                <button type="submit" disabled={loading} className={primaryButtonClass}>
                    {loading ? 'Creating account…' : 'Sign Up'}
                </button>
            </form>
            <p className="mt-6 text-center font-montserrat text-sm text-ink">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-brand hover:opacity-70">Log in</Link>
            </p>
        </AuthShell>
    );
}
