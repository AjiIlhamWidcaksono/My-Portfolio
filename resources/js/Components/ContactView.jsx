import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ContactView() {
    const [formState, setFormState] = useState({ name: '', email: '', project: 'Motion', message: '' });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSent(true);
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.75 },
            colors: ['#14130e', '#6f6e69', '#d9d8d3']
        });
        setTimeout(() => {
            setIsSent(false);
            setFormState({ name: '', email: '', project: 'Motion', message: '' });
        }, 4000);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full pt-28 pb-36 px-6 sm:px-12 max-w-7xl mx-auto"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                {/* Contact Meta (Left) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-farline-muted mb-4 block">
                            Direct Contact
                        </span>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-farline-dark mb-6">
                            Start an Enquiry
                        </h3>
                        <p className="text-sm text-farline-muted leading-relaxed mb-8">
                            Tersedia untuk proyek komersial, penyuntingan video promosi, desain identitas visual, maupun kolaborasi kreatif lainnya. Respon rata-rata dalam 24 jam kerja.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 text-xs font-mono pt-6 border-t border-farline-border">
                        <div>
                            <span className="text-farline-muted uppercase tracking-wider block mb-1">Location</span>
                            <span className="text-farline-dark font-medium">Indonesia • GMT+7 (Available Worldwide)</span>
                        </div>
                        <div>
                            <span className="text-farline-muted uppercase tracking-wider block mb-1">Direct Email</span>
                            <a href="mailto:contact@designer.com" className="text-farline-dark font-medium underline underline-offset-4">
                                contact@designer.com
                            </a>
                        </div>
                        <div>
                            <span className="text-farline-muted uppercase tracking-wider block mb-1">Elsewhere</span>
                            <div className="flex gap-4 text-farline-dark font-medium underline underline-offset-4">
                                <a href="#">Instagram ↗</a>
                                <a href="#">Behance ↗</a>
                                <a href="#">Vimeo ↗</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glass Inquiry Form (Right) */}
                <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[4px] border border-farline-border shadow-farline-card">
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
                                Project Brief & Scope *
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
        </motion.div>
    );
}
