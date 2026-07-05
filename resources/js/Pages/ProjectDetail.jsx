import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PortfolioLayout from '@/Layouts/PortfolioLayout';

export default function ProjectDetail({ project, nextProject }) {
    return (
        <PortfolioLayout>
            <Head title={`${project.title} - Portofolio`} />

            <div className="relative min-h-screen bg-ivory dark:bg-[#0A0A0A] text-charcoal dark:text-ivory pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-8">
                    {/* Back Button */}
                    <Link
                        href="/"
                        data-cursor="magnetic"
                        className="group inline-flex items-center gap-2 mb-12 text-xs uppercase tracking-widest font-bold text-charcoal/50 dark:text-ivory/50 hover:text-accent dark:hover:text-accent transition-colors duration-300"
                    >
                        <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 stroke-current transform group-hover:-translate-x-1 transition-transform duration-300" strokeWidth="1.5">
                            <path d="M9 5H1M1 5L5 9M1 5L5 1" />
                        </svg>
                        Kembali ke Beranda
                    </Link>

                    {/* Project Title Banner */}
                    <div className="flex flex-col mb-12 select-none">
                        <span className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-3">
                            {project.category?.name}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight leading-none max-w-4xl">
                            {project.title}
                        </h1>
                    </div>

                    {/* Shared Layout Hero Media (Morph) */}
                    <motion.div
                        layoutId={`project-card-${project.id}`}
                        className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl bg-charcoal border border-charcoal/10 dark:border-ivory/10 mb-16"
                    >
                        {project.video_url ? (
                            <video
                                src={project.video_url}
                                controls
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover z-0"
                            />
                        ) : (
                            <motion.img
                                layoutId={`project-media-${project.id}`}
                                src={project.hero_url}
                                alt={project.title}
                                className="w-full h-full object-cover z-0"
                            />
                        )}
                    </motion.div>

                    {/* Layout Grid: Detail Konten */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-24">
                        {/* Sidebar Kiri (Metadata) */}
                        <div className="md:col-span-4 flex flex-col gap-8 md:sticky md:top-24 h-fit border-t border-charcoal/10 dark:border-ivory/10 pt-8">
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-ivory/40 font-bold block mb-1">KLIEN</span>
                                <span className="text-sm font-semibold uppercase">{project.client || 'Personal Project'}</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-ivory/40 font-bold block mb-1">TANGGAL PROYEK</span>
                                <span className="text-sm font-semibold">
                                    {project.project_date ? new Date(project.project_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' }) : 'N/A'}
                                </span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-ivory/40 font-bold block mb-1">ALAT DESAIN / TOOLS</span>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {project.tools?.map(tool => (
                                        <span
                                            key={tool.id}
                                            className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-charcoal/5 dark:bg-ivory/5 text-charcoal/70 dark:text-ivory/70 rounded-full"
                                        >
                                            {tool.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Konten Kanan (Narasi & Proses) */}
                        <div className="md:col-span-8 flex flex-col gap-10">
                            <div>
                                <h2 className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-4">01 / RINGKASAN PROYEK</h2>
                                <p className="text-base md:text-lg leading-relaxed text-charcoal/80 dark:text-ivory/80 font-medium">
                                    {project.description}
                                </p>
                            </div>

                            {project.process_breakdown && (
                                <div className="border-t border-charcoal/10 dark:border-ivory/10 pt-10">
                                    <h2 className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-6">02 / PROSES PEMBUATAN</h2>
                                    <div
                                        className="prose prose-charcoal dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-charcoal/70 dark:text-ivory/70 space-y-6"
                                        dangerouslySetInnerHTML={{ __html: project.process_breakdown }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Galeri Tambahan (Spatie Media Library) */}
                    {project.gallery_urls && project.gallery_urls.length > 0 && (
                        <div className="border-t border-charcoal/10 dark:border-ivory/10 pt-16 mb-24">
                            <h2 className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-8">03 / GALERI KARYA</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.gallery_urls.map((url, idx) => (
                                    <div key={idx} className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-charcoal border border-charcoal/10 dark:border-ivory/10 group">
                                        <img
                                            src={url}
                                            alt={`Galeri ${project.title} - ${idx + 1}`}
                                            className="w-full h-full object-cover transition-all duration-700 hover:scale-102"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Proyek Selanjutnya (Footer Page Navigation) */}
                    {nextProject && (
                        <div className="border-t border-charcoal/10 dark:border-ivory/10 pt-16 mt-16">
                            <span className="text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-ivory/40 font-bold block mb-4">BERIKUTNYA</span>
                            <Link
                                href={`/project/${nextProject.slug}`}
                                data-cursor="magnetic"
                                className="group flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 text-left hover:text-accent transition-colors duration-300"
                            >
                                <h3 className="text-2xl md:text-5xl font-display font-bold uppercase tracking-tight max-w-3xl leading-none">
                                    {nextProject.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-charcoal/10 dark:border-ivory/10 group-hover:border-accent px-6 py-4 rounded-full transition-colors duration-300">
                                    Lihat Proyek
                                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 stroke-current transform group-hover:translate-x-1 transition-transform duration-300" strokeWidth="1.5">
                                        <path d="M1 5H9M9 5L5 9M9 5L5 1" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </PortfolioLayout>
    );
}
