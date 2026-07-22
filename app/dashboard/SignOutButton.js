'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="rounded-lg bg-brand px-5 py-2.5 font-poppins text-base font-medium text-white transition-opacity hover:opacity-90"
        >
            Sign Out
        </button>
    );
}
