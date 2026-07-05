import React from 'react';

export default function CustomCursor({ cursorRef, cursorType }) {
    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full mix-blend-difference transition-all duration-300 ease-out"
            style={{
                width: cursorType === 'view' ? '90px' : cursorType === 'magnetic' ? '50px' : cursorType === 'grow' ? '30px' : '12px',
                height: cursorType === 'view' ? '90px' : cursorType === 'magnetic' ? '50px' : cursorType === 'grow' ? '30px' : '12px',
                backgroundColor: cursorType === 'view' ? '#F9F6F0' : cursorType === 'magnetic' ? 'transparent' : '#FF5722',
                border: cursorType === 'magnetic' ? '2px solid #FF5722' : 'none',
            }}
        >
            {cursorType === 'view' && (
                <span className="text-[11px] uppercase font-display font-bold tracking-widest text-[#0A0A0A]">
                    View
                </span>
            )}
            {cursorType === 'magnetic' && (
                <div className="w-2 h-2 bg-[#FF5722] rounded-full" />
            )}
        </div>
    );
}
