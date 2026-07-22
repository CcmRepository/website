'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';

export default function Header({ navItems = [] }) {
    const router = useRouter();
    const pages = navItems.filter((item) => item.enabled);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('user');
    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef(null);

    const isAdmin = role === 'admin';

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 120) {
                setHideHeader(true);
            } else {
                setHideHeader(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const supabase = createClient();

        const load = async (user) => {
            setIsLoggedIn(!!user);
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .maybeSingle();
                setRole(data?.role ?? 'user');
            } else {
                setRole('user');
            }
        };

        supabase.auth.getUser().then(({ data: { user } }) => load(user));

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => load(session?.user ?? null)
        );

        return () => subscription.unsubscribe();
    }, []);

    // Close the account dropdown when clicking outside of it.
    useEffect(() => {
        const handler = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setAccountOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setAccountOpen(false);
        setMenuOpen(false);
        router.push('/');
        router.refresh();
    };

    const menuItemClass =
        'block w-full cursor-pointer px-4 py-2 text-left font-montserrat text-sm text-ink transition-colors hover:bg-cream';

    return (
        <header
            className={`fixed top-0 w-full z-[1000] bg-brand border-b-2 border-[#5f574a] [transition:transform_0.5s_ease] ${hideHeader ? '-translate-y-full' : ''}`}
        >
            <div className="max-w-[75rem] mx-auto py-4 px-5 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-row items-center">
                    <img
                        src={'/images/logo.png'}
                        alt={'logo'}
                        className="w-auto h-10 pr-4 invert"
                    />
                    <div className="text-white font-poppins text-2xl font-medium">Cikal Citra Mapan</div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center font-montserrat text-base font-medium gap-5">
                    <Link href="/" className="text-white font-medium hover:opacity-65">Home</Link>
                    {pages.map((item) => (
                        <Link key={item.key} href={item.href} className="text-white font-medium hover:opacity-65">{item.label}</Link>
                    ))}

                    {isLoggedIn ? (
                        <div className="relative" ref={accountRef}>
                            <button
                                type="button"
                                onClick={() => setAccountOpen((o) => !o)}
                                className="flex cursor-pointer items-center gap-1.5 rounded-md border border-white/40 px-3 py-1 text-white font-medium transition-colors hover:bg-white/10"
                            >
                                Dashboard
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className={`transition-transform ${accountOpen ? 'rotate-180' : ''}`}
                                >
                                    <path d="M5 7.5L10 12l5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {accountOpen && (
                                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-[#E6E0D6] bg-white py-1 shadow-lg">
                                    <Link href="/dashboard" className={menuItemClass} onClick={() => setAccountOpen(false)}>
                                        Profile
                                    </Link>
                                    {isAdmin && (
                                        <Link href="/dashboard/admin" className={menuItemClass} onClick={() => setAccountOpen(false)}>
                                            Admin Area
                                        </Link>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className={`${menuItemClass} border-t border-[#ECECEC]`}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="rounded-md border border-white/40 px-3 py-1 text-white font-medium transition-colors hover:bg-white/10">
                            Login
                        </Link>
                    )}
                </nav>

                {/* Hamburger Button */}
                <button
                    className="flex md:hidden flex-col gap-2 bg-none border-none cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="flex flex-col bg-[#F8FAFC] border-t-[0.215rem] border-[#d9d9d9] font-montserrat text-base font-medium">
                    <Link href="/" className="py-4 px-5 border-b-2 border-[#ECECEC] text-ink" onClick={() => setMenuOpen(false)}>Home</Link>
                    {pages.map((item) => (
                        <Link key={item.key} href={item.href} className="py-4 px-5 border-b-2 border-[#ECECEC] text-ink" onClick={() => setMenuOpen(false)}>{item.label}</Link>
                    ))}

                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard" className="py-4 px-5 border-b-2 border-[#ECECEC] font-semibold text-brand" onClick={() => setMenuOpen(false)}>Profile</Link>
                            {isAdmin && (
                                <Link href="/dashboard/admin" className="py-4 px-5 border-b-2 border-[#ECECEC] font-semibold text-brand" onClick={() => setMenuOpen(false)}>Admin Area</Link>
                            )}
                            <button type="button" onClick={handleSignOut} className="cursor-pointer py-4 px-5 border-b-2 border-[#ECECEC] text-left font-semibold text-brand">Sign Out</button>
                        </>
                    ) : (
                        <Link href="/login" className="py-4 px-5 border-b-2 border-[#ECECEC] font-semibold text-brand" onClick={() => setMenuOpen(false)}>Login</Link>
                    )}
                </nav>
            )}
        </header>
    );
}
