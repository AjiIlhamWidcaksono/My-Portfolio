import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HangingHero3D({ items = [], onSelectPlate }) {
    const containerRef = useRef(null);
    const [posTarget, setPosTarget] = useState(0);
    const [posCur, setPosCur] = useState(0);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartPos = useRef(0);
    const animFrameRef = useRef(null);
    const curRef = useRef(0);
    const targetRef = useRef(0);

    // Update container dimensions
    useEffect(() => {
        const updateDims = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };
        updateDims();
        window.addEventListener('resize', updateDims);
        return () => window.removeEventListener('resize', updateDims);
    }, []);

    // Smooth animation loop for physics position lerp & clock sway
    useEffect(() => {
        let lastTime = performance.now();
        const loop = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            // Lerp current position to target position
            const diff = targetRef.current - curRef.current;
            curRef.current += diff * Math.min(1, dt * 7);

            if (Math.abs(diff) > 0.0005) {
                setPosCur(curRef.current);
            }

            animFrameRef.current = requestAnimationFrame(loop);
        };
        animFrameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, []);

    // Mouse wheel navigation
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY || e.deltaX;
        const speed = 0.0028;
        const maxPos = items.length - 1;
        targetRef.current = Math.max(-0.4, Math.min(maxPos + 0.4, targetRef.current + delta * speed));
        setPosTarget(targetRef.current);
    }, [items.length]);

    // Attach non-passive wheel event
    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.addEventListener('wheel', handleWheel, { passive: false });
            return () => el.removeEventListener('wheel', handleWheel);
        }
    }, [handleWheel]);

    // Pointer Drag Handling
    const handlePointerDown = (e) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartPos.current = targetRef.current;
    };

    const handlePointerMove = (e) => {
        // Calculate mouse parallax offset from screen center (-1 to 1)
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            setMouseOffset({ x: mx, y: my });
        }

        if (!isDragging.current) return;
        const dx = e.clientX - dragStartX.current;
        const sensitivity = 0.0035;
        const maxPos = items.length - 1;
        targetRef.current = Math.max(-0.4, Math.min(maxPos + 0.4, dragStartPos.current - dx * sensitivity));
        setPosTarget(targetRef.current);
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    // Keyboard navigation (Arrow keys)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                targetRef.current = Math.min(items.length - 1, targetRef.current + 1);
                setPosTarget(targetRef.current);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                targetRef.current = Math.max(0, targetRef.current - 1);
                setPosTarget(targetRef.current);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items.length]);

    // Farline 3D Camera & Perspective Parameters
    const { width: W, height: H } = dimensions;
    const isMobile = W < 768;
    
    // Perspective and Camera Angle
    const fov = isMobile ? 75 : 82;
    const perspectivePx = (H / 2) / Math.tan((fov * Math.PI) / 360);
    
    const baseCamX = isMobile ? 0.5 : 0.68;
    const baseCamY = isMobile ? 0.35 : 0.28;
    
    // Parallax tilt from cursor
    const camXPercent = (baseCamX + mouseOffset.x * 0.04) * 100;
    const camYPercent = (baseCamY + mouseOffset.y * 0.04) * 100;

    // 3D parameters per item
    const stepX = isMobile ? 180 : 310;
    const stepY = isMobile ? -50 : -90;
    const stepZ = isMobile ? -360 : -420;
    const yaw = isMobile ? -14 : -22; // Degrees rotation into screen
    const roll = 2.5;

    // Calculate 3D points for each plate to draw connecting wire
    const plateCoords = items.map((_, i) => {
        const r = i - posCur;
        const x = (isMobile ? W * 0.35 : W * 0.42) + r * stepX;
        const y = (isMobile ? H * 0.36 : H * 0.34) + r * stepY;
        const z = r * stepZ;
        return { x, y, z, r };
    });

    return (
        <section 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#fbfbf9] cursor-grab active:cursor-grabbing flex flex-col justify-between"
            style={{
                perspective: `${perspectivePx}px`,
                perspectiveOrigin: `${camXPercent}% ${camYPercent}%`,
            }}
        >
            {/* Top Minimal Info Bar */}
            <div className="relative z-30 pt-20 px-6 sm:px-12 flex justify-between items-center text-[11px] font-mono uppercase tracking-[0.22em] text-farline-muted pointer-events-none">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-farline-dark animate-pulse" />
                    <span className="font-semibold text-farline-dark">3D Washing Line</span>
                    <span className="hidden sm:inline text-farline-muted">• Drag or Wheel to Explore</span>
                </div>
                <div className="flex items-center gap-3">
                    <span>Plate {Math.min(items.length, Math.max(1, Math.round(posCur) + 1))} / {items.length}</span>
                </div>
            </div>

            {/* 3D World Stage */}
            <div 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 3D Perspective Steel Wire connecting all hanging pegs */}
                <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {plateCoords.map((pt, idx) => {
                        if (idx === 0) return null;
                        const prev = plateCoords[idx - 1];
                        // If both points are within reasonable viewing range
                        if (pt.z < 250 && pt.z > -3500 && prev.z < 250 && prev.z > -3500) {
                            return (
                                <line 
                                    key={`wire-${idx}`}
                                    x1={prev.x}
                                    y1={prev.y}
                                    x2={pt.x}
                                    y2={pt.y}
                                    stroke="#3A3833"
                                    strokeWidth="1.75"
                                    strokeOpacity="0.45"
                                    style={{
                                        transform: `translateZ(${(prev.z + pt.z) / 2}px)`,
                                    }}
                                />
                            );
                        }
                        return null;
                    })}
                </svg>

                {/* 3D Suspended Art Plates */}
                {items.map((item, index) => {
                    const r = index - posCur;
                    const x = (isMobile ? W * 0.35 : W * 0.42) + r * stepX;
                    const y = (isMobile ? H * 0.36 : H * 0.34) + r * stepY;
                    const z = r * stepZ;

                    // Visibility culling: hide plates too far behind camera or too deep
                    if (z > 220 || z < -3600) return null;

                    const isHovered = hoveredIdx === index;
                    // Distance fade (closer plates are 1, far plates fade into the haze)
                    const opacity = z > 100 
                        ? Math.max(0, (220 - z) / 120) 
                        : Math.min(1, Math.max(0, (3600 + z) / 1200));

                    // Natural organic pendulum sway on wind
                    const swayAngle = Math.sin((index * 1.5) + (posCur * 1.2)) * 1.8;

                    return (
                        <div
                            key={item.id}
                            onMouseEnter={() => setHoveredIdx(index)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectPlate?.(item);
                            }}
                            className="absolute top-0 left-0 pointer-events-auto cursor-pointer group"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${yaw}deg) rotateZ(${roll + swayAngle}deg) ${isHovered ? 'translateY(-22px) scale(1.04)' : ''}`,
                                transformOrigin: 'top center',
                                opacity,
                                transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.2s linear',
                                willChange: 'transform, opacity',
                            }}
                        >
                            {/* Wooden Peg (Jepitan Kayu di Tali Kawat) */}
                            <div className="relative -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
                                <img 
                                    src="images/peg_front.png" 
                                    alt="Peg" 
                                    className="w-6 h-9 object-contain drop-shadow-sm"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>

                            {/* White Museum Mount Print Sheet */}
                            <div className="relative -translate-x-1/2 bg-white p-3.5 sm:p-4 rounded-[3px] border border-farline-border shadow-[0_15px_40px_-10px_rgba(20,19,14,0.18)] group-hover:shadow-[0_30px_60px_-15px_rgba(20,19,14,0.3)] transition-shadow duration-500 w-[240px] sm:w-[290px] md:w-[330px]">
                                {/* Artwork Canvas */}
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

                                    {/* Top Plate Tag */}
                                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-[2px] text-[9px] font-mono uppercase text-white/95 tracking-widest">
                                        Plate {item.plate}
                                    </div>

                                    {item.hasVideo && (
                                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-[2px] text-[9px] font-mono uppercase text-white/95 tracking-widest flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            Motion
                                        </div>
                                    )}
                                </div>

                                {/* Typography & Specs */}
                                <div className="mt-3.5 pt-2.5 border-t border-farline-border flex flex-col gap-1">
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

                            {/* Floor Ambient Drop Shadow in 3D */}
                            <div 
                                className="relative -translate-x-1/2 w-48 h-4 bg-black/10 blur-lg rounded-full mt-6 mx-auto opacity-60 group-hover:opacity-90 transition-opacity"
                                style={{ transform: 'rotateX(80deg)' }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Bottom Controls & Interaction Guidance */}
            <div className="relative z-30 pb-24 px-6 sm:px-12 flex justify-between items-end text-[11px] font-mono uppercase tracking-[0.2em] text-farline-muted pointer-events-none">
                <div className="flex items-center gap-4">
                    <span className="text-farline-dark font-semibold">Drag / Scroll to Move Line</span>
                    <span className="text-farline-borderStrong">← →</span>
                </div>
                <div>
                    <span className="text-farline-dark font-semibold">Click Card for Specs ↗</span>
                </div>
            </div>
        </section>
    );
}
