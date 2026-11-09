import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LightTableGallery({ items = [], onSelectPlate }) {
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Motion Graphics', 'Graphic Design'];

    const filtered = activeFilter === 'All'
        ? items
        : items.filter(it => it.category === activeFilter);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full pt-28 pb-36 px-6 sm:px-12 max-w-7xl mx-auto"
        >
            {/* Header & Filter Chips */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-farline-muted">
                        Light Table / Studio Board
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-farline-dark mt-2">
                        Gallery Collection
                    </h2>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full border transition-all duration-300 ${
                                activeFilter === cat 
                                    ? 'bg-farline-dark text-white border-farline-dark' 
                                    : 'bg-white text-farline-muted border-farline-border hover:border-farline-dark hover:text-farline-dark'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12"
            >
                <AnimatePresence>
                    {filtered.map((item, idx) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35, delay: idx * 0.03 }}
                            onClick={() => onSelectPlate?.(item)}
                            className="group cursor-pointer bg-white p-4 sm:p-5 rounded-[3px] border border-farline-border shadow-farline-card hover:shadow-farline-lift transition-all duration-500 hover:-translate-y-1.5"
                        >
                            {/* Plate View Container */}
                            <div className={`relative w-full ${item.aspect} bg-[#14130e]/5 overflow-hidden rounded-[2px]`}>
                                {item.hasVideo ? (
                                    <video 
                                        src={item.video}
                                        poster={item.image}
                                        autoPlay 
                                        loop 
                                        muted 
                                        playsInline 
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                ) : (
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                )}

                                {/* Hover Overlay Spec Badge */}
                                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                                    <span className="text-[10px] font-mono uppercase tracking-widest">
                                        Plate {item.plate}
                                    </span>
                                    <div>
                                        <div className="text-[10px] font-mono text-white/70">
                                            {item.camera}
                                        </div>
                                        <div className="text-[10px] font-mono text-white/95 font-medium">
                                            {item.edition}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Caption Footer */}
                            <div className="mt-4 pt-3 border-t border-farline-border flex justify-between items-baseline">
                                <div>
                                    <h4 className="text-base font-semibold text-farline-dark tracking-tight">
                                        {item.title}
                                    </h4>
                                    <span className="text-xs font-mono text-farline-muted">
                                        {item.series} • {item.place}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-farline-muted">
                                    {item.year}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
