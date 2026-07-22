'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { Alert } from '@/app/components/auth-ui';

export default function NavManager({ items }) {
    const router = useRouter();
    const [rows, setRows] = useState(items);
    const [savingKey, setSavingKey] = useState(null);
    const [error, setError] = useState('');

    const toggle = async (key, next) => {
        setError('');
        setSavingKey(key);
        // Optimistic update.
        setRows((prev) => prev.map((r) => (r.key === key ? { ...r, enabled: next } : r)));

        const supabase = createClient();
        const { error } = await supabase
            .from('nav_items')
            .update({ enabled: next })
            .eq('key', key);

        setSavingKey(null);

        if (error) {
            setError(error.message);
            // Revert on failure.
            setRows((prev) => prev.map((r) => (r.key === key ? { ...r, enabled: !next } : r)));
            return;
        }

        // Refresh so the header (rendered in the layout) reflects the change.
        router.refresh();
    };

    return (
        <div>
            <Alert>{error}</Alert>
            <ul className="divide-y divide-[#ECECEC]">
                {rows.map((item) => (
                    <li key={item.key} className="flex items-center justify-between py-3">
                        <div>
                            <div className="font-montserrat text-base font-medium text-ink">{item.label}</div>
                            <div className="font-montserrat text-sm text-ink/60">{item.href}</div>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={item.enabled}
                            aria-label={`Toggle ${item.label}`}
                            disabled={savingKey === item.key}
                            onClick={() => toggle(item.key, !item.enabled)}
                            className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                                item.enabled ? 'bg-brand' : 'bg-[#d9d9d9]'
                            }`}
                        >
                            <span
                                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                                    item.enabled ? 'translate-x-[1.375rem]' : 'translate-x-0.5'
                                }`}
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
