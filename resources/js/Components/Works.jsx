import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Works({ projects = [] }) {
    const [activeFilter, setActiveFilter] = useState('Semua');

    const categories = [
        'Semua',
        'Desain Grafis',
        'Motion Graphics'
    ];

    // Saring proyek berdasarkan kategori terpilih
    const filteredProjects = activeFilter === 'Semua'
        ? projects
        : projects.filter(p => p.category?.name === activeFilter);

    return (
        <section id="works-section" className="relative w-full py-24 md:py-36 bg-ivory dark:bg-[#0A0A0A] text-charcoal dark:text-ivory">
            <div className="max-w-6xl mx-auto px-8">
                {/* Header Bagian */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-3">02 / PORTFOLIO</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">KARYA PILIHAN</h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 border-b border-charcoal/10 dark:border-ivory/10 pb-2 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all duration-300 relative rounded-full ${
                                    activeFilter === cat
                                        ? 'text-[#F9F6F0] bg-[#FF5722]'
                                        : 'text-charcoal/50 dark:text-ivory/50 hover:text-charcoal dark:hover:text-ivory'
                                }`}
                                style={{ transform: 'translate3d(0,0,0)' }}
                            >
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Responsive Masonry Layout */}
                <div className="relative">
                    {/* Desktop Layout (2 Columns Masonry) */}
                    <div className="hidden md:grid grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column (Even indices) */}
                        <div className="flex flex-col gap-8 md:gap-12">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.filter((_, idx) => idx % 2 === 0).map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                        {/* Right Column (Odd indices) */}
                        <div className="flex flex-col gap-8 md:gap-12">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.filter((_, idx) => idx % 2 !== 0).map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Layout (1 Column Sequential) */}
                    <div className="flex flex-col gap-8 md:hidden">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Sub-Komponen Kartu Proyek Individual
function ProjectCard({ project }) {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="relative overflow-hidden rounded-2xl bg-charcoal select-none group w-full cursor-none h-auto"
            data-cursor="grow"
        >
            {/* Media Container */}
            <div className="relative w-full h-auto overflow-hidden z-0">
                {/* Render Video Preview jika ada video_url dan diputar otomatis */}
                {project.video_url ? (
                    <video
                        src={project.video_url}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        poster={project.hero_url}
                        className="w-full h-auto block"
                    />
                ) : (
                    /* Render Hero Image jika tidak ada video */
                    <img
                        src={project.hero_url}
                        alt={project.title}
                        className="w-full h-auto block transition-all duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                )}

                {/* Dark overlay gradien yang naik dari bawah saat di-hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-60 group-hover:opacity-90 group-hover:translate-y-0 translate-y-4 transition-all duration-500 z-10 pointer-events-none" />
            </div>

            {/* Teks Konten Detail Proyek */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col items-start translate-y-3 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <span className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.category?.name}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-[#F9F6F0] leading-tight uppercase tracking-tight">
                    {project.title}
                </h3>
                
                {/* Tools yang digunakan */}
                <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-100">
                    {project.tools?.map(tool => (
                        <span 
                            key={tool.id} 
                            className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-ivory/10 text-ivory rounded-full backdrop-blur-sm"
                        >
                            {tool.name.replace("Adobe ", "")}
                        </span>
                    ))}
                </div>
            </div>

            {/* Mute/Unmute Overlay Button untuk Video */}
            {project.video_url ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                    }}
                    className="absolute bottom-6 right-6 z-30 p-3 rounded-full bg-[#0A0A0A]/60 hover:bg-[#FF5722] text-[#F9F6F0] backdrop-blur-sm border border-ivory/10 hover:border-transparent transition-all duration-300 pointer-events-auto"
                    data-cursor="magnetic"
                    title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
                >
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    )}
                </button>
            ) : null}
        </motion.div>
    );
}
