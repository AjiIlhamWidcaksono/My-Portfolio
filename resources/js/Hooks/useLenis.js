import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function useLenis(active = true) {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        if (!active) return;

        // Hormati Reduced Motion preference dari sistem operasi
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        const lenisInstance = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing eksponensial lambat
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            infinite: false,
        });

        setLenis(lenisInstance);

        let rafId;
        function raf(time) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance.destroy();
        };
    }, [active]);

    return lenis;
}
