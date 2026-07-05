import React, { useEffect, useRef } from 'react';
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
        <section className="relative min-h-screen w-full flex flex-col justify-between p-8 md:p-16 overflow-hidden bg-ivory dark:bg-[#0A0A0A] text-charcoal dark:text-ivory">
            {/* Spotlight Blob */}
            <div 
                ref={blobRef}
                className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-accent/10 dark:bg-accent/15 blur-[80px] md:blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 left-0 top-0 z-0"
                aria-hidden="true"
            />

            {/* Spacer Atas */}
            <div className="z-10" />

            {/* Headline Tengah */}
            <div className="z-10 my-auto flex flex-col items-start max-w-6xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col select-none"
                >
                    {lines.map((line, idx) => (
                        <div key={idx} className="overflow-hidden h-fit py-1">
                            <motion.span
                                variants={lineVariants}
                                className="block text-5xl sm:text-7xl md:text-9xl font-display font-bold uppercase leading-[0.9] tracking-tighter"
                            >
                                {line}
                            </motion.span>
                        </div>
                    ))}
                </motion.div>

                {/* Sub-headline Deskripsi */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
                    className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8"
                >
                    <p className="text-sm md:text-lg max-w-xl leading-relaxed text-charcoal/70 dark:text-ivory/70 font-medium">
                        Saya menciptakan karya visual berkarakter—mulai dari video editing tempo tinggi, efek motion graphics dinamis, hingga manipulasi foto surealis berkualitas tinggi.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={onExploreClick}
                        data-cursor="magnetic"
                        className="group relative flex items-center justify-center px-8 py-5 rounded-full border border-charcoal/10 dark:border-ivory/10 hover:border-accent dark:hover:border-accent text-sm uppercase tracking-widest font-bold z-10 transition-colors duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-[#F9F6F0] transition-colors duration-300">
                            Lihat Karya
                            <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 stroke-current transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth="1.5">
                                <path d="M1 9L9 1M9 1H2M9 1V8" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center z-0" />
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator Bawah */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="z-10 flex justify-between items-end text-xs tracking-widest text-charcoal/40 dark:text-ivory/40"
            >
                <div className="flex items-center gap-2">
                    <span className="font-bold">SCROLL DOWN</span>
                    <motion.div 
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-4 h-6 border border-charcoal/30 dark:border-ivory/30 rounded-full flex items-start justify-center p-1"
                    >
                        <div className="w-1 h-1.5 bg-accent rounded-full" />
                    </motion.div>
                </div>
                <div>
                    <span>© DESIGN PORTFOLIO</span>
                </div>
            </motion.div>
        </section>
    );
}
