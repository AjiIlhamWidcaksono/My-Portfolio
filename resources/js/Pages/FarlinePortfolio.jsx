import React, { useState, useEffect } from 'react';
import FarlineNavigation from '@/Components/FarlineNavigation';
import HangingHero from '@/Components/HangingHero';
import WorkIndex from '@/Components/WorkIndex';
import LightTableGallery from '@/Components/LightTableGallery';
import EditorialAboutContact from '@/Components/EditorialAboutContact';
import PlateModal from '@/Components/PlateModal';
import { portfolioItems } from '@/data/portfolio';

export default function FarlinePortfolio() {
    const [activeSection, setActiveSection] = useState('hero');
    const [selectedPlate, setSelectedPlate] = useState(null);

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'work-section', 'gallery-section', 'about-section', 'contact-section'];
            const scrollPos = window.scrollY + 200;

            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        const navId = id.replace('-section', '');
                        setActiveSection(navId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigate = (sectionId) => {
        setActiveSection(sectionId);
        const targetId = sectionId === 'hero' ? 'hero' : `${sectionId}-section`;
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Modal Prev & Next Plate navigation
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
        <div className="relative min-h-screen paper-texture text-farline-dark font-sans selection:bg-farline-dark selection:text-white">
            {/* Farline Fixed Navigations */}
            <FarlineNavigation 
                activeSection={activeSection} 
                onNavigate={handleNavigate} 
            />

            {/* Main Content Sections */}
            <main className="w-full pb-32">
                {/* 1. Signature 3D Hanging Line Hero */}
                <div id="hero">
                    <HangingHero 
                        items={portfolioItems} 
                        onSelectPlate={(item) => setSelectedPlate(item)} 
                    />
                </div>

                {/* 2. Editorial Text/Table Work Index with Cursor Hover Preview */}
                <div id="work">
                    <WorkIndex 
                        items={portfolioItems} 
                        onSelectPlate={(item) => setSelectedPlate(item)} 
                    />
                </div>

                {/* 3. Studio Board / Light Table Gallery */}
                <div id="gallery">
                    <LightTableGallery 
                        items={portfolioItems} 
                        onSelectPlate={(item) => setSelectedPlate(item)} 
                    />
                </div>

                {/* 4. About (Wall Portrait) & Contact (Glass Inquiry Form) */}
                <div id="about">
                    <EditorialAboutContact />
                </div>
            </main>

            {/* Minimalist Farline Footer */}
            <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-farline-border flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-farline-muted gap-4">
                <div>
                    <span>FARLINE THEME ADAPTATION © 2026 • AJI ILHAM</span>
                </div>
                <div className="flex gap-6">
                    <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavigate('hero'); }} className="hover:text-farline-dark transition-colors">
                        Back to Top ↑
                    </a>
                </div>
            </footer>

            {/* Detailed Plate View Lightbox Modal */}
            <PlateModal 
                plate={selectedPlate} 
                onClose={() => setSelectedPlate(null)}
                onNext={handleNextPlate}
                onPrev={handlePrevPlate}
            />
        </div>
    );
}
