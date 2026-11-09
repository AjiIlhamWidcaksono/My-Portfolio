import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Hero({ onExploreClick }) {
    const blobRef = useRef(null);

    useEffect(() => {
        // Matikan efek pointer pada perangkat sentuh
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e) => {
            gsap.to(blobRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: 'auto'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Split headline untuk efek text reveal
    const lines = [
        "CREATIVE",
        "DESIGNER",
        "& EDITOR"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const lineVariants = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-hidden bg-ivory dark:bg-[#0A0A0A] text-charcoal dark:text-ivory">
            {/* Spotlight Blob */}
            <div 
                ref={blobRef}
                className="absolute w-[300px] h-[300px] md:w-[550px] md:h-[550px] rounded-full bg-accent/15 dark:bg-accent/20 blur-[90px] md:blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2 left-0 top-0 z-0"
                aria-hidden="true"
            />

            {/* Spacer Atas untuk Navbar */}
            <div className="z-10 h-14 md:h-16" />

            {/* Konten Utama Grid 2 Kolom (Headline di Kiri & Interactive Showcase di Kanan) */}
            <div className="z-10 my-auto w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8">
                {/* Kolom Kiri: Headline, Deskripsi & CTA */}
                <div className="lg:col-span-7 flex flex-col items-start select-none">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col"
                    >
                        {lines.map((line, idx) => (
                            <div key={idx} className="overflow-hidden h-fit py-0.5">
                                <motion.span
                                    variants={lineVariants}
                                    className="block text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] font-display font-bold uppercase leading-[0.88] tracking-tighter"
                                >
                                    {line}
                                </motion.span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Sub-headline Deskripsi */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.85, ease: [0.215, 0.61, 0.355, 1] }}
                        className="mt-6 md:mt-8 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed text-charcoal/70 dark:text-ivory/70 font-medium"
                    >
                        Saya menciptakan karya visual berkarakter—mulai dari video editing tempo tinggi, efek motion graphics dinamis, hingga manipulasi foto surealis berkualitas tinggi.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
                        className="mt-8 flex flex-wrap items-center gap-5"
                    >
                        <button
                            onClick={onExploreClick}
                            data-cursor="magnetic"
                            className="group relative flex items-center justify-center px-8 py-4 md:py-5 rounded-full border border-charcoal/15 dark:border-ivory/15 hover:border-accent dark:hover:border-accent text-sm uppercase tracking-widest font-bold z-10 transition-colors duration-300 shadow-sm"
                        >
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#F9F6F0] transition-colors duration-300">
                                Lihat Karya
                                <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 stroke-current transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth="1.5">
                                    <path d="M1 9L9 1M9 1H2M9 1V8" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center z-0" />
                        </button>

                        <div className="hidden sm:flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-charcoal/50 dark:text-ivory/50">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span>11+ Proyek Pilihan</span>
                        </div>
                    </motion.div>
                </div>

                {/* Kolom Kanan: Interactive 3D Showcase Reel & Kinetic Elements */}
                <div className="lg:col-span-5 flex justify-center items-center relative w-full pt-6 lg:pt-0">
                    <InteractiveHeroReel />
                </div>
            </div>

            {/* Scroll Indicator Bawah */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="z-10 flex justify-between items-end text-xs tracking-widest text-charcoal/40 dark:text-ivory/40 pt-4"
            >
                <div className="flex items-center gap-2 select-none">
                    <span className="font-bold">SCROLL DOWN</span>
                    <motion.div 
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-4 h-6 border border-charcoal/30 dark:border-ivory/30 rounded-full flex items-start justify-center p-1"
                    >
                        <div className="w-1 h-1.5 bg-accent rounded-full" />
                    </motion.div>
                </div>
                <div className="select-none">
                    <span>© DESIGN PORTFOLIO</span>
                </div>
            </motion.div>
        </section>
    );
}

// Sub-Komponen Showcase Interaktif 3D Tilt Reel di Bagian Kanan Hero
function InteractiveHeroReel() {
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [timecode, setTimecode] = useState('00:00:12:04');

    // Simulator running timecode video editor (frame counter)
    useEffect(() => {
        let frame = 12;
        let second = 14;
        const interval = setInterval(() => {
            frame = (frame + 1) % 30;
            if (frame === 0) second = (second + 1) % 60;
            const secStr = second.toString().padStart(2, '0');
            const frmStr = frame.toString().padStart(2, '0');
            setTimecode(`00:00:${secStr}:${frmStr}`);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // 3D Parallax Tilt Effect saat mouse digerakkan di atas kartu
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 sampai 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(cardRef.current, {
            rotateY: x * 16,
            rotateX: -y * 16,
            transformPerspective: 900,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.45)',
            overwrite: 'auto'
        });
    };

    const toggleAudio = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[430px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
        >
            {/* Satelit 1: Floating Status Badge (Kanan Atas) */}
            <motion.div
                animate={{ y: [-4, 5, -4] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-2 sm:-right-5 z-30 px-3.5 py-1.5 rounded-full bg-ivory/90 dark:bg-[#151515]/90 border border-charcoal/10 dark:border-ivory/15 backdrop-blur-md shadow-2xl flex items-center gap-2 select-none"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-charcoal/80 dark:text-ivory/90">
                    Open for Projects
                </span>
            </motion.div>

            {/* Satelit 2: Rotating Circular Typography Stamp (Kiri Bawah) */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-7 -left-4 sm:-left-7 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-charcoal/15 dark:border-ivory/15 bg-ivory/80 dark:bg-[#0E0E0E]/85 backdrop-blur-md flex items-center justify-center select-none shadow-2xl pointer-events-none"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-charcoal/70 dark:text-ivory/70 text-[8.5px] uppercase font-bold tracking-[0.24em]">
                    <path id="hero-stamp-path" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                    <text>
                        <textPath href="#hero-stamp-path">
                            • MOTION DESIGN • VIDEO EDITING • CREATIVE •
                        </textPath>
                    </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-accent text-base font-bold">
                    ✦
                </div>
            </motion.div>

            {/* Glow Aura di Belakang Kartu Showcase */}
            <div className="absolute inset-4 bg-accent/25 rounded-3xl blur-2xl z-0 transform scale-95 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Kartu Showcase 3D Utama */}
            <div
                ref={cardRef}
                className="relative z-10 w-full rounded-3xl overflow-hidden bg-charcoal border border-charcoal/20 dark:border-ivory/15 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-shadow duration-500 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Aspek Rasio Kontainer Video */}
                <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden bg-black">
                    <video
                        ref={videoRef}
                        src="videos/video1.mp4"
                        poster="images/thumb_video1.jpg"
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out scale-105"
                    />

                    {/* Gradient Overlay Gelap Atas & Bawah */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                    {/* Header Overlay di Dalam Video: Timecode & Kualitas */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-ivory bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span>REC {timecode}</span>
                        </div>
                        <div className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-ivory/80 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                            4K • 60 FPS
                        </div>
                    </div>

                    {/* Center Overlay: Mini Play Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{ scale: isHovered ? 1.08 : 1, opacity: isHovered ? 0.9 : 0.6 }}
                            transition={{ duration: 0.3 }}
                            className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm flex items-center justify-center text-ivory"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 translate-x-0.5">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Footer Overlay di Dalam Video: Waveform Visualizer & Kontrol Suara */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                        {/* Audio Waveform Equalizer Visualizer */}
                        <div className="flex items-center gap-2.5 bg-black/60 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10">
                            <div className="flex items-end gap-1 h-5">
                                {[0.7, 0.4, 0.9, 0.3, 0.8, 1.0, 0.5, 0.75].map((h, i) => (
                                    <motion.span
                                        key={i}
                                        animate={{ 
                                            scaleY: isHovered 
                                                ? [h * 0.3, h, h * 0.15, h * 0.9, h * 0.4] 
                                                : [0.25, h * 0.6, 0.2] 
                                        }}
                                        transition={{ 
                                            duration: 0.6 + (i * 0.08), 
                                            repeat: Infinity, 
                                            ease: 'easeInOut' 
                                        }}
                                        className="w-1 bg-accent rounded-full origin-bottom h-full"
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] font-mono tracking-wider text-ivory/80 uppercase font-semibold">
                                Showreel
                            </span>
                        </div>

                        {/* Interactive Mute / Unmute Button */}
                        <button
                            onClick={toggleAudio}
                            className="w-9 h-9 rounded-xl bg-black/60 hover:bg-accent border border-white/10 flex items-center justify-center text-ivory transition-colors duration-300"
                            title={isMuted ? "Aktifkan Suara" : "Bisukan"}
                        >
                            {isMuted ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H9z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-accent">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer Tag di Bawah Kartu */}
                <div className="p-4 bg-charcoal/95 border-t border-white/5 flex items-center justify-between select-none">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
                            Featured Highlight
                        </span>
                        <span className="text-xs font-bold text-ivory tracking-wide uppercase">
                            Dynamic Visual Production
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-ivory/50">
                        2026 REEL
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
