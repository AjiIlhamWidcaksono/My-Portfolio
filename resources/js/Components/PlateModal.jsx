import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlateModal({ plate, onClose, onNext, onPrev }) {
    if (!plate) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md">
                {/* Backdrop Click */}
                <div className="absolute inset-0" onClick={onClose} />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-[4px] border border-farline-border shadow-2xl flex flex-col no-scrollbar"
                >
                    {/* Top Modal Bar */}
                    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-farline-border flex justify-between items-center text-xs font-mono">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-farline-dark">Plate {plate.plate}</span>
                            <span className="text-farline-muted">•</span>
                            <span className="text-farline-muted">{plate.title}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-farline-muted hidden sm:inline">{plate.place}, {plate.country}</span>
                            <button 
                                onClick={onClose}
                                className="w-7 h-7 rounded-full border border-farline-border flex items-center justify-center hover:bg-farline-dark hover:text-white transition-colors text-sm"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Media Display Area */}
                    <div className="w-full bg-[#14130e] p-6 sm:p-10 flex items-center justify-center min-h-[360px] md:min-h-[480px]">
                        {plate.hasVideo ? (
                            <video 
                                src={plate.video}
                                poster={plate.image}
                                autoPlay 
                                controls 
                                loop 
                                playsInline 
                                className="max-h-[65vh] w-auto max-w-full rounded-[2px] shadow-2xl"
                            />
                        ) : (
                            <img 
                                src={plate.image} 
                                alt={plate.title} 
                                className="max-h-[65vh] w-auto max-w-full object-contain rounded-[2px] shadow-2xl"
                            />
                        )}
                    </div>

                    {/* Technical Spec & Metadata Table */}
                    <div className="p-6 sm:p-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-farline-border text-xs font-mono">
                        <div>
                            <span className="text-farline-muted block mb-1 uppercase tracking-wider">Discipline</span>
                            <span className="text-farline-dark font-medium">{plate.category}</span>
                        </div>
                        <div>
                            <span className="text-farline-muted block mb-1 uppercase tracking-wider">Series</span>
                            <span className="text-farline-dark font-medium">{plate.series}</span>
                        </div>
                        <div>
                            <span className="text-farline-muted block mb-1 uppercase tracking-wider">Year & Client</span>
                            <span className="text-farline-dark font-medium">{plate.year} • {plate.client}</span>
                        </div>
                        <div>
                            <span className="text-farline-muted block mb-1 uppercase tracking-wider">Edition</span>
                            <span className="text-farline-dark font-medium">{plate.edition}</span>
                        </div>
                        <div className="sm:col-span-2">
                            <span className="text-farline-muted block mb-1 uppercase tracking-wider">Technical Specs / Toolkit</span>
                            <span className="text-farline-dark font-medium">{plate.camera} ({plate.settings})</span>
                        </div>
                        <div className="col-span-2 sm:col-span-2">
                            <span className="text-farline-muted block mb-1 uppercase tracking-wider">Concept Notes</span>
                            <p className="text-farline-muted text-xs leading-relaxed">{plate.description}</p>
                        </div>
                    </div>

                    {/* Bottom Modal Actions */}
                    <div className="p-6 bg-[#fbfbf9] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
                        <div className="flex gap-4">
                            <button
                                onClick={onPrev}
                                className="px-4 py-2 border border-farline-border hover:border-farline-dark rounded-[2px] transition-colors"
                            >
                                ← Previous Plate
                            </button>
                            <button
                                onClick={onNext}
                                className="px-4 py-2 border border-farline-border hover:border-farline-dark rounded-[2px] transition-colors"
                            >
                                Next Plate →
                            </button>
                        </div>

                        <a 
                            href="#contact-section"
                            onClick={onClose}
                            className="px-6 py-2.5 bg-farline-dark text-white rounded-[2px] hover:bg-black transition-colors"
                        >
                            Enquire About This Work ↗
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
