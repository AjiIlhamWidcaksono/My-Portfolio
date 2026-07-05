import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [focusedField, setFocusedField] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleFocus = (field) => setFocusedField(field);
    const handleBlur = (field) => {
        if (!formState[field]) {
            setFocusedField(null);
        } else {
            setFocusedField(field); // Keep it active if there is text
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (status === 'loading' || status === 'success') return;

        setStatus('loading');

        // Simulasi pengiriman form (1.5 detik)
        setTimeout(() => {
            setStatus('success');
            
            // Konfeti perayaan!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF5722', '#F9F6F0', '#0A0A0A']
            });

            // Reset ke keadaan awal setelah beberapa detik
            setTimeout(() => {
                setFormState({ name: '', email: '', message: '' });
                setFocusedField(null);
                setStatus('idle');
            }, 3000);
        }, 1500);
    };

    const socialLinks = [
        { name: 'Instagram', url: '#', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01' },
        { name: 'Behance', url: '#', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-2h3v2zm0-3H8v-2h3v2zm4 3h-2.5v-5H15v5z' },
        { name: 'Vimeo', url: '#', icon: 'M22.3 7.55c-.07 1.48-1.1 3.51-3.1 6.1-2.07 2.68-3.83 4.02-5.27 4.02-.9 0-1.65-.83-2.27-2.48l-1.53-5.59c-.46-1.72-.96-2.58-1.5-2.58-.12 0-.54.26-1.27.79l-.75-.95c.78-.69 1.55-1.38 2.3-2.07 1.05-.96 1.83-1.46 2.33-1.48.9-.03 1.45.57 1.66 1.8.22 1.34.46 3.19.72 5.56.36 2.05.69 3.07 1 3.07.25 0 .69-.53 1.34-1.6 1.62-2.7 2.45-4.08 2.48-4.14.03-.13-.08-.22-.32-.22-.16 0-.53.11-1.12.33l-.86-1.1c.56-.51 1.25-1.19 2.08-2.04 1-.95 1.7-.13 1.7.95v.38z' },
        { name: 'Email', url: 'mailto:contact@designer.com', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6' },
    ];

    return (
        <section id="contact-section" className="relative w-full py-24 md:py-36 bg-ivory dark:bg-[#0A0A0A] text-charcoal dark:text-ivory overflow-hidden border-t border-charcoal/5 dark:border-ivory/5">
            <div className="max-w-6xl mx-auto px-8">
                {/* Judul Bagian */}
                <div className="flex flex-col mb-16">
                    <span className="text-xs uppercase tracking-widest text-[#FF5722] font-bold mb-3">03 / CONTACT</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">MARI BERKOLABORASI</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
                    {/* Sisi Kiri: Informasi Kontak & Sosial */}
                    <div className="md:col-span-5 flex flex-col justify-between h-full gap-8">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight mb-6">
                                Punya ide proyek besar atau butuh jasa editing/desain?
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed text-charcoal/70 dark:text-ivory/70 mb-8">
                                Hubungi saya langsung melalui formulir, atau temukan saya di berbagai kanal sosial media. Saya biasanya membalas pesan dalam waktu 24 jam kerja.
                            </p>
                        </div>

                        {/* Social Links dengan Hover Magnetik */}
                        <div className="flex flex-col gap-4">
                            <span className="text-xs uppercase tracking-widest text-charcoal/40 dark:text-ivory/40 font-bold">IKUTI SAYA</span>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        data-cursor="magnetic"
                                        className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-charcoal/10 dark:border-ivory/10 hover:border-accent dark:hover:border-accent text-charcoal dark:text-ivory hover:text-[#F9F6F0] dark:hover:text-[#F9F6F0] transition-colors duration-300"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d={link.icon} />
                                        </svg>
                                        <div className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center z-[-1]" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sisi Kanan: Formulir Kontak */}
                    <div className="md:col-span-7">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                            {/* Input Nama */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('name')}
                                    onBlur={() => handleBlur('name')}
                                    className="w-full py-3 bg-transparent border-b-2 border-charcoal/10 dark:border-ivory/10 outline-none text-sm font-semibold transition-colors duration-300 focus:border-charcoal/30 dark:focus:border-ivory/30"
                                />
                                <label 
                                    className={`absolute left-0 top-3 text-sm tracking-wider uppercase font-bold transition-all duration-300 pointer-events-none ${
                                        focusedField === 'name' || formState.name
                                            ? '-translate-y-7 text-xs text-accent'
                                            : 'text-charcoal/30 dark:text-ivory/30'
                                    }`}
                                >
                                    Nama Anda
                                </label>
                                {/* Animated active border */}
                                <div 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 ease-out ${
                                        focusedField === 'name' ? 'w-full' : 'w-0'
                                    }`}
                                />
                            </div>

                            {/* Input Email */}
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                    className="w-full py-3 bg-transparent border-b-2 border-charcoal/10 dark:border-ivory/10 outline-none text-sm font-semibold transition-colors duration-300 focus:border-charcoal/30 dark:focus:border-ivory/30"
                                />
                                <label 
                                    className={`absolute left-0 top-3 text-sm tracking-wider uppercase font-bold transition-all duration-300 pointer-events-none ${
                                        focusedField === 'email' || formState.email
                                            ? '-translate-y-7 text-xs text-accent'
                                            : 'text-charcoal/30 dark:text-ivory/30'
                                    }`}
                                >
                                    Email Anda
                                </label>
                                <div 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 ease-out ${
                                        focusedField === 'email' ? 'w-full' : 'w-0'
                                    }`}
                                />
                            </div>

                            {/* Input Pesan */}
                            <div className="relative w-full">
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    value={formState.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={() => handleBlur('message')}
                                    className="w-full py-3 bg-transparent border-b-2 border-charcoal/10 dark:border-ivory/10 outline-none text-sm font-semibold transition-colors duration-300 resize-none focus:border-charcoal/30 dark:focus:border-ivory/30"
                                />
                                <label 
                                    className={`absolute left-0 top-3 text-sm tracking-wider uppercase font-bold transition-all duration-300 pointer-events-none ${
                                        focusedField === 'message' || formState.message
                                            ? '-translate-y-7 text-xs text-accent'
                                            : 'text-charcoal/30 dark:text-ivory/30'
                                    }`}
                                >
                                    Pesan / Deskripsi Proyek
                                </label>
                                <div 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 ease-out ${
                                        focusedField === 'message' ? 'w-full' : 'w-0'
                                    }`}
                                />
                            </div>

                            {/* Tombol Submit dengan Status Mikro-Interaksi */}
                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={status !== 'idle'}
                                    data-cursor="magnetic"
                                    className="group relative flex items-center justify-center px-10 py-5 rounded-full border border-charcoal/10 dark:border-ivory/10 hover:border-accent dark:hover:border-accent text-sm uppercase tracking-widest font-bold overflow-hidden transition-colors duration-300 disabled:border-accent"
                                >
                                    <span className="relative z-10 flex items-center gap-2 group-hover:text-[#F9F6F0] transition-colors duration-300">
                                        {status === 'idle' && (
                                            <>
                                                Kirim Pesan
                                                <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 stroke-current transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth="1.5">
                                                    <path d="M1 9L9 1M9 1H2M9 1V8" />
                                                </svg>
                                            </>
                                        )}
                                        {status === 'loading' && (
                                            <>
                                                Mengirim...
                                                <svg className="animate-spin h-4 w-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </>
                                        )}
                                        {status === 'success' && (
                                            <>
                                                Berhasil Terkirim!
                                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-400">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center z-0" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
