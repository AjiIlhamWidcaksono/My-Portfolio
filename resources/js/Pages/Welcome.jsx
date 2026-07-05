import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import Hero from '@/Components/Hero';
import About from '@/Components/About';
import Works from '@/Components/Works';
import Contact from '@/Components/Contact';

export default function Welcome({ projects = [], tools = [] }) {
    const handleExploreClick = () => {
        const worksSection = document.getElementById('works-section');
        if (worksSection) {
            worksSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <PortfolioLayout>
            <Head>
                <title>Desainer Grafis & Video Editor | Portofolio Interaktif</title>
                <meta name="description" content="Website portofolio interaktif dan modern minimalis menampilkan karya desain grafis, editing video, motion graphics, dan konten sosial media berkualitas tinggi." />
            </Head>

            {/* Section 1: Hero Landing */}
            <Hero onExploreClick={handleExploreClick} />

            {/* Section 2: About Me & Tools */}
            <About tools={tools} />

            {/* Section 3: Portfolio Works Gallery */}
            <Works projects={projects} />

            {/* Section 4: Contact Form */}
            <Contact />
        </PortfolioLayout>
    );
}
