import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Welcome from './Pages/Welcome';

// Data Proyek Portofolio Lengkap (11 Proyek Pilihan: 5 Desain Grafis & 6 Motion Graphics)
// Disusun bergantian (interleaved) agar tampilan galeri kategori "Semua" seimbang antara video dan foto
const staticProjects = [
    {
        id: 1,
        title: 'Round Slide Dynamic Transition',
        category: { name: 'Motion Graphics' },
        client: 'Motion Academy Studio',
        project_date: '2026-06-25',
        description: 'Penyuntingan video motion graphics dengan teknik round slide transition yang dinamis, berenergi, dan mulus.',
        video_url: 'videos/video1.mp4',
        hero_url: 'images/thumb_video1.jpg',
        tools: [
            { id: 1, name: 'Adobe After Effects' },
            { id: 2, name: 'CapCut' }
        ]
    },
    {
        id: 2,
        title: 'Cyberpunk Streetwear Promo',
        category: { name: 'Motion Graphics' },
        client: 'Neo Tokyo Apparel',
        project_date: '2026-03-15',
        description: 'Sebuah video promosi berkecepatan tinggi lini pakaian jalanan bernuansa neon cyberpunk dengan color grading berani.',
        video_url: 'videos/video2.mp4',
        hero_url: 'images/thumb_video2.jpg',
        tools: [
            { id: 3, name: 'Adobe Premiere Pro' },
            { id: 1, name: 'Adobe After Effects' },
            { id: 2, name: 'CapCut' }
        ]
    },
    {
        id: 3,
        title: 'Teka Teki Impian',
        category: { name: 'Desain Grafis' },
        client: 'Kementerian Pendidikan dan Kebudayaan',
        project_date: '2026-06-28',
        description: 'Desain cover buku novel "Teka Teki Impian" dengan komposisi visual puzzle kreatif bernilai estetika tinggi.',
        video_url: null,
        hero_url: 'images/image1.png',
        tools: [
            { id: 4, name: 'Adobe Photoshop' },
            { id: 5, name: 'Figma' }
        ]
    },
    {
        id: 4,
        title: 'Modern Poster & Typography Art',
        category: { name: 'Desain Grafis' },
        client: 'Creative Exhibition',
        project_date: '2026-10-29',
        description: 'Eksplorasi tata letak tipografi kontemporer dan layout poster visual resolusi tinggi dengan estetika modern.',
        video_url: null,
        hero_url: 'images/image5.png',
        tools: [
            { id: 4, name: 'Adobe Photoshop' },
            { id: 5, name: 'Figma' }
        ]
    },
    {
        id: 5,
        title: 'Abstract 3D Shape Morphing',
        category: { name: 'Motion Graphics' },
        client: 'Museum Seni Digital',
        project_date: '2026-04-10',
        description: 'Instalasi seni generatif yang mengeksplorasi metamorfosis bentuk geometri dinamis dan simulasi pencahayaan surrealis.',
        video_url: 'videos/video3.mp4',
        hero_url: 'images/thumb_video3.jpg',
        tools: [
            { id: 1, name: 'Adobe After Effects' },
            { id: 5, name: 'Figma' }
        ]
    },
    {
        id: 6,
        title: 'Lawan Narkoba Dengan Prestasi',
        category: { name: 'Desain Grafis' },
        client: 'Badan Narkotika Nasional',
        project_date: '2026-06-20',
        description: 'Poster infografis edukatif bertema "Lawan Narkoba dengan Prestasi" dengan ilustrasi berani dan tipografi tegas.',
        video_url: null,
        hero_url: 'images/image2.png',
        tools: [
            { id: 4, name: 'Adobe Photoshop' },
            { id: 5, name: 'Figma' }
        ]
    },
    {
        id: 7,
        title: 'Surrealist Editorial Collage',
        category: { name: 'Desain Grafis' },
        client: 'Vogue Indonesia (Mockup)',
        project_date: '2026-01-20',
        description: 'Eksperimen manipulasi foto surealis untuk sampul majalah mode kontemporer.',
        video_url: null,
        hero_url: 'images/image3.jpeg',
        tools: [
            { id: 4, name: 'Adobe Photoshop' },
            { id: 5, name: 'Figma' }
        ]
    },
    {
        id: 8,
        title: 'Cinematic Travel Visual Story',
        category: { name: 'Motion Graphics' },
        client: 'Personal Project',
        project_date: '2026-05-18',
        description: 'Video dokumenter perjalanan pendek dengan transisi sinematik halus dan atmosfer alam yang mendalam.',
        video_url: 'videos/video4.mp4',
        hero_url: 'images/thumb_video4.jpg',
        tools: [
            { id: 3, name: 'Adobe Premiere Pro' },
            { id: 1, name: 'Adobe After Effects' }
        ]
    },
    {
        id: 9,
        title: 'Dynamic Kinetic Typography Reel',
        category: { name: 'Motion Graphics' },
        client: 'Brand Kinetic Agency',
        project_date: '2026-07-02',
        description: 'Eksperimen tipografi kinetik berkecepatan tinggi dengan efek transisi ritmis dan motion blur sinematik.',
        video_url: 'videos/video5.mp4',
        hero_url: 'images/thumb_video5.jpg',
        tools: [
            { id: 1, name: 'Adobe After Effects' },
            { id: 3, name: 'Adobe Premiere Pro' }
        ]
    },
    {
        id: 10,
        title: 'Open Loker Graphic Designer',
        category: { name: 'Desain Grafis' },
        client: 'Nusantara Cipta',
        project_date: '2026-06-15',
        description: 'Poster lowongan kerja (recruitment flyer) posisi Graphic Designer dengan visual modern dan terstruktur rapi.',
        video_url: null,
        hero_url: 'images/image4.png',
        tools: [
            { id: 5, name: 'Figma' },
            { id: 4, name: 'Adobe Photoshop' }
        ]
    },
    {
        id: 11,
        title: 'Modern Minimalist Logo Sting',
        category: { name: 'Motion Graphics' },
        client: 'Identity Lab Studio',
        project_date: '2026-08-11',
        description: 'Animasi bumper logo identitas brand dengan timing presisi, transisi minimalis, dan sentuhan visual futuristik.',
        video_url: 'videos/video6.mp4',
        hero_url: 'images/thumb_video6.jpg',
        tools: [
            { id: 1, name: 'Adobe After Effects' }
        ]
    }
];

// Mount aplikasi React ke elemen div id="app"
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<Welcome projects={staticProjects} tools={[]} />);
}
