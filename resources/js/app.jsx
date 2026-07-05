import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Welcome from './Pages/Welcome';

// Data Proyek Portofolio Statis (Sebelumnya dari database)
const staticProjects = [
    {
        id: 1,
        title: 'Teka Teki Impian',
        category: { name: 'Desain Grafis' },
        client: 'Kementerian Pendidikan dan Kebudayaan',
        project_date: '2026-06-28',
        description: 'Desain cover buku novel "Teka Teki Impian" dengan komposisi visual puzzle kreatif.',
        video_url: null,
        hero_url: 'images/image1.png',
        tools: [
            { id: 1, name: 'Adobe Photoshop' },
            { id: 2, name: 'Figma' }
        ]
    },
    {
        id: 2,
        title: 'Lawan Narkoba Dengan Prestasi',
        category: { name: 'Desain Grafis' },
        client: 'Badan Narkotika Nasional',
        project_date: '2026-06-20',
        description: 'Poster infografis edukatif bertema "Lawan Narkoba dengan Prestasi".',
        video_url: null,
        hero_url: 'images/image2.png',
        tools: [
            { id: 1, name: 'Adobe Photoshop' },
            { id: 2, name: 'Figma' }
        ]
    },
    {
        id: 3,
        title: 'Open Loker Graphic Designer',
        category: { name: 'Desain Grafis' },
        client: 'Nusantara Cipta',
        project_date: '2026-06-15',
        description: 'Poster lowongan kerja (recruitment flyer) posisi Graphic Designer.',
        video_url: null,
        hero_url: 'images/image4.png',
        tools: [
            { id: 2, name: 'Figma' },
            { id: 1, name: 'Adobe Photoshop' }
        ]
    },
    {
        id: 4,
        title: 'Surrealist Editorial Collage',
        category: { name: 'Desain Grafis' },
        client: 'Vogue Indonesia (Mockup)',
        project_date: '2026-01-20',
        description: 'Eksperimen manipulasi foto surealis untuk sampul majalah mode.',
        video_url: null,
        hero_url: 'images/image3.jpeg',
        tools: [
            { id: 1, name: 'Adobe Photoshop' },
            { id: 2, name: 'Figma' }
        ]
    },
    {
        id: 5,
        title: 'Round Slide Transition Tutorial',
        category: { name: 'Motion Graphics' },
        client: 'Motion Academy',
        project_date: '2026-06-25',
        description: 'Video tutorial penyuntingan motion graphics transisi bundar.',
        video_url: 'videos/video1.mp4',
        hero_url: 'images/image3.jpeg',
        tools: [
            { id: 3, name: 'Adobe After Effects' },
            { id: 4, name: 'CapCut' }
        ]
    },
    {
        id: 6,
        title: 'Cyberpunk Streetwear Promo',
        category: { name: 'Motion Graphics' },
        client: 'Neo Tokyo Apparel',
        project_date: '2026-03-15',
        description: 'Sebuah video promosi berkecepatan tinggi lini pakaian jalanan.',
        video_url: 'videos/video2.mp4',
        hero_url: 'images/image1.png',
        tools: [
            { id: 5, name: 'Adobe Premiere Pro' },
            { id: 3, name: 'Adobe After Effects' },
            { id: 4, name: 'CapCut' }
        ]
    },
    {
        id: 7,
        title: 'Abstract 3D Shape Morphing',
        category: { name: 'Motion Graphics' },
        client: 'Museum Seni Digital',
        project_date: '2026-04-10',
        description: 'Instalasi seni generatif yang mengeksplorasi metamorfosis bentuk.',
        video_url: 'videos/video3.mp4',
        hero_url: 'images/image2.png',
        tools: [
            { id: 3, name: 'Adobe After Effects' },
            { id: 2, name: 'Figma' }
        ]
    },
    {
        id: 8,
        title: 'Cinematic Iceland Travel',
        category: { name: 'Motion Graphics' },
        client: 'Personal Project',
        project_date: '2025-11-12',
        description: 'Video dokumenter perjalanan pendek pemandangan megah Islandia.',
        video_url: 'videos/video4.mp4',
        hero_url: 'images/image4.png',
        tools: [
            { id: 5, name: 'Adobe Premiere Pro' },
            { id: 3, name: 'Adobe After Effects' }
        ]
    }
];

// Mount aplikasi React ke elemen div id="app"
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<Welcome projects={staticProjects} tools={[]} />);
}
