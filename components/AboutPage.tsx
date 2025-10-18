import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../App';

const pageContent = {
    en: {
        title: "Our Story",
        subtitle: "Bridging Worlds, One Narrative at a Time.",
        missionTitle: "Our Mission",
        missionText: "DaySun Media X was born from a simple yet profound idea: that stories are the threads that weave our worlds together. In an era of division, we aim to build bridges of understanding between the Iranian diaspora, its global neighbors, and the generations yet to come. We provide a bilingual, multimedia platform where authentic voices can be heard, complex identities can be explored, and shared human experiences can be celebrated.",
        visionTitle: "Our Vision",
        visionText: "We envision a world where culture is a conversation, not a monologue. A world where the rich tapestry of Iranian heritage—its art, its history, its innovation—is accessible and appreciated globally. Through compelling stories, insightful discussions, and creative expression, we seek to foster a more connected, empathetic, and culturally curious global community.",
        joinUsTitle: "Join Our Journey",
        joinUsText: "Whether you are a writer, an artist, a business leader, or simply a curious soul, your voice has a home here. We invite you to read, watch, listen, and contribute to this ever-growing collection of stories. Together, let's illuminate the narratives that connect us all.",
    },
    fa: {
        title: "داستان ما",
        subtitle: "هر روایت، پلی است میان جهان‌ها.",
        missionTitle: "مأموریت ما",
        missionText: "دی‌سان مدیا اکس از یک ایده‌ی ساده اما عمیق متولد شد: داستان‌ها نخ‌هایی هستند که جهان‌های ما را به هم می‌بافند. در عصری پر از جدایی، ما به دنبال ساختن پل‌های تفاهم میان ایرانیان سراسر جهان، همسایگان جهانی‌شان و نسل‌های آینده هستیم. ما یک پلتفرم دوزبانه و چندرسانه‌ای فراهم کرده‌ایم که در آن صداهای اصیل شنیده می‌شوند، هویت‌های پیچیده کاویده می‌شوند و تجربیات مشترک انسانی گرامی داشته می‌شوند.",
        visionTitle: "چشم‌انداز ما",
        visionText: "ما جهانی را تصور می‌کنیم که در آن فرهنگ یک گفتگوست، نه یک مونولوگ. جهانی که در آن بافت غنی میراث ایرانی - هنر، تاریخ و نوآوری‌اش - در دسترس و مورد قدردانی جهانیان قرار گیرد. از طریق داستان‌های جذاب، گفتگوهای روشنگرانه و بیان خلاق، ما به دنبال پرورش یک جامعه جهانی متصل‌تر، همدل‌تر و کنجکاوتر از نظر فرهنگی هستیم.",
        joinUsTitle: "به سفر ما بپیوندید",
        joinUsText: "خواه نویسنده باشید، هنرمند، یک رهبر کسب‌وکار یا صرفاً روحی کنجکاو، صدای شما در اینجا خانه‌ای دارد. ما از شما دعوت می‌کنیم تا بخوانید، ببینید، بشنوید و در این مجموعه داستان‌های روزافزون مشارکت کنید. بیایید با هم روایت‌هایی را که همه ما را به هم پیوند می‌دهند، روشن کنیم.",
    }
};

const AboutPage: React.FC<{ language: Language }> = ({ language }) => {
    const t = pageContent[language];
    const isPersian = language === 'fa';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
            dir={isPersian ? 'rtl' : 'ltr'}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-gold my-4">{t.title}</h1>
                    <p className="text-xl text-gray-300">{t.subtitle}</p>
                </motion.div>

                <div className="aspect-w-16 aspect-h-9 my-12 rounded-lg overflow-hidden shadow-lg">
                    <img 
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" 
                        alt="A creative workspace representing DaySun Media X's mission" 
                        className="w-full h-full object-cover" 
                    />
                </div>

                <div className="space-y-12 text-lg text-gray-300 leading-relaxed prose prose-invert prose-lg max-w-none">
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-4">{t.missionTitle}</h2>
                        <p>{t.missionText}</p>
                    </section>
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-4">{t.visionTitle}</h2>
                        <p>{t.visionText}</p>
                    </section>
                     <section className="bg-gray-900 border border-brand-gold/30 p-8 rounded-lg text-center">
                        <h2 className="text-3xl font-bold text-brand-gold mb-4">{t.joinUsTitle}</h2>
                        <p>{t.joinUsText}</p>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutPage;