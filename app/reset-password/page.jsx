'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { AuthShell, Alert, inputClass, labelClass, primaryButtonClass } from '@/app/components/auth-ui';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push('/dashboard');
        router.refresh();
    };

    return (
        <AuthShell title="Set New Password" subtitle="Choose a new password for your account">
            <Alert>{error}</Alert>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="password" className={labelClass}>New Password</label>
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
                    <label htmlFor="confirm" className={labelClass}>Confirm New Password</label>
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
                    {loading ? 'Updating…' : 'Update Password'}
                </button>
            </form>
        </AuthShell>
    );
}
