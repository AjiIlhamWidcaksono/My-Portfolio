import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FarlineNavigation from '@/Components/FarlineNavigation';
import HangingHero3D from '@/Components/HangingHero3D';
import WorkIndex from '@/Components/WorkIndex';
import LightTableGallery from '@/Components/LightTableGallery';
import AboutView from '@/Components/AboutView';
import ContactView from '@/Components/ContactView';
import PlateModal from '@/Components/PlateModal';
import { portfolioItems } from '@/data/portfolio';

export default function FarlinePortfolio() {
    const [activeTab, setActiveTab] = useState('main'); // 'main' | 'work' | 'gallery' | 'about' | 'contact'
    const [selectedPlate, setSelectedPlate] = useState(null);

    // Modal navigation
    const handleNextPlate = () => {
        if (!selectedPlate) return;
        const currentIdx = portfolioItems.findIndex(p => p.id === selectedPlate.id);
        const nextIdx = (currentIdx + 1) % portfolioItems.length;
        setSelectedPlate(portfolioItems[nextIdx]);
    };

    const handlePrevPlate = () => {
        if (!selectedPlate) return;
        const currentIdx = portfolioItems.findIndex(p => p.id === selectedPlate.id);
        const prevIdx = (currentIdx - 1 + portfolioItems.length) % portfolioItems.length;
        setSelectedPlate(portfolioItems[prevIdx]);
    };

    return (
        <div className={`relative w-full ${activeTab === 'main' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'} paper-texture text-farline-dark font-sans selection:bg-farline-dark selection:text-white`}>
            {/* Farline Fixed Header & Bottom Floating Capsule Navigation */}
            <FarlineNavigation 
                activeTab={activeTab} 
                onSelectTab={(tab) => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
            />

            {/* Dynamic View Display (App-like architecture, no giant vertical stacking) */}
            <main className="w-full">
                <AnimatePresence mode="wait">
                    {activeTab === 'main' && (
                        <div key="main" className="w-full h-full">
                            <HangingHero3D 
                                items={portfolioItems} 
                                onSelectPlate={(item) => setSelectedPlate(item)} 
                            />
                        </div>
                    )}

                    {activeTab === 'work' && (
                        <div key="work" className="w-full">
                            <WorkIndex 
                                items={portfolioItems} 
                                onSelectPlate={(item) => setSelectedPlate(item)} 
                            />
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div key="gallery" className="w-full">
                            <LightTableGallery 
                                items={portfolioItems} 
                                onSelectPlate={(item) => setSelectedPlate(item)} 
                            />
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div key="about" className="w-full">
                            <AboutView 
                                onGoToContact={() => {
                                    setActiveTab('contact');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} 
                            />
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div key="contact" className="w-full">
                            <ContactView />
                        </div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer only on non-main screens */}
            {activeTab !== 'main' && (
                <footer className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-28 pt-8 border-t border-farline-border flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-farline-muted gap-4">
                    <div>
                        <span>FARLINE PORTFOLIO ARCHITECTURE © 2026 • AJI ILHAM</span>
                    </div>
                    <div className="flex gap-6">
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                            className="hover:text-farline-dark transition-colors"
                        >
                            Back to Top ↑
                        </button>
                    </div>
                </footer>
            )}

            {/* Plate Detail Lightbox Modal */}
            <PlateModal 
                plate={selectedPlate} 
                onClose={() => setSelectedPlate(null)}
                onNext={handleNextPlate}
                onPrev={handlePrevPlate}
                onEnquire={() => {
                    setSelectedPlate(null);
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            />
        </div>
    );
}
