'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/app/css/Header.module.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);

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

    return (
        <header
            className={`${styles.header} ${hideHeader ? styles.hide : ''}`}
        >
            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <img
                        src={'/images/logo.png'}
                        alt={'logo'}
                        className={styles.logo}
                    />
                    <div className={styles.company}>Cikal Citra Mapan</div>
                </div>
                
                {/* Desktop Menu */}
                <nav className={styles.navDesktop}>
                    <Link href="/">Home</Link>
                    <Link href="/shop">Shop</Link>
                    <Link href="/portfolio">Portfolio</Link>
                    <Link href="/book-online">Book Online</Link>
                </nav>

                {/* Hamburger Button */}
                <button
                    className={styles.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className={styles.navMobile}>
                    <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
                    <Link href="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
                    <Link href="/book-online" onClick={() => setMenuOpen(false)}>Book Online</Link>
                </nav>
            )}
        </header>
    );
}
