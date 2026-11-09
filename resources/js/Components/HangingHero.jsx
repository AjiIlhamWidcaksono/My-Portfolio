import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function HangingHero({ items = [], onSelectPlate }) {
    const containerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState(null);

    // Mouse parallax for subtle hanging depth
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const ropeSag = useTransform(smoothMouseY, [-300, 300], [-8, 8]);

    const handleMouseMove = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
        }
    };

    return (
        <section 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-24 pb-16 overflow-hidden select-none"
        >
            {/* Top Minimal Gallery Badge */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-[11px] font-mono uppercase tracking-[0.2em] text-farline-muted">
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-farline-dark animate-pulse" />
                    <span>3D Hanging Line • Plate Exhibition</span>
                </div>
                <div>
                    <span>{items.length} Suspended Plates</span>
                </div>
            </div>

            {/* Continuous 3D Wire Rope Line */}
            <div className="relative w-full my-auto py-12 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
                {/* Visual Steel Line Rope */}
                <motion.div 
                    style={{ y: ropeSag }}
                    className="clothesline-rope"
                />

                {/* Draggable Hanging Items Container */}
                <motion.div 
                    drag="x"
                    dragConstraints={{ left: -((items.length * 360) - window.innerWidth + 180), right: 60 }}
                    dragElastic={0.12}
                    className="flex items-start gap-12 sm:gap-16 md:gap-20 px-8 sm:px-16 md:px-24 w-max pt-16 pb-12"
                >
                    {items.map((item, index) => (
                        <HangingCard 
                            key={item.id}
                            item={item}
                            index={index}
                            isHovered={hoveredIdx === index}
                            onHover={() => setHoveredIdx(index)}
                            onLeave={() => setHoveredIdx(null)}
                            onSelect={() => onSelectPlate?.(item)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Bottom Interaction Guide */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-end text-[11px] font-mono uppercase tracking-[0.2em] text-farline-muted">
                <div className="flex items-center gap-4">
                    <span className="text-farline-dark font-semibold">Drag / Scroll horizontally</span>
                    <span className="text-farline-borderStrong">——→</span>
                </div>
                <div>
                    <span>Click Plate to View Details</span>
                </div>
            </div>
        </section>
    );
}

// Individual Hanging Card with Realistic Physics Swing & Clip
function HangingCard({ item, index, isHovered, onHover, onLeave, onSelect }) {
    // Subtle alternate initial rotation angle for organic hanging look (-2deg to +2deg)
    const baseAngle = (index % 2 === 0 ? 1 : -1) * (1.2 + (index % 3) * 0.4);

    return (
        <motion.div
            initial={{ opacity: 0, y: -40, rotate: baseAngle * 2 }}
            animate={{ 
                opacity: 1, 
                y: isHovered ? -12 : 0, 
                rotate: isHovered ? 0 : baseAngle,
                scale: isHovered ? 1.03 : 1
            }}
            transition={{ 
                type: "spring", 
                stiffness: 180, 
                damping: 20,
                delay: index * 0.05
            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={onSelect}
            className="group relative flex flex-col items-center cursor-pointer shrink-0"
            style={{ transformOrigin: "top center" }}
        >
            {/* Wooden Clothes Peg Clip (Top) */}
            <div className="relative -top-3 z-20 flex flex-col items-center">
                <img 
                    src="images/peg_front.png" 
                    alt="Clip" 
                    className="w-7 h-10 object-contain drop-shadow-sm select-none pointer-events-none"
                    onError={(e) => {
                        // Fallback elegant SVG clip if image fails
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            {/* White Fine Art Plate / Frame (Museum Mount Style) */}
            <div className="relative bg-white p-3 sm:p-4 rounded-[3px] border border-farline-border shadow-farline-card group-hover:shadow-farline-lift transition-shadow duration-500 w-[240px] sm:w-[280px] md:w-[320px]">
                {/* Media Image / Video Preview */}
                <div className={`relative w-full ${item.aspect || 'aspect-[3/4]'} bg-[#14130e]/5 overflow-hidden rounded-[2px]`}>
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

                    {/* Subtle Plate Number Tag inside Image */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-[2px] text-[9px] font-mono uppercase text-white/90 tracking-widest">
                        Plate {item.plate}
                    </div>

                    {item.hasVideo && (
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-[2px] text-[9px] font-mono uppercase text-white/90 tracking-widest flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            Motion
                        </div>
                    )}
                </div>

                {/* Fine Editorial Caption under the Plate */}
                <div className="mt-3.5 pt-2 border-t border-farline-border flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                        <h4 className="text-sm font-semibold tracking-tight text-farline-dark truncate max-w-[190px]">
                            {item.title}
                        </h4>
                        <span className="text-[11px] font-mono text-farline-muted">
                            {item.year}
                        </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-farline-muted">
                        <span>{item.place}</span>
                        <span className="text-farline-dark font-medium">{item.category}</span>
                    </div>
                </div>
            </div>

            {/* Subtle Drop Shadow on the Floor below Hanging Item */}
            <div className="w-3/4 h-3 bg-black/5 blur-md rounded-full mt-4 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
        </motion.div>
    );
}
