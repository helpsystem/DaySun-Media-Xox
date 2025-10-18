import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../App';

interface StorySubmissionFormProps {
    language: Language;
}

const content = {
    en: {
        title: "Share Your Story",
        subtitle: "Become a part of the DaySun narrative. We welcome stories from all voices.",
        titleLabel: "Story Title",
        titlePlaceholder: "e.g., A Journey Home",
        authorLabel: "Your Name",
        authorPlaceholder: "e.g., Jane Doe",
        contentLabel: "Your Story",
        contentPlaceholder: "Once upon a time...",
        submitButton: "Submit Story",
        submittingButton: "Submitting...",
        successTitle: "Thank You!",
        successMessage: "Your story has been submitted for review. We'll be in touch soon.",
        errorRequired: "This field is required.",
    },
    fa: {
        title: "قصه خود را بسرایید",
        subtitle: "شما هم راوی داستان دی‌سان باشید. ما به هر صدایی گوش می‌سپاریم.",
        titleLabel: "عنوان قصه",
        titlePlaceholder: "نمونه: سفری به خانه",
        authorLabel: "نام راوی",
        authorPlaceholder: "نمونه: سارا رضایی",
        contentLabel: "قصه شما",
        contentPlaceholder: "روزی روزگاری...",
        submitButton: "ارسال قصه",
        submittingButton: "در حال ارسال...",
        successTitle: "سپاسگزاریم!",
        successMessage: "قصه‌ی شما به دست ما رسید. پس از بازبینی با شما در تماس خواهیم بود.",
        errorRequired: "پر کردن این بخش ضروری است.",
    }
};

type FormStatus = 'idle' | 'submitting' | 'success';

const StorySubmissionForm: React.FC<StorySubmissionFormProps> = ({ language }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [storyContent, setStoryContent] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<FormStatus>('idle');

    const t = content[language];
    const isPersian = language === 'fa';

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!title.trim()) newErrors.title = t.errorRequired;
        if (!author.trim()) newErrors.author = t.errorRequired;
        if (!storyContent.trim()) newErrors.storyContent = t.errorRequired;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setTitle('');
            setAuthor('');
            setStoryContent('');
        }, 1500);
    };
    
    const formVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    }

    return (
        <motion.div 
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={formVariant}
            key="submission-form"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-gold">{t.title}</h2>
                <p className="text-gray-400 mt-2">{t.subtitle}</p>
            </div>
            
            <AnimatePresence mode="wait">
            {status === 'success' ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gray-800 border border-green-500/50 p-8 rounded-lg text-center"
                >
                    <h3 className="text-2xl font-bold text-green-400">{t.successTitle}</h3>
                    <p className="text-gray-300 mt-2">{t.successMessage}</p>
                     <button 
                        onClick={() => setStatus('idle')}
                        className="mt-6 bg-brand-gold text-black font-bold py-2 px-6 rounded-full hover:bg-brand-gold-dark transition-colors duration-300"
                    >
                        {isPersian ? 'ارسال قصه‌ای دیگر' : 'Submit Another'}
                    </button>
                </motion.div>
            ) : (
                <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">{t.titleLabel}</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t.titlePlaceholder}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
                        />
                        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">{t.authorLabel}</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder={t.authorPlaceholder}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
                        />
                        {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author}</p>}
                    </div>
                    <div>
                        <label htmlFor="storyContent" className="block text-sm font-medium text-gray-300 mb-2">{t.contentLabel}</label>
                        <textarea
                            id="storyContent"
                            rows={12}
                            value={storyContent}
                            onChange={(e) => setStoryContent(e.target.value)}
                            placeholder={t.contentPlaceholder}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
                        />
                         {errors.storyContent && <p className="text-red-400 text-sm mt-1">{errors.storyContent}</p>}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="bg-brand-gold text-black font-bold py-3 px-8 rounded-full hover:bg-brand-gold-dark transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? t.submittingButton : t.submitButton}
                        </button>
                    </div>
                </motion.form>
            )}
            </AnimatePresence>
        </motion.div>
    );
};

export default StorySubmissionForm;