import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../App';

interface HeroProps {
    language: Language;
}

const content = {
    en: {
        title: "Connecting Worlds, One Story at a Time.",
        subtitle: "A bilingual multimedia platform for the Iranian diaspora, global communities, and new generations.",
        button: "Explore Stories"
    },
    fa: {
        title: "هر داستان، پلی میان جهان‌ها",
        subtitle: "جایی برای شنیدن صدای ایرانیان، در گفتگو با جهان و نسل‌های نو.",
        button: "سفر به جهان قصه‌ها"
    }
}

const HeroSection: React.FC<HeroProps> = ({ language }) => {
    const isPersian = language === 'fa';
    const currentContent = content[language];

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <motion.div 
             className="absolute inset-0 z-0 bg-cover bg-center"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534086191913-17a4a42035a6?q=80&w=2070&auto=format&fit=crop')` }}
             initial={{ scale: 1.1, opacity: 0.8 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        >
        </motion.div>
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className={`relative z-20 px-4`} dir={isPersian ? 'rtl' : 'ltr'}>
            <motion.h2 
                key={`${language}-title`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight"
            >
                {currentContent.title}
            </motion.h2>
            <motion.p 
                 key={`${language}-subtitle`}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
             >
                {currentContent.subtitle}
            </motion.p>
            <motion.a 
                 href="#stories-section"
                 key={`${language}-button`}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.6 }}
                 className="bg-brand-gold text-black font-bold py-3 px-8 rounded-full hover:bg-brand-gold-dark transition-all duration-300 transform hover:scale-105 shadow-lg font-ui inline-block"
             >
                {currentContent.button}
            </motion.a>
        </div>
    </section>
  );
};

export default HeroSection;