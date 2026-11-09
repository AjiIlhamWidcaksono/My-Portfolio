import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function EditorialAboutContact() {
    const [formState, setFormState] = useState({ name: '', email: '', project: 'Motion', message: '' });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSent(true);
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#14130e', '#6f6e69', '#d9d8d3']
        });
        setTimeout(() => {
            setIsSent(false);
            setFormState({ name: '', email: '', project: 'Motion', message: '' });
        }, 4000);
    };

    return (
        <section className="relative w-full py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-farline-border">
            {/* 1. Wall-Hung About Section */}
            <div id="about-section" className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-36">
                {/* Wall Portrait Frame (Left) */}
                <div className="lg:col-span-5 relative group flex flex-col items-center">
                    {/* Peg on Wall */}
                    <div className="relative -top-2 z-20">
                        <img 
                            src="images/peg_front.png" 
                            alt="Peg" 
                            className="w-6 h-8 object-contain drop-shadow-sm select-none pointer-events-none"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                    {/* Frame Mount */}
                    <div className="bg-white p-4 rounded-[3px] border border-farline-border shadow-farline-lift w-full max-w-sm">
                        <div className="aspect-[3/4] w-full overflow-hidden bg-black/5 rounded-[2px]">
                            <img 
                                src="images/pp.png" 
                                alt="Aji Ilham Profile Portrait" 
                                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="mt-3 text-center">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-farline-muted">
                                Plate 00 • Aji Ilham (Designer & Editor)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Editorial Biography (Right) */}
                <div className="lg:col-span-7 flex flex-col justify-center pt-4">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-farline-muted mb-4">
                        About • Profile
                    </span>
                    <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-farline-dark leading-tight mb-8">
                        Creating visual momentum, dynamic rhythm, and minimal editorial clarity.
                    </h3>
                    
                    <p className="text-sm md:text-base leading-relaxed text-farline-muted font-normal mb-8">
                        Saya adalah seorang Graphic Designer dan Video Editor / Motion Artist yang berfokus pada estetika visual berkarakter—mulai dari video editing bertempo tinggi, animasi tipografi kinetik, hingga komposisi cetak editorial dan manipulasi foto surealis.
                    </p>

                    {/* Metadata Lists (Clients, Recognition, Tools) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-farline-border">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-farline-dark block mb-3 font-semibold">
                                Disciplines & Focus
                            </span>
                            <ul className="text-xs font-mono space-y-2 text-farline-muted">
                                <li>• High-Tempo Video Editing</li>
                                <li>• Motion Graphics & Kinetic Typography</li>
                                <li>• Editorial & Poster Graphic Design</li>
                                <li>• Surrealist Photo Manipulation</li>
                            </ul>
                        </div>
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-farline-dark block mb-3 font-semibold">
                                Primary Toolkit
                            </span>
                            <ul className="text-xs font-mono space-y-2 text-farline-muted">
                                <li>• Adobe Premiere Pro</li>
                                <li>• Adobe After Effects</li>
                                <li>• Adobe Photoshop</li>
                                <li>• Figma & Cinema 4D</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Glass Inquiry & Contact Form */}
            <div id="contact-section" className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start pt-16 border-t border-farline-border">
                {/* Contact Meta (Left) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-farline-muted mb-4 block">
                            Direct Contact
                        </span>
                        <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-farline-dark mb-6">
                            Start an Enquiry
                        </h3>
                        <p className="text-sm text-farline-muted leading-relaxed mb-8">
                            Tersedia untuk proyek komersial, editing video promosi, desain identitas, maupun kolaborasi kreatif. Respon rata-rata dalam 24 jam kerja.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 text-xs font-mono">
                        <div>
                            <span className="text-farline-muted uppercase tracking-wider block mb-1">Location</span>
                            <span className="text-farline-dark font-medium">Indonesia • GMT+7 (Worldwide Available)</span>
                        </div>
                        <div>
                            <span className="text-farline-muted uppercase tracking-wider block mb-1">Direct Email</span>
                            <a href="mailto:contact@designer.com" className="text-farline-dark font-medium underline underline-offset-4">
                                contact@designer.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Glass Inquiry Form (Right) */}
                <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[4px] border border-farline-border shadow-farline-card">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex justify-between items-center text-xs font-mono text-farline-muted pb-4 border-b border-farline-border">
                            <span>NEW ENQUIRY</span>
                            <span>FORM 01/01</span>
                        </div>

                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase tracking-widest text-farline-dark">
                                Name *
                            </label>
                            <input 
                                type="text"
                                required
                                placeholder="Your full name..."
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full px-4 py-3 bg-[#fbfbf9] rounded-[2px] border border-farline-border text-sm font-sans outline-none focus:border-farline-dark transition-colors"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase tracking-widest text-farline-dark">
                                Email Address *
                            </label>
                            <input 
                                type="email"
                                required
                                placeholder="name@company.com"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full px-4 py-3 bg-[#fbfbf9] rounded-[2px] border border-farline-border text-sm font-sans outline-none focus:border-farline-dark transition-colors"
                            />
                        </div>

                        {/* Project Category Picker */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase tracking-widest text-farline-dark">
                                Project Discipline
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {['Video Editing', 'Motion Graphics', 'Graphic Design'].map((cat) => (
                                    <button
                                        type="button"
                                        key={cat}
                                        onClick={() => setFormState({ ...formState, project: cat })}
                                        className={`py-2 px-3 text-xs font-mono uppercase tracking-wider rounded-[2px] border transition-colors ${
                                            formState.project === cat 
                                                ? 'bg-farline-dark text-white border-farline-dark' 
                                                : 'bg-[#fbfbf9] text-farline-muted border-farline-border hover:border-farline-dark'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-mono uppercase tracking-widest text-farline-dark">
                                Project Brief & Details *
                            </label>
                            <textarea 
                                rows="4"
                                required
                                placeholder="Tell me about the timeline, scope, and objective of your project..."
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full px-4 py-3 bg-[#fbfbf9] rounded-[2px] border border-farline-border text-sm font-sans outline-none focus:border-farline-dark transition-colors resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-4 bg-farline-dark text-white font-mono text-xs uppercase tracking-[0.25em] font-semibold hover:bg-black transition-colors rounded-[2px] mt-2 flex items-center justify-center gap-2"
                        >
                            {isSent ? 'Message Dispatched ✓' : 'Send Enquiry ↗'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
