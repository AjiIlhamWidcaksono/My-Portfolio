import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function HangingHero3D({ items = [], onSelectPlate }) {
    const containerRef = useRef(null);
    const [posCur, setPosCur] = useState(0);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [clock, setClock] = useState(0);

    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartPos = useRef(0);
    const animFrameRef = useRef(null);
    const curRef = useRef(0);
    const targetRef = useRef(0);
    const snapTimeoutRef = useRef(null);

    // Update container dimensions on resize
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

    // Smooth physics loop (lerp movement & continuous clock for breathing animations)
    useEffect(() => {
        let lastTime = performance.now();
        let runningClock = 0;

        const loop = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            runningClock += dt;
            setClock(runningClock);

            // Smooth position lerp
            const diff = targetRef.current - curRef.current;
            curRef.current += diff * Math.min(1, dt * 7.5);

            setPosCur(curRef.current);

            animFrameRef.current = requestAnimationFrame(loop);
        };
        animFrameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, []);

    // Helper: Snap to closest plate when scrolling/dragging stops
    const triggerSnap = useCallback(() => {
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
            // Snap target to nearest integer
            targetRef.current = Math.round(targetRef.current);
        }, 180);
    }, []);

    // Infinite wheel navigation without boundaries
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY || e.deltaX;
        const speed = 0.0028;
        // Infinite scroll: targetRef can increase/decrease indefinitely
        targetRef.current += delta * speed;
        triggerSnap();
    }, [triggerSnap]);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.addEventListener('wheel', handleWheel, { passive: false });
            return () => el.removeEventListener('wheel', handleWheel);
        }
    }, [handleWheel]);

    // Pointer Drag Handling (Infinite)
    const handlePointerDown = (e) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartPos.current = targetRef.current;
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };

    const handlePointerMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            setMouseOffset({ x: mx, y: my });
        }

        if (!isDragging.current) return;
        const dx = e.clientX - dragStartX.current;
        const sensitivity = 0.0035;
        targetRef.current = dragStartPos.current - dx * sensitivity;
    };

    const handlePointerUp = () => {
        if (isDragging.current) {
            isDragging.current = false;
            triggerSnap();
        }
    };

    // Keyboard navigation (Arrow keys)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                targetRef.current = Math.round(targetRef.current) + 1;
                triggerSnap();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                targetRef.current = Math.round(targetRef.current) - 1;
                triggerSnap();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [triggerSnap]);

    // Geometry & Camera perspective parameters
    const { width: W, height: H } = dimensions;
    const isMobile = W < 768;

    const fov = isMobile ? 76 : 84;
    const perspectivePx = (H / 2) / Math.tan((fov * Math.PI) / 360);

    const baseCamX = isMobile ? 0.5 : 0.65;
    const baseCamY = isMobile ? 0.38 : 0.30;

    const camXPercent = (baseCamX + mouseOffset.x * 0.035) * 100;
    const camYPercent = (baseCamY + mouseOffset.y * 0.035) * 100;

    // 3D trajectory line parameters
    const anchorX = isMobile ? W * 0.38 : W * 0.38;
    const anchorY = isMobile ? H * 0.40 : H * 0.38;
    const stepX = isMobile ? 220 : 300;
    const stepY = isMobile ? -65 : -80;
    const stepZ = isMobile ? -360 : -420;
    const yaw = isMobile ? -16 : -22;
    const roll = 2.5;

    // Infinite Euclidean wrap modulo
    const L = items.length;
    const wrap = (val, max) => ((val % max) + max) % max;

    // Active plate index for header display
    const activeDisplayIdx = wrap(Math.round(posCur), L);
    const activeItem = items[activeDisplayIdx] || items[0];

    // Calculate unbroken, straight 3D steel wire from offscreen front-left to offscreen back-right
    const rStart = -5.5;
    const rEnd = L + 4.5;
    const wireX1 = anchorX + rStart * stepX;
    const wireY1 = anchorY + rStart * stepY;
    const wireZ1 = rStart * stepZ;

    const wireX2 = anchorX + rEnd * stepX;
    const wireY2 = anchorY + rEnd * stepY;
    const wireZ2 = rEnd * stepZ;

    const wdx = wireX2 - wireX1;
    const wdy = wireY2 - wireY1;
    const wdz = wireZ2 - wireZ1;

    const wireLen = Math.sqrt(wdx * wdx + wdy * wdy + wdz * wdz);
    const wireYaw = Math.atan2(-wdz, wdx) * (180 / Math.PI);
    const wirePitch = Math.atan2(wdy, Math.hypot(wdx, wdz)) * (180 / Math.PI);

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
                    <span className="hidden sm:inline text-farline-muted">• Infinite Loop • Scroll to Explore</span>
                </div>
                <div className="flex items-center gap-3">
                    <span>Plate {activeItem?.plate || '01'} / {L}</span>
                    <span className="text-farline-dark font-medium hidden sm:inline">• {activeItem?.title}</span>
                </div>
            </div>

            {/* 3D World Stage */}
            <div 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 1. Mathematically Straight, Continuous 3D Steel Wire (Never Cuts Off or Bends) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${wireLen}px`,
                        height: '2px',
                        backgroundColor: '#3A3833',
                        boxShadow: '0 1px 3px rgba(20, 19, 14, 0.25)',
                        transformOrigin: '0 0',
                        transform: `translate3d(${wireX1}px, ${wireY1}px, ${wireZ1}px) rotateY(${wireYaw}deg) rotateZ(${wirePitch}deg)`,
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                />

                {/* 2. Suspended Art Plates (Infinite Modular Circulation) */}
                {items.map((item, index) => {
                    // Infinite relative position calculation centered around viewing window
                    const offset = 1.8;
                    const r = wrap(index - posCur + offset, L) - offset;

                    // 3D coordinates on straight line
                    const x = anchorX + r * stepX;
                    const y = anchorY + r * stepY;
                    const z = r * stepZ;

                    // Culling: hide plates that are completely offscreen
                    if (z > 300 || z < -4200) return null;

                    // Active Front Card calculations (closest to r = 0)
                    const distFromCenter = Math.abs(r);
                    const isActive = distFromCenter < 0.55;
                    const activeFactor = Math.max(0, 1 - distFromCenter * 1.8);

                    // Organic breathing & floating animation on the active / closest plate
                    const floatY = isActive ? Math.sin(clock * 2.4) * 6 : 0;
                    const floatZ = isActive ? Math.cos(clock * 2.4) * 10 : 0;
                    const elevateY = activeFactor * -32 + floatY;
                    const elevateZ = activeFactor * 75 + floatZ;
                    const scaleFactor = 1 + activeFactor * 0.16;

                    // Smooth fade out as card approaches front-left screen edge (prevents harsh cut)
                    const opacity = r < 0 
                        ? Math.max(0, Math.min(1, (r + 1.6) / 1.1))
                        : Math.min(1, Math.max(0, (4000 + z) / 1400));

                    if (opacity <= 0.01) return null;

                    // Organic subtle pendulum breeze sway
                    const sway = Math.sin(clock * 1.6 + index * 0.8) * (isActive ? 2.8 : 1.4);
                    const isHovered = hoveredIdx === index;

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
                                transform: `translate3d(${x}px, ${y + elevateY + (isHovered ? -15 : 0)}px, ${z + elevateZ}px) rotateY(${yaw}deg) rotateZ(${roll + sway}deg) scale(${scaleFactor})`,
                                transformOrigin: 'top center',
                                opacity,
                                transition: isDragging.current 
                                    ? 'opacity 0.2s linear' 
                                    : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.25s linear',
                                willChange: 'transform, opacity',
                            }}
                        >
                            {/* Wooden Peg (Jepitan Kayu Asli yang menempel tepat di tali kawat) */}
                            <div className="relative -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
                                <img 
                                    src="images/peg_front.png" 
                                    alt="Peg" 
                                    className="w-6 h-9 object-contain drop-shadow-sm"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>

                            {/* White Museum Mount Print Sheet */}
                            <div className={`relative -translate-x-1/2 bg-white p-3.5 sm:p-4 rounded-[3px] border ${
                                isActive 
                                    ? 'border-farline-dark/30 shadow-[0_30px_70px_-15px_rgba(20,19,14,0.32)] ring-1 ring-farline-dark/10' 
                                    : 'border-farline-border shadow-[0_15px_40px_-10px_rgba(20,19,14,0.18)]'
                            } transition-all duration-500 w-[240px] sm:w-[290px] md:w-[330px]`}>
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
                                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-[2px] text-[9px] font-mono uppercase text-white/95 tracking-widest flex items-center gap-1.5">
                                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
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
                    <span className="text-farline-dark font-semibold">Drag / Scroll to Glide Line</span>
                    <span className="text-farline-borderStrong">← →</span>
                </div>
                <div>
                    <span className="text-farline-dark font-semibold">Click Plate for Specs ↗</span>
                </div>
            </div>
        </section>
    );
}
