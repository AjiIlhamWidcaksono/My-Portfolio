import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkIndex({ items = [], onSelectPlate }) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <section 
            id="work-section"
            onMouseMove={handleMouseMove}
            className="relative w-full py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-farline-border"
        >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-farline-muted">
                        Index / Archive
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-farline-dark mt-2">
                        Complete Work Index
                    </h2>
                </div>

                <div className="text-xs font-mono uppercase tracking-widest text-farline-muted">
                    Total: {items.length} Works cataloged
                </div>
            </div>

            {/* Editorial Minimalist Table */}
            <div className="w-full border-t border-farline-dark">
                {items.map((item, idx) => (
                    <div
                        key={item.id}
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => onSelectPlate?.(item)}
                        className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-farline-border hover:border-farline-dark cursor-pointer transition-colors duration-300"
                    >
                        {/* Plate & Title */}
                        <div className="flex items-baseline gap-6 md:gap-10">
                            <span className="text-xs font-mono text-farline-muted group-hover:text-farline-dark transition-colors">
                                {item.plate}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-farline-dark group-hover:translate-x-2 transition-transform duration-300">
                                {item.title}
                            </h3>
                        </div>

                        {/* Metadata Columns */}
                        <div className="flex items-center gap-8 md:gap-16 mt-4 md:mt-0 text-xs font-mono text-farline-muted">
                            <span className="hidden lg:inline-block w-32 truncate">{item.series}</span>
                            <span className="w-24 text-right md:text-left">{item.place}</span>
                            <span className="w-16 text-right">{item.year}</span>
                            <span className="w-28 text-right font-semibold text-farline-dark">
                                {item.category}
                            </span>
                            <span className="text-farline-borderStrong group-hover:text-farline-dark group-hover:translate-x-1 transition-all">
                                ↗
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Live Floating Cursor Follower Preview */}
            <AnimatePresence>
                {hoveredItem && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            x: cursorPos.x + 24, 
                            y: cursorPos.y - 120 
                        }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 250, damping: 25 }}
                        className="fixed top-0 left-0 pointer-events-none z-50 w-64 p-2 bg-white rounded-[3px] border border-farline-border shadow-farline-lift"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5 rounded-[2px]">
                            {hoveredItem.hasVideo ? (
                                <video 
                                    src={hoveredItem.video}
                                    poster={hoveredItem.image}
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img 
                                    src={hoveredItem.image} 
                                    alt={hoveredItem.title} 
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="mt-2 text-[10px] font-mono uppercase text-farline-muted flex justify-between">
                            <span>Plate {hoveredItem.plate}</span>
                            <span className="text-farline-dark font-medium">{hoveredItem.camera.split('•')[0]}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
