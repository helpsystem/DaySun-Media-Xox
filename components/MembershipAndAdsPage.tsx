import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../App';

const pageContent = {
    en: {
        title: "Join Us & Partner With Us",
        subtitle: "Become a part of our growing community or showcase your brand to a dedicated audience.",
        membershipTab: "Become a Member",
        adsTab: "Advertise",
        membership: {
            title: "Create Your Account",
            subtitle: "Join the DaySun community to engage with stories and storytellers.",
            nameLabel: "Full Name",
            namePlaceholder: "e.g., Alex Doe",
            emailLabel: "Email Address",
            emailPlaceholder: "you@example.com",
            passwordLabel: "Password",
            submit: "Sign Up",
            submitting: "Signing Up...",
            successTitle: "Welcome!",
            successMessage: "Your account has been created. You can now explore member benefits.",
        },
        advertising: {
            title: "Advertise With Us",
            subtitle: "Connect with the Iranian diaspora and global communities through our platform.",
            companyLabel: "Company Name",
            companyPlaceholder: "e.g., Sunrise Innovations",
            contactLabel: "Contact Name",
            contactPlaceholder: "e.g., Jamie Smith",
            emailLabel: "Contact Email",
            emailPlaceholder: "jamie@sunrise.com",
            messageLabel: "Your Message",
            messagePlaceholder: "Tell us about your advertising goals...",
            submit: "Send Inquiry",
            submitting: "Sending...",
            successTitle: "Thank You!",
            successMessage: "Your inquiry has been sent. Our partnership team will contact you shortly.",
        },
        errors: {
            required: "This field is required.",
            email: "Please enter a valid email.",
        },
        tryAgain: "Start Over"
    },
    fa: {
        title: "به ما بپیوندید و با ما همکاری کنید",
        subtitle: "بخشی از جامعه رو به رشد ما باشید یا برند خود را به مخاطبانی هدفمند معرفی کنید.",
        membershipTab: "عضویت",
        adsTab: "تبلیغات",
        membership: {
            title: "حساب کاربری خود را بسازید",
            subtitle: "به جامعه دی‌سان بپیوندید تا با داستان‌ها و راویان در ارتباط باشید.",
            nameLabel: "نام کامل",
            namePlaceholder: "نمونه: سارا رضایی",
            emailLabel: "آدرس ایمیل",
            emailPlaceholder: "you@example.com",
            passwordLabel: "رمز عبور",
            submit: "ثبت نام",
            submitting: "در حال ثبت نام...",
            successTitle: "خوش آمدید!",
            successMessage: "حساب شما با موفقیت ایجاد شد. اکنون می‌توانید از مزایای عضویت بهره‌مند شوید.",
        },
        advertising: {
            title: "تبلیغات در دی‌سان",
            subtitle: "از طریق پلتفرم ما با ایرانیان خارج از کشور و جوامع جهانی ارتباط برقرار کنید.",
            companyLabel: "نام شرکت",
            companyPlaceholder: "نمونه: نوآوران سپیده",
            contactLabel: "نام رابط",
            contactPlaceholder: "نمونه: نیما احمدی",
            emailLabel: "ایمیل رابط",
            emailPlaceholder: "nima@example.com",
            messageLabel: "پیام شما",
            messagePlaceholder: "درباره اهداف تبلیغاتی خود برای ما بنویسید...",
            submit: "ارسال درخواست",
            submitting: "در حال ارسال...",
            successTitle: "سپاسگزاریم!",
            successMessage: "درخواست شما ارسال شد. تیم همکاری‌های ما به زودی با شما تماس خواهد گرفت.",
        },
        errors: {
            required: "پر کردن این بخش ضروری است.",
            email: "لطفاً یک ایمیل معتبر وارد کنید.",
        },
        tryAgain: "شروع مجدد"
    }
};

type FormStatus = 'idle' | 'submitting' | 'success';

