import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Story } from './StoryDetailPage';
import type { Language } from '../App';

interface FlipbookViewProps {
    story: Story;
    language: Language;
    onClose: () => void;
}

interface SheetProps {
    frontContent: string;
    backContent: string;
    sheetIndex: number;
    totalSheets: number;
    turnedSheets: number;
    isPersian: boolean;
}

const Sheet: React.FC<SheetProps> = ({ frontContent, backContent, sheetIndex, totalSheets, turnedSheets, isPersian }) => {
    const isFlipped = sheetIndex < turnedSheets;

    const rotateY = isPersian ? (isFlipped ? 180 : 0) : (isFlipped ? -180 : 0);
    const transformOrigin = isPersian ? 'right' : 'left';
    const zIndex = isFlipped ? sheetIndex + 1 : totalSheets - sheetIndex;

    return (
        <motion.div
            className="absolute w-1/2 h-full top-0"
            style={{
                left: isPersian ? '0' : '50%',
                right: isPersian ? 'auto' : '0',
                transformOrigin: transformOrigin,
                transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY, zIndex }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
            {/* Front of the sheet */}
            <div className="absolute w-full h-full bg-[var(--cream-white)] text-[var(--text-dark)] p-6 sm:p-8 overflow-auto" style={{ backfaceVisibility: 'hidden' }}>
                <div className="prose prose-lg max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: frontContent }} />
                 {/* Spine Shadow Gradient */}
                 <div className="absolute inset-0 pointer-events-none" style={{ background: isPersian ? 'linear-gradient(to left, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 15%)' : 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 15%)' }} />
            </div>
            {/* Back of the sheet */}
            <div className="absolute w-full h-full bg-[var(--cream-white)] text-[var(--text-dark)] p-6 sm:p-8 overflow-auto" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <div className="prose prose-lg max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: backContent }} />
                 {/* Spine Shadow Gradient */}
                 <div className="absolute inset-0 pointer-events-none" style={{ background: isPersian ? 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 15%)' : 'linear-gradient(to left, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 15%)' }} />
            </div>
        </motion.div>
    );
};

const FlipbookView: React.FC<FlipbookViewProps> = ({ story, language, onClose }) => {
    const [pages, setPages] = useState<string[]>([]);
    const [turnedSheets, setTurnedSheets] = useState(0);
    const isPersian = language === 'fa';

    useEffect(() => {
        const words = story.content.split(/\s+/);
        const wordsPerPage = 150;
        const newPages = [];
        if (words.length > 0 && story.content) {
            for (let i = 0; i < words.length; i += wordsPerPage) {
                newPages.push(words.slice(i, i + wordsPerPage).join(' '));
            }
             // Ensure we always have an even number of pages for the spreads
            if (newPages.length % 2 !== 0) {
                newPages.push('');
            }
        } else {
            newPages.push(isPersian ? "صفحه‌ای برای خواندن نیست." : "No content to display.");
            newPages.push('');
        }
        setPages(newPages);
        setTurnedSheets(0);
    }, [story.content, isPersian]);
    
    const sheets = useMemo(() => pages.reduce((acc, pageContent, index) => {
        if (index % 2 === 0) {
            acc.push([pageContent, pages[index + 1] || '']);
        }
        return acc;
    }, [] as string[][]), [pages]);

    const handleNext = () => {
        setTurnedSheets(prev => Math.min(prev + 1, sheets.length));
    };

    const handlePrev = () => {
        setTurnedSheets(prev => Math.max(prev - 1, 0));
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isPersian) {
                if (e.key === 'ArrowLeft') handleNext();
                if (e.key === 'ArrowRight') handlePrev();
            } else {
                if (e.key === 'ArrowRight') handleNext();
                if (e.key === 'ArrowLeft') handlePrev();
            }
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPersian, handleNext, handlePrev, onClose]);

    const leftPageNum = turnedSheets * 2;
    const rightPageNum = turnedSheets * 2 - 1;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-4 font-ui"
            onClick={onClose}
        >
            <div
                className="w-full max-w-5xl h-[85vh] relative drop-shadow-2xl"
                style={{ perspective: '2500px' }}
                onClick={(e) => e.stopPropagation()}
                dir={isPersian ? 'rtl' : 'ltr'}
            >
                {/* Book Cover */}
                <div className="absolute inset-0 bg-gray-900/80 border-2 border-gray-700 rounded-lg shadow-2xl flex">
                   <div className="w-1/2 h-full"></div>
                   <div className="w-px h-full bg-black/50"></div> {/* Spine shadow */}
                   <div className="w-1/2 h-full"></div>
                </div>

                {/* Left Static Page */}
                <div className="absolute w-1/2 h-full left-0 top-0 p-2">
                     <div className="w-full h-full bg-[var(--cream-white)] text-[var(--text-dark)] p-6 sm:p-8 overflow-auto shadow-inner rounded-l-md">
                        {turnedSheets > 0 && (
                            <div className="prose prose-lg max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: pages[leftPageNum - 2] }} />
                        )}
                    </div>
                </div>

                {/* Pages Container */}
                <div className="absolute w-full h-full top-0 left-0 p-2">
                     {sheets.map(([frontContent, backContent], index) => (
                        <Sheet
                            key={index}
                            frontContent={frontContent}
                            backContent={backContent}
                            sheetIndex={index}
                            totalSheets={sheets.length}
                            turnedSheets={turnedSheets}
                            isPersian={isPersian}
                        />
                    ))}
                </div>
                 <button 
                  onClick={onClose} 
                  className="absolute top-[-35px] right-0 rtl:right-auto rtl:left-0 text-gray-400 hover:text-white z-20"
                  aria-label={isPersian ? "بستن" : "Close"}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="flex justify-center items-center mt-4 w-full max-w-5xl" dir={isPersian ? 'rtl' : 'ltr'}>
                <div className="flex-1 text-left">
                     <button 
                        onClick={isPersian ? handleNext : handlePrev} 
                        disabled={turnedSheets === 0}
                        className="px-6 py-2 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isPersian ? 'بعدی' : 'Previous'}
                    </button>
                </div>
                <span className="text-gray-400 text-lg text-center min-w-[100px]">
                   {turnedSheets === 0 ? (isPersian ? "جلد" : "Cover") : `${leftPageNum - 1} - ${leftPageNum}`} / {pages.length}
                </span>
                 <div className="flex-1 text-right">
                    <button 
                        onClick={isPersian ? handlePrev : handleNext} 
                        disabled={turnedSheets >= sheets.length}
                        className="px-6 py-2 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isPersian ? 'قبلی' : 'Next'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default FlipbookView;