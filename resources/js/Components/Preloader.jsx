import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [count, setCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let start = 0;
        const end = 100;
        const duration = 1000; // 1 detik animasi hitung cepat
        const incrementTime = Math.floor(duration / end);

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 800); // Berikan jeda transisi selesai
                }, 400); // Tahan sejenak di angka 100%
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 bg-[#0A0A0A] text-[#F9F6F0] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Bagian Atas */}
                    <div className="flex justify-between items-center text-xs md:text-sm font-medium uppercase tracking-widest text-[#F9F6F0]/40">
                        <span>PORTFOLIO 2026</span>
                        <span>INTERACTIVE EXPERIENCE</span>
                    </div>

                    {/* Bagian Tengah */}
                    <div className="overflow-hidden">
                        <motion.h1 
                            className="text-4xl md:text-7xl font-display font-bold uppercase leading-none tracking-tighter"
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
                        >
                            CREATIVE STUDIO
                        </motion.h1>
                        <p className="text-xs md:text-sm text-[#FF5722] mt-2 tracking-widest uppercase font-medium">
                            Video Editing / Motion Graphics / Photo Design
                        </p>
                    </div>

                    {/* Bagian Bawah */}
                    <div className="flex justify-between items-end">
                        <div className="text-xs md:text-sm font-medium uppercase tracking-widest text-[#F9F6F0]/40">
                            <span>LOADING ASSETS...</span>
                        </div>
                        <div className="text-6xl md:text-[8rem] font-bold font-mono leading-none tabular-nums text-[#FF5722]">
                            {count.toString().padStart(3, '0')}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