const FormInput = ({ id, label, error, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input
            id={id}
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
);

const FormTextarea = ({ id, label, error, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <textarea
            id={id}
            rows={5}
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
);

const SuccessDisplay: React.FC<{title: string, message: string, onReset: () => void, language: Language}> = ({ title, message, onReset, language }) => {
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 border border-green-500/50 p-8 rounded-lg text-center"
        >
            <h3 className="text-2xl font-bold text-green-400">{title}</h3>
            <p className="text-gray-300 mt-2">{message}</p>
             <button 
                onClick={onReset}
                className="mt-6 bg-brand-gold text-black font-bold py-2 px-6 rounded-full hover:bg-brand-gold-dark transition-colors duration-300"
            >
                {pageContent[language].tryAgain}
            </button>
        </motion.div>
    );
};

const MembershipForm: React.FC<{ language: Language }> = ({ language }) => {
    const t = pageContent[language];
    const [status, setStatus] = useState<FormStatus>('idle');
    const [fields, setFields] = useState({ name: '', email: '', password: ''});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!fields.name.trim()) newErrors.name = t.errors.required;
        if (!fields.email.trim()) newErrors.email = t.errors.required;
        else if (!/\S+@\S+\.\S+/.test(fields.email)) newErrors.email = t.errors.email;
        if (!fields.password.trim()) newErrors.password = t.errors.required;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (status === 'success') {
        return <SuccessDisplay title={t.membership.successTitle} message={t.membership.successMessage} onReset={() => setStatus('idle')} language={language} />;
    }

    return (
        <motion.div key="form-membership" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white">{t.membership.title}</h3>
                <p className="text-gray-400 mt-1">{t.membership.subtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput id="name" name="name" label={t.membership.nameLabel} placeholder={t.membership.namePlaceholder} value={fields.name} onChange={handleChange} error={errors.name} />
                <FormInput id="email" name="email" type="email" label={t.membership.emailLabel} placeholder={t.membership.emailPlaceholder} value={fields.email} onChange={handleChange} error={errors.email} />
                <FormInput id="password" name="password" type="password" label={t.membership.passwordLabel} value={fields.password} onChange={handleChange} error={errors.password} />
                <div className="text-center pt-2">
                    <button type="submit" disabled={status === 'submitting'} className="bg-brand-gold text-black font-bold py-3 px-8 rounded-full hover:bg-brand-gold-dark transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {status === 'submitting' ? t.membership.submitting : t.membership.submit}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

const AdvertisingForm: React.FC<{ language: Language }> = ({ language }) => {
    const t = pageContent[language];
    const [status, setStatus] = useState<FormStatus>('idle');
    const [fields, setFields] = useState({ company: '', contact: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!fields.company.trim()) newErrors.company = t.errors.required;
        if (!fields.contact.trim()) newErrors.contact = t.errors.required;
        if (!fields.email.trim()) newErrors.email = t.errors.required;
        else if (!/\S+@\S+\.\S+/.test(fields.email)) newErrors.email = t.errors.email;
        if (!fields.message.trim()) newErrors.message = t.errors.required;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (status === 'success') {
        return <SuccessDisplay title={t.advertising.successTitle} message={t.advertising.successMessage} onReset={() => setStatus('idle')} language={language} />;
    }

    return (
        <motion.div key="form-ads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white">{t.advertising.title}</h3>
                <p className="text-gray-400 mt-1">{t.advertising.subtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput id="company" name="company" label={t.advertising.companyLabel} placeholder={t.advertising.companyPlaceholder} value={fields.company} onChange={handleChange} error={errors.company} />
                <FormInput id="contact" name="contact" label={t.advertising.contactLabel} placeholder={t.advertising.contactPlaceholder} value={fields.contact} onChange={handleChange} error={errors.contact} />
                <FormInput id="email-ads" name="email" type="email" label={t.advertising.emailLabel} placeholder={t.advertising.emailPlaceholder} value={fields.email} onChange={handleChange} error={errors.email} />
                <FormTextarea id="message" name="message" label={t.advertising.messageLabel} placeholder={t.advertising.messagePlaceholder} value={fields.message} onChange={handleChange} error={errors.message} />
                <div className="text-center pt-2">
                    <button type="submit" disabled={status === 'submitting'} className="bg-brand-gold text-black font-bold py-3 px-8 rounded-full hover:bg-brand-gold-dark transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {status === 'submitting' ? t.advertising.submitting : t.advertising.submit}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};


const MembershipAndAdsPage: React.FC<{ language: Language }> = ({ language }) => {
    const [activeTab, setActiveTab] = useState<'membership' | 'ads'>('membership');
    const t = pageContent[language];
    const isPersian = language === 'fa';

    const tabUnderline = {
        en: {
            left: activeTab === 'membership' ? '0%' : '50%',
            right: activeTab === 'membership' ? '50%' : '0%',
        },
        fa: {
            right: activeTab === 'membership' ? '0%' : '50%',
            left: activeTab === 'membership' ? '50%' : '0%',
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
            dir={isPersian ? 'rtl' : 'ltr'}
        >
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-brand-gold">{t.title}</h2>
                    <p className="text-gray-400 mt-2 max-w-xl mx-auto">{t.subtitle}</p>
                </div>

                <div className="relative flex justify-around p-1 bg-gray-800 rounded-full mb-12 font-ui">
                    <button onClick={() => setActiveTab('membership')} className={`w-1/2 z-10 py-2 rounded-full transition-colors ${activeTab === 'membership' ? 'text-black' : 'text-white'}`}>{t.membershipTab}</button>
                    <button onClick={() => setActiveTab('ads')} className={`w-1/2 z-10 py-2 rounded-full transition-colors ${activeTab === 'ads' ? 'text-black' : 'text-white'}`}>{t.adsTab}</button>
                    <motion.div 
                        className="absolute h-full w-1/2 bg-brand-gold rounded-full z-0"
                        layout
                        initial={false}
                        animate={isPersian ? tabUnderline.fa : tabUnderline.en}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {activeTab === 'membership' ? (
                            <MembershipForm key="membership" language={language} />
                        ) : (
                            <AdvertisingForm key="ads" language={language} />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default MembershipAndAdsPage;
