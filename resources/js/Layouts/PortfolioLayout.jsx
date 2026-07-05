import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import useLenis from '@/Hooks/useLenis';
import useCustomCursor from '@/Hooks/useCustomCursor';
import CustomCursor from '@/Components/CustomCursor';
import NoiseOverlay from '@/Components/NoiseOverlay';
import Preloader from '@/Components/Preloader';

export default function PortfolioLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(true); // Default mode gelap agar terkesan premium
    
    // Inisialisasi Lenis & Kursor Kustom
    useLenis(!loading);
    const { cursorRef, cursorType } = useCustomCursor();

    useEffect(() => {
        // Kelola Tema Gelap/Terang
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const dark = savedTheme === 'dark';
        setIsDark(dark);
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Cek jika preloader pernah dimuat di sesi ini (opsional: matikan jika ingin selalu muncul untuk demo)
        const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
        if (hasLoadedBefore) {
            setLoading(false);
        }
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        localStorage.setItem('theme', nextDark ? 'dark' : 'light');
        if (nextDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handlePreloaderComplete = () => {
        setLoading(false);
        sessionStorage.setItem('hasLoadedBefore', 'true');
    };

    return (
        <>
            {/* Preloader */}
            {loading && <Preloader onComplete={handlePreloaderComplete} />}

            {/* Custom Cursor */}
            <CustomCursor cursorRef={cursorRef} cursorType={cursorType} />

            {/* Grain Texture Overlay */}
            <NoiseOverlay />

            {/* Struktur Layout Utama */}
            <div className="min-h-screen bg-ivory dark:bg-[#0A0A0A] text-charcoal dark:text-ivory selection:bg-[#FF5722] selection:text-[#F9F6F0] flex flex-col justify-between font-sans">
                {/* Header / Navigation */}
                <header className="fixed top-0 left-0 right-0 z-[1000] p-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        data-cursor="magnetic"
                        className="text-lg md:text-xl font-display font-bold uppercase tracking-widest text-[#F9F6F0] pointer-events-auto"
                    >
                        DESIGNER.
                    </Link>

                    {/* Right Options */}
                    <div className="flex items-center gap-6 pointer-events-auto">
                        {/* Dark/Light Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            data-cursor="magnetic"
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-ivory/10 hover:border-[#FF5722] transition-colors duration-300 bg-transparent text-[#F9F6F0]"
                            title="Ubah Tema"
                        >
                            {isDark ? (
                                // Sun Icon (Light Mode)
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M3 12h2.25m13.5 0H21M9.172 9.172L7.757 7.757m11.314 11.314l-1.415-1.415M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                                </svg>
                            ) : (
                                // Moon Icon (Dark Mode)
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="w-full flex-grow">{children}</main>

                {/* Footer Minimalis */}
                <footer className="w-full bg-ivory dark:bg-[#0A0A0A] border-t border-charcoal/5 dark:border-ivory/5 py-12 px-8 text-center text-xs tracking-widest text-charcoal/40 dark:text-ivory/40 select-none">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="uppercase">
                            <span>Designed with passion & logic © 2026</span>
                        </div>
                        <div className="flex gap-6 uppercase">
                            <a href="mailto:contact@designer.com" data-cursor="magnetic" className="hover:text-accent font-bold transition-colors duration-300">
                                Email Saya
                            </a>
                            <button 
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                                data-cursor="magnetic" 
                                className="hover:text-accent font-bold transition-colors duration-300"
                            >
                                Kembali ke Atas
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
