import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../App';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    onLogoClick: () => void;
    currentView: string;
    onNavClick: (view: string) => void;
}

const navData = {
    en: { links: ['Culture', 'Lifestyle', 'Community', 'Business', 'Watch/Listen', 'Join Us', 'About'], keyMap: { 'Culture': 'Art & Culture', 'Lifestyle':'Lifestyle', 'Community':'Community', 'Business':'Business', 'Join Us': 'membership', 'Watch/Listen': 'Watch/Listen', 'About': 'About' } },
    fa: { links: ['فرهنگ و هنر', 'رسم زندگی', 'هم‌صدا', 'کار و نوآوری', 'آوا و نما', 'همکاری با ما', 'داستان ما'], keyMap: { 'فرهنگ و هنر': 'هنر و فرهنگ', 'رسم زندگی':'سبک زندگی', 'هم‌صدا': 'Community', 'کار و نوآوری':'کسب و کار', 'آوا و نما': 'Watch/Listen', 'داستان ما': 'About', 'همکاری با ما': 'membership' } }
};

const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        }
    }
};

const mobileLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
};

const MobileMenu: React.FC<{ language: Language; onNavClick: (view: string) => void; onClose: () => void; }> = ({ language, onNavClick, onClose }) => {
    const isPersian = language === 'fa';
    
    const handleLinkClick = (view: string) => {
        onNavClick(view);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/95 z-40 md:hidden"
            dir={isPersian ? 'rtl' : 'ltr'}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 flex flex-col h-full">
                <motion.nav 
                    className="flex flex-col items-center space-y-6 text-center"
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {navData[language].links.map(link => {
                        const categoryKey = (navData[language].keyMap as any)[link] || link;
                         return (
                            <motion.button 
                                key={link} 
                                variants={mobileLinkVariants}
                                onClick={() => handleLinkClick(categoryKey)} 
                                className="text-3xl text-gray-300 hover:text-brand-gold transition-colors duration-300"
                            >
                                {link}
                            </motion.button>
                         )
                    })}
                </motion.nav>
            </div>
        </motion.div>
    );
}


const Header: React.FC<HeaderProps> = ({ language, setLanguage, onLogoClick, currentView, onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedLangStyles = "bg-brand-gold text-black";
  const unselectedLangStyles = "bg-gray-700 text-white hover:bg-gray-600";

  const isCategoryActive = (category: string) => {
    const keyMap = navData[language].keyMap as any;
    const mappedView = keyMap[category];
    
    if (currentView === mappedView) return true;
    
    const categoryKey = Object.keys(keyMap).find(key => keyMap[key] === currentView);
    return category === categoryKey;
  }

  return (
    <>
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-black/50 backdrop-blur-md shadow-lg border-b border-gray-800 sticky top-0 z-50 font-ui">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
                <motion.button 
                    onClick={onLogoClick} 
                    className="text-2xl font-bold text-brand-gold tracking-tight cursor-pointer font-['Playfair_Display']"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                    DaySun Media X
                </motion.button>
            </div>
            <nav className="hidden md:flex items-center space-x-2">
              {navData[language].links.map(link => {
                  const categoryKey = (navData[language].keyMap as any)[link] || link;
                  const isActive = isCategoryActive(link);
                  return (
                    <button 
                        key={link} 
                        onClick={() => onNavClick(categoryKey)} 
                        className={`relative px-3 py-2 transition-colors duration-300 rounded-md text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        {link}
                        {isActive && (
                            <motion.div 
                                className="absolute bottom-[-2px] left-2 right-2 h-0.5 bg-brand-gold" 
                                layoutId="active-nav-underline"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button>
                  )
              })}
            </nav>
            <div className="flex items-center space-x-2">
               <div className="flex items-center bg-gray-800 rounded-full p-1">
                 <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'en' ? selectedLangStyles : unselectedLangStyles}`}
                    aria-pressed={language === 'en'}
                 >
                    EN
                 </button>
                 <button 
                    onClick={() => setLanguage('fa')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'fa' ? selectedLangStyles : unselectedLangStyles}`}
                    aria-pressed={language === 'fa'}
                 >
                    پارسی
                 </button>
               </div>
               <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white z-50 relative">
                       <div className="w-6 h-6 flex flex-col justify-around items-center">
                            <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 5 : 0 }} className="w-full h-0.5 bg-white rounded-full"></motion.span>
                            <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="w-full h-0.5 bg-white rounded-full"></motion.span>
                            <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -5 : 0 }} className="w-full h-0.5 bg-white rounded-full"></motion.span>
                       </div>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </motion.header>
    <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu language={language} onNavClick={onNavClick} onClose={() => setIsMobileMenuOpen(false)} />}
    </AnimatePresence>
    </>
  );
};

export default Header;
