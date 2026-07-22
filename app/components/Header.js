'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/app/utils/supabase/client';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

        supabase.auth.getUser().then(({ data: { user } }) => {
            setIsLoggedIn(!!user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session?.user);
        });

        return () => subscription.unsubscribe();
    }, []);

    const authHref = isLoggedIn ? '/dashboard' : '/login';
    const authLabel = isLoggedIn ? 'Dashboard' : 'Login';

    return (
        <header
            className={`fixed top-0 w-full z-[1000] bg-brand border-b-2 border-[#5f574a] [transition:transform_0.5s_ease] ${hideHeader ? '-translate-y-full' : ''}`}
        >
            <div className="max-w-[75rem] mx-auto py-4 px-5 flex items-center justify-between">
                {/* Logo */}
                <div className="flex flex-row items-center">
                    <img
                        src={'/images/logo.png'}
                        alt={'logo'}
                        className="w-auto h-10 pr-4 invert"
                    />
                    <div className="text-white font-poppins text-2xl font-medium">Cikal Citra Mapan</div>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center font-montserrat text-base font-medium gap-5">
                    <Link href="/" className="text-white font-medium hover:opacity-65">Home</Link>
                    <Link href="/shop" className="text-white font-medium hover:opacity-65">Shop</Link>
                    <Link href="/portfolio" className="text-white font-medium hover:opacity-65">Portfolio</Link>
                    <Link href="/book-online" className="text-white font-medium hover:opacity-65">Book Online</Link>
                    <Link href={authHref} className="rounded-md border border-white/40 px-3 py-1 text-white font-medium transition-colors hover:bg-white/10">{authLabel}</Link>
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
                    <Link href="/shop" className="py-4 px-5 border-b-2 border-[#ECECEC] text-ink" onClick={() => setMenuOpen(false)}>Shop</Link>
                    <Link href="/portfolio" className="py-4 px-5 border-b-2 border-[#ECECEC] text-ink" onClick={() => setMenuOpen(false)}>Portfolio</Link>
                    <Link href="/book-online" className="py-4 px-5 border-b-2 border-[#ECECEC] text-ink" onClick={() => setMenuOpen(false)}>Book Online</Link>
                    <Link href={authHref} className="py-4 px-5 border-b-2 border-[#ECECEC] font-semibold text-brand" onClick={() => setMenuOpen(false)}>{authLabel}</Link>
                </nav>
            )}
        </header>
    );
}
