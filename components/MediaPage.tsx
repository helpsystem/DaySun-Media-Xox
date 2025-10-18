import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../App';
import { mediaData, MediaItem } from './mediaData';

const pageContent = {
    en: {
        title: "Watch & Listen",
        subtitle: "Explore our collection of original video series and podcasts.",
        all: "All",
        videos: "Videos",
        podcasts: "Podcasts",
        watch: "Watch Now",
        listen: "Listen Now",
        close: "Close"
    },
    fa: {
        title: "آوا و نما",
        subtitle: "مجموعه ویدیوها و پادکست‌های ما را دنبال کنید.",
        all: "همه",
        videos: "ویدیوها",
        podcasts: "پادکست‌ها",
        watch: "اکنون ببینید",
        listen: "اکنون بشنوید",
        close: "بستن"
    }
};

type FilterType = 'all' | 'video' | 'podcast';

const MediaCard: React.FC<{ item: MediaItem; onSelect: (item: MediaItem) => void; language: Language }> = ({ item, onSelect, language }) => {
    const t = pageContent[language];
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 flex flex-col group cursor-pointer"
            onClick={() => onSelect(item)}
        >
            <div className="overflow-hidden relative">
                <img src={item.thumbnail} alt={item.title} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                </div>
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <p className="text-sm text-brand-gold font-semibold mb-2 font-ui uppercase">{item.type}</p>
                <h4 className="text-xl font-bold text-white mb-2 flex-grow">{item.title}</h4>
                <p className="text-gray-400 text-sm line-clamp-3">{item.description}</p>
            </div>
        </motion.div>
    );
};

const MediaModal: React.FC<{ item: MediaItem | null; onClose: () => void; language: Language }> = ({ item, onClose, language }) => {
     const t = pageContent[language];
     return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="bg-gray-900 w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe 
                                src={item.embedUrl} 
                                title={item.title}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-brand-gold">{item.title}</h3>
                            <p className="text-gray-400 mt-2">{item.description}</p>
                        </div>
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors" aria-label={t.close}>
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


const MediaPage: React.FC<{ language: Language }> = ({ language }) => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
    const t = pageContent[language];
    const isPersian = language === 'fa';

    const filteredMedia = mediaData[language].filter(item => 
        filter === 'all' || item.type === filter
    );
    
    const FilterButton: React.FC<{ type: FilterType; label: string; }> = ({ type, label }) => (
        <button 
            onClick={() => setFilter(type)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-colors relative ${filter === type ? 'text-black' : 'text-white hover:text-brand-gold'}`}
        >
            <span className="relative z-10">{label}</span>
            {filter === type && (
                <motion.div 
                    className="absolute inset-0 bg-brand-gold rounded-full"
                    layoutId="filter-pill"
                />
            )}
        </button>
    );

    return (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
            dir={isPersian ? 'rtl' : 'ltr'}
        >
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-gold">{t.title}</h2>
                <p className="text-gray-400 mt-2">{t.subtitle}</p>
            </div>
            
            <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse mb-12 bg-gray-800/50 p-2 rounded-full max-w-xs mx-auto font-ui">
                <FilterButton type="all" label={t.all} />
                <FilterButton type="video" label={t.videos} />
                <FilterButton type="podcast" label={t.podcasts} />
            </div>

            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredMedia.map(item => (
                        <MediaCard key={item.id} item={item} onSelect={setSelectedMedia} language={language} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
        <MediaModal item={selectedMedia} onClose={() => setSelectedMedia(null)} language={language} />
        </>
    );
};

export default MediaPage;