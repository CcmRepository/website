'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/app/utils/supabase/client';
import { AuthShell, Alert, inputClass, labelClass, primaryButtonClass } from '@/app/components/auth-ui';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        setMessage('If that email is registered, a password reset link is on its way.');
    };

    return (
        <AuthShell title="Forgot Password" subtitle="We'll email you a reset link">
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
                <button type="submit" disabled={loading} className={primaryButtonClass}>
                    {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
            </form>
            <p className="mt-6 text-center font-montserrat text-sm text-ink">
                Remembered it?{' '}
                <Link href="/login" className="font-medium text-brand hover:opacity-70">Back to login</Link>
            </p>
        </AuthShell>
    );
}
