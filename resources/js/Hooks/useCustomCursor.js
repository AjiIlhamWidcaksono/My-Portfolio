import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function useCustomCursor() {
    const [cursorType, setCursorType] = useState('default'); // 'default', 'view', 'magnetic'
    const cursorRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Matikan kursor kustom pada perangkat sentuh (touch devices)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        // Tambahkan class global ke HTML untuk menyembunyikan kursor default
        document.documentElement.classList.add('custom-cursor-active');

        // Melacak gerakan mouse global
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            
            // Pindahkan kursor kustom secara langsung melalui GSAP untuk performa rendering optimal (60+ fps)
            if (cursorRef.current && cursorType !== 'magnetic') {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        // Handler untuk efek hover spesifik (data-cursor)
        const handleMouseOver = (e) => {
            const target = e.target.closest('[data-cursor]');
            if (target) {
                const type = target.getAttribute('data-cursor');
                setCursorType(type);

                // Efek Magnetik pada Tombol
                if (type === 'magnetic' && cursorRef.current) {
                    const rect = target.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    // Tarik kursor kustom mendekati titik tengah tombol
                    gsap.to(cursorRef.current, {
                        x: centerX,
                        y: centerY,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    // Efek tarikan magnetis pada tombol fisik
                    const onTargetMove = (event) => {
                        const relX = event.clientX - centerX;
                        const relY = event.clientY - centerY;
                        
                        // Tarik tombol fisik ke arah pointer (maksimal 30% dari jarak rel)
                        gsap.to(target, {
                            x: relX * 0.35,
                            y: relY * 0.35,
                            duration: 0.3,
                            ease: 'power2.out'
                        });

                        // Tarik kursor kustom sedikit ke arah pointer agar tetap presisi
                        gsap.to(cursorRef.current, {
                            x: centerX + relX * 0.15,
                            y: centerY + relY * 0.15,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    };

                    const onTargetLeave = () => {
                        // Kembalikan tombol fisik ke posisi asal dengan efek pegas (elastic)
                        gsap.to(target, { 
                            x: 0, 
                            y: 0, 
                            duration: 0.6, 
                            ease: 'elastic.out(1, 0.4)' 
                        });
                        setCursorType('default');
                        
                        target.removeEventListener('mousemove', onTargetMove);
                        target.removeEventListener('mouseleave', onTargetLeave);
                    };

                    target.addEventListener('mousemove', onTargetMove);
                    target.addEventListener('mouseleave', onTargetLeave);
                }
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest('[data-cursor]');
            if (target && target.getAttribute('data-cursor') !== 'magnetic') {
                setCursorType('default');
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.documentElement.classList.remove('custom-cursor-active');
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, [cursorType]);

    return { cursorRef, cursorType, setCursorType };
}
