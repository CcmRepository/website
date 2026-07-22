import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';
import SignOutButton from './SignOutButton';
import EditUsername from './EditUsername';

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Middleware already guards this route; this is a safety net.
    if (!user) {
        redirect('/login');
    }

    const username = user.user_metadata?.username ?? '';

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-cream px-5 py-12 sm:px-12">
            <div className="mx-auto w-full max-w-4xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="font-poppins text-[1.75rem] font-medium text-brand">Dashboard</h1>
                        <p className="mt-1 font-montserrat text-base text-ink">
                            Welcome back, {username || user.email}
                        </p>
                    </div>
                    <SignOutButton />
                </div>

                <div className="mt-8 rounded-2xl border border-[#E6E0D6] bg-white p-8">
                    <h2 className="font-poppins text-xl font-medium text-ink">Account</h2>
                    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                            <dt className="font-montserrat text-sm font-medium text-ink/60">Username</dt>
                            <dd className="font-montserrat text-base text-ink">{username || '—'}</dd>
                        </div>
                        <div>
                            <dt className="font-montserrat text-sm font-medium text-ink/60">Email</dt>
                            <dd className="font-montserrat text-base text-ink">{user.email}</dd>
                        </div>
                        <div>
                            <dt className="font-montserrat text-sm font-medium text-ink/60">User ID</dt>
                            <dd className="break-all font-montserrat text-base text-ink">{user.id}</dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-6 rounded-2xl border border-[#E6E0D6] bg-white p-8">
                    <h2 className="font-poppins text-xl font-medium text-ink">Edit Username</h2>
                    <p className="mt-1 mb-4 font-montserrat text-sm text-ink/60">
                        This is the name shown when you log in.
                    </p>
                    <EditUsername initialUsername={username} />
                </div>
            </div>
        </div>
    );
}
