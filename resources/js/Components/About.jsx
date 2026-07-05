import React from 'react';
import { motion } from 'framer-motion';

export default function About({ tools = [] }) {
    // Daftar tools default dengan ikon SVG jika data dari database belum selesai dimuat
    const defaultTools = [
        {
            name: 'Adobe After Effects',
            logo_svg: '<svg viewBox="0 0 24 24" fill="none" class="w-12 h-12 text-[#9999FF]"><rect width="24" height="24" rx="4" fill="#131332" stroke="#9999FF" stroke-width="1.5"/><text x="4.5" y="16" fill="#9999FF" font-family="system-ui, sans-serif" font-weight="bold" font-size="11px">Ae</text></svg>'
        },
        {
            name: 'Adobe Premiere Pro',
            logo_svg: '<svg viewBox="0 0 24 24" fill="none" class="w-12 h-12 text-[#FF99FF]"><rect width="24" height="24" rx="4" fill="#321332" stroke="#FF99FF" stroke-width="1.5"/><text x="5" y="16" fill="#FF99FF" font-family="system-ui, sans-serif" font-weight="bold" font-size="11px">Pr</text></svg>'
        },
        {
            name: 'Adobe Photoshop',
            logo_svg: '<svg viewBox="0 0 24 24" fill="none" class="w-12 h-12 text-[#99CCFF]"><rect width="24" height="24" rx="4" fill="#132B40" stroke="#99CCFF" stroke-width="1.5"/><text x="5.5" y="16" fill="#99CCFF" font-family="system-ui, sans-serif" font-weight="bold" font-size="11px">Ps</text></svg>'
        },
        {
            name: 'Figma',
            logo_svg: '<svg viewBox="0 0 24 24" fill="none" class="w-12 h-12"><rect width="24" height="24" rx="4" fill="#1E1E1E" stroke="#F24E1E" stroke-width="1.5"/><path d="M9.5 7.5a1.5 1.5 0 1 1 3 0v1.5h-3V7.5zM9.5 10.5a1.5 1.5 0 1 1 3 0V12h-3v-1.5zM9.5 13.5a1.5 1.5 0 1 1 1.5 1.5h-1.5v-1.5zM12.5 10.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 1 1 0 3h-1v-1.5zM12.5 7.5a1.5 1.5 0 0 1 3 0 1.5 1.5 0 0 1-3 0z" fill="#FFF"/></svg>'
        },
        {
            name: 'CapCut',
            logo_svg: '<svg viewBox="0 0 24 24" fill="none" class="w-12 h-12 text-white"><rect width="24" height="24" rx="4" fill="#000" stroke="#39FF14" stroke-width="1.5"/><path d="M7 7h4v4H7V7zm6 6h4v4h-4v-4z" fill="#39FF14"/><circle cx="9" cy="15" r="2" fill="#FF5722"/><circle cx="15" cy="9" r="2" fill="#39FF14"/></svg>'
        },
    ];

    const displayTools = tools.length > 0 ? tools : defaultTools;

    // Gandakan array tools untuk efek marquee yang menyatu tanpa terputus
    const marqueeItems = [...displayTools, ...displayTools, ...displayTools];

    return (
        <section className="relative w-full py-24 md:py-36 bg-ivory dark:bg-[#0A0A0A] text-charcoal dark:text-ivory overflow-hidden border-t border-charcoal/5 dark:border-ivory/5">
            <div className="max-w-6xl mx-auto px-8">
                {/* Judul Section */}
                <div className="flex flex-col mb-16">
                    <span className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-3">01 / ABOUT ME</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">KREATIVITAS & FOKUS KARYA</h2>
                </div>

                {/* Grid Asimetris */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
                    {/* Sisi Kiri: Foto / Elemen Visual Abstrak */}
                    <div className="md:col-span-5 relative group">
                        <div className="absolute inset-0 bg-[#FF5722] rounded-2xl rotate-3 scale-[0.98] group-hover:rotate-0 transition-transform duration-500 ease-out z-0" />
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-charcoal z-10 border border-charcoal/10 dark:border-ivory/10">
                            <img
                                src="https://picsum.photos/id/64/600/800"
                                alt="Potret Desainer"
                                className="w-full h-full object-cover grayscale contrast-115 hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
                            />
                        </div>
                    </div>

                    {/* Sisi Kanan: Bio & Deskripsi */}
                    <div className="md:col-span-7 flex flex-col justify-center h-full pt-4">
                        <h3 className="text-xl md:text-3xl font-bold font-display uppercase tracking-tight mb-6 leading-tight">
                            "Menerjemahkan ide abstrak menjadi visual yang berbicara dan bergerak dinamis."
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed text-charcoal/70 dark:text-ivory/70 mb-8 font-medium">
                            Sebagai seorang desainer grafis dan editor video/foto profesional, saya berfokus pada estetika minimalis modern yang memiliki jiwa dan kekuatan visual. Saya percaya bahwa setiap proyek, baik video promosi media sosial, visual efek motion graphics, hingga retouch foto editorial memiliki cara uniknya sendiri untuk berkomunikasi.
                        </p>
                        
                        {/* CV Download Button */}
                        <div className="flex items-center">
                            <a
                                href="#"
                                download
                                data-cursor="magnetic"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-charcoal dark:bg-ivory text-[#F9F6F0] dark:text-[#0A0A0A] font-bold rounded-full overflow-hidden text-sm uppercase tracking-wider transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Unduh CV Saya
                                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 stroke-current transform group-hover:translate-y-0.5 transition-transform duration-300" strokeWidth="2">
                                        <path d="M6 1v7M3 5.5L6 8.5L9 5.5M1 11h10" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-[#FF5722] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left z-0" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee Infinite Scroll (Tools) */}
            <div className="mt-24 md:mt-36 border-y border-charcoal/10 dark:border-ivory/10 py-10 bg-charcoal/[0.02] dark:bg-ivory/[0.02]">
                <div className="overflow-hidden w-full whitespace-nowrap">
                    <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] gap-16 md:gap-24">
                        {marqueeItems.map((tool, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 select-none shrink-0"
                            >
                                <div
                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                                    dangerouslySetInnerHTML={{ __html: tool.logo_svg }}
                                />
                                <span className="text-sm md:text-lg font-display font-bold uppercase tracking-widest text-charcoal/60 dark:text-ivory/60 hover:text-[#FF5722] dark:hover:text-[#FF5722] transition-colors duration-300">
                                    {tool.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
