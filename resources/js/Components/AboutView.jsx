import React from 'react';
import { motion } from 'framer-motion';

export default function AboutView({ onGoToContact }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full pt-28 pb-36 px-6 sm:px-12 max-w-7xl mx-auto"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                {/* Wall Portrait Frame (Left) */}
                <div className="lg:col-span-5 relative group flex flex-col items-center">
                    {/* Peg on Wall */}
                    <div className="relative -top-2.5 z-20">
                        <img 
                            src="images/peg_front.png" 
                            alt="Peg" 
                            className="w-6 h-9 object-contain drop-shadow-sm select-none pointer-events-none"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                    {/* Frame Mount */}
                    <div className="bg-white p-4 sm:p-5 rounded-[3px] border border-farline-border shadow-farline-lift w-full max-w-sm">
                        <div className="aspect-[3/4] w-full overflow-hidden bg-black/5 rounded-[2px]">
                            <img 
                                src="images/pp.png" 
                                alt="Aji Ilham Profile Portrait" 
                                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="mt-3.5 text-center">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-farline-muted">
                                Plate 00 • Aji Ilham (Designer & Editor)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Editorial Biography (Right) */}
                <div className="lg:col-span-7 flex flex-col justify-center pt-4">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-farline-muted mb-4">
                        About • Profile
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-farline-dark leading-tight mb-8">
                        Creating visual momentum, dynamic rhythm, and minimal editorial clarity.
                    </h3>
                    
                    <p className="text-sm md:text-base leading-relaxed text-farline-muted font-normal mb-8">
                        Sebagai seorang Graphic Designer dan Video Editor / Motion Artist, saya memadukan presisi komposisi cetak klasik dengan kedinamisan motion grafis modern. Setiap karya dirancang memiliki jiwa visual yang kuat, timing yang presisi, dan estetika yang bersih.
                    </p>

                    {/* Metadata Lists (Clients, Recognition, Tools) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-farline-border">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-farline-dark block mb-3 font-semibold">
                                Disciplines & Focus
                            </span>
                            <ul className="text-xs font-mono space-y-2.5 text-farline-muted">
                                <li>• High-Tempo Video Editing</li>
                                <li>• Motion Graphics & Kinetic Typography</li>
                                <li>• Editorial & Poster Graphic Design</li>
                                <li>• Surrealist Photo Manipulation</li>
                            </ul>
                        </div>
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-farline-dark block mb-3 font-semibold">
                                Primary Toolkit
                            </span>
                            <ul className="text-xs font-mono space-y-2.5 text-farline-muted">
                                <li>• Adobe Premiere Pro</li>
                                <li>• Adobe After Effects</li>
                                <li>• Adobe Photoshop</li>
                                <li>• Figma & Cinema 4D</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-farline-border flex items-center justify-between">
                        <span className="text-xs font-mono text-farline-muted uppercase tracking-wider">
                            Based in Indonesia • Working Worldwide
                        </span>
                        <button
                            onClick={onGoToContact}
                            className="px-5 py-2.5 bg-farline-dark text-white rounded-[2px] font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors"
                        >
                            Get in Touch ↗
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
