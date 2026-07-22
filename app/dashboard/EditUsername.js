'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { inputClass, labelClass, Alert } from '@/app/components/auth-ui';

export default function EditUsername({ initialUsername }) {
    const router = useRouter();
    const [username, setUsername] = useState(initialUsername || '');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const trimmed = username.trim();
        if (!trimmed) {
            setError('Username cannot be empty.');
            return;
        }
        if (trimmed === (initialUsername || '')) {
            setMessage('No changes to save.');
            return;
        }

        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({
            data: { username: trimmed },
        });
        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        setMessage('Username updated successfully.');
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md">
            <Alert>{error}</Alert>
            <Alert type="success">{message}</Alert>
            <label htmlFor="username" className={labelClass}>Username</label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                placeholder="Enter a username"
                autoComplete="username"
            />
            <button
                type="submit"
                disabled={loading}
                className="mt-4 cursor-pointer rounded-lg bg-brand px-5 py-2.5 font-poppins text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? 'Saving…' : 'Save Changes'}
            </button>
        </form>
    );
}
