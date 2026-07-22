'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { AuthShell, Alert, inputClass, labelClass, primaryButtonClass } from '@/app/components/auth-ui';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const e = params.get('error');
        if (e) setError(e);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push('/dashboard');
        router.refresh();
    };

    return (
        <AuthShell title="Welcome Back" subtitle="Log in to your account">
            <Alert>{error}</Alert>
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
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className={labelClass}>Password</label>
                        <Link href="/forgot-password" className="mb-1 font-montserrat text-sm text-brand hover:opacity-70">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        id="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}
                        placeholder="••••••••"
                    />
                </div>
                <button type="submit" disabled={loading} className={primaryButtonClass}>
                    {loading ? 'Logging in…' : 'Log In'}
                </button>
            </form>
            <p className="mt-6 text-center font-montserrat text-sm text-ink">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-medium text-brand hover:opacity-70">Sign up</Link>
            </p>
        </AuthShell>
    );
}
