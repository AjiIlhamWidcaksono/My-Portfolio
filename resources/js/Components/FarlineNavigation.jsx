import React from 'react';

export default function FarlineNavigation({ activeTab, onSelectTab }) {
    const navItems = [
        { id: 'main', label: 'Main' },
        { id: 'work', label: 'Work' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Top Minimalist Header */}
            <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 sm:py-6 flex justify-between items-center bg-[#fbfbf9]/80 backdrop-blur-md border-b border-farline-border/60 pointer-events-auto">
                <button 
                    onClick={() => onSelectTab('main')}
                    className="text-xl sm:text-2xl font-display uppercase tracking-wider text-farline-dark hover:opacity-70 transition-opacity"
                >
                    FARLINE
                </button>

                <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-widest text-farline-muted">
                    <span className="hidden sm:inline">Aji Ilham • Visual & Motion</span>
                    <button 
                        onClick={() => onSelectTab('contact')}
                        className="px-3.5 py-1.5 rounded-full border border-farline-border hover:border-farline-dark hover:text-farline-dark transition-colors"
                    >
                        Available for Work
                    </button>
                </div>
            </header>

            {/* Bottom Floating Glass Navigation Bar (Farline Signature) */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
                <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 bg-white/80 dark:bg-[#14130e]/80 backdrop-blur-xl border border-farline-border/80 rounded-full shadow-farline-nav">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelectTab(item.id)}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                                    isActive
                                        ? 'bg-farline-dark text-white font-medium shadow-sm'
                                        : 'text-farline-muted hover:text-farline-dark hover:bg-black/5'
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
