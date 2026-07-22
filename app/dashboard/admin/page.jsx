import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';
import { getUserRole } from '@/app/utils/roles';
import { getNavItems } from '@/app/utils/nav';
import NavManager from './NavManager';

export default async function AdminPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Admin-only: send non-admins back to their profile.
    const role = await getUserRole(supabase, user.id);
    if (role !== 'admin') {
        redirect('/dashboard');
    }

    const navItems = await getNavItems(supabase);

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-cream px-5 py-12 sm:px-12">
            <div className="mx-auto w-full max-w-4xl">
                <div className="flex items-center gap-3">
                    <h1 className="font-poppins text-[1.75rem] font-medium text-brand">Admin Area</h1>
                    <span className="rounded-full bg-brand px-3 py-0.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-white">
                        admin
                    </span>
                </div>
                <p className="mt-1 font-montserrat text-base text-ink">
                    Administrator-only tools and settings.
                </p>

                <div className="mt-8 rounded-2xl border border-brand bg-white p-8">
                    <h2 className="font-poppins text-xl font-medium text-brand">Page Visibility</h2>
                    <p className="mt-1 mb-2 font-montserrat text-sm text-ink/60">
                        Enable or disable pages shown in the header menu. Home is always visible.
                    </p>
                    <NavManager items={navItems} />
                </div>
            </div>
        </div>
    );
}
