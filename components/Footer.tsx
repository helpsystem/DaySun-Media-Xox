import React from 'react';
import type { Language } from '../App';

const navData = {
    en: { links: ['Culture', 'Lifestyle', 'Community', 'Business', 'Watch/Listen', 'Join Us', 'About'], keyMap: { 'Culture': 'Art & Culture', 'Lifestyle':'Lifestyle', 'Community':'Community', 'Business':'Business', 'Join Us': 'membership', 'Watch/Listen': 'Watch/Listen', 'About': 'About' } },
    fa: { links: ['فرهنگ و هنر', 'رسم زندگی', 'هم‌صدا', 'کار و نوآوری', 'آوا و نما', 'همکاری با ما', 'داستان ما'], keyMap: { 'فرهنگ و هنر': 'هنر و فرهنگ', 'رسم زندگی':'سبک زندگی', 'هم‌صدا': 'Community', 'کار و نوآوری':'کسب و کار', 'آوا و نما': 'Watch/Listen', 'داستان ما': 'About', 'همکاری با ما': 'membership' } }
};

const socialLinks = [
    { name: 'Twitter', href: '#', path: 'M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.15 2.33,6.94C2.33,8.43 3.1,9.75 4.18,10.53C3.46,10.5 2.8,10.32 2.22,10.03C2.22,10.05 2.22,10.07 2.22,10.08C2.22,12.24 3.74,14.05 5.77,14.44C5.42,14.53 5.04,14.58 4.65,14.58C4.37,14.58 4.1,14.56 3.84,14.51C4.42,16.31 6.17,17.55 8.25,17.59C6.73,18.78 4.88,19.49 2.89,19.49C2.55,19.49 2.22,19.47 1.89,19.43C3.99,20.79 6.46,21.5 9.09,21.5C16,21.5 20.34,15.67 20.34,10.5C20.34,10.33 20.34,10.16 20.33,9.99C21.1,9.44 21.85,8.73 22.46,7.89V6Z' },
    { name: 'Instagram', href: '#', path: 'M12,2.163c3.204,0,3.584,0.012,4.85,0.07c3.252,0.148,4.771,1.691,4.919,4.919c0.058,1.265,0.07,1.646,0.07,4.85s-0.012,3.584-0.07,4.85c-0.148,3.227-1.669,4.771-4.919,4.919c-1.266,0.058-1.646,0.07-4.85,0.07s-3.584-0.012-4.85-0.07c-3.252-0.148-4.771-1.691-4.919-4.919c-0.058-1.265-0.07-1.646-0.07-4.85s0.012-3.584,0.07-4.85C2.44,3.93,3.96,2.46,7.15,2.312C8.416,2.251,8.796,2.163,12,2.163 M12,0C8.741,0,8.333,0.014,7.053,0.072C2.695,0.272,0.273,2.69,0.073,7.052C0.014,8.333,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.2,4.358,2.618,6.78,6.98,6.98c1.281,0.058,1.689,0.072,4.948,0.072s3.668-0.014,4.948-0.072c4.354-0.2,6.782-2.618,6.979-6.98c0.058-1.281,0.073-1.689,0.073-4.948s-0.014-3.668-0.072-4.948C21.72,2.69,19.302,0.274,14.948,0.073C13.668,0.014,13.259,0,12,0L12,0z M12,5.838c-3.403,0-6.162,2.759-6.162,6.162s2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162S15.403,5.838,12,5.838 M12,16.2c-2.31,0-4.188-1.878-4.188-4.188s1.878-4.188,4.188-4.188s4.188,1.878,4.188,4.188S14.31,16.2,12,16.2 M16.965,5.595c-0.63,0-1.141,0.51-1.141,1.141s0.51,1.141,1.141,1.141s1.141-0.51,1.141-1.141S17.595,5.595,16.965,5.595' },
    { name: 'YouTube', href: '#', path: 'M21.58,7.19C21.34,6.42 20.78,5.86 20.01,5.62C18.27,5.15 12,5.15 12,5.15S5.73,5.15 3.99,5.62C3.22,5.86 2.66,6.42 2.42,7.19C1.95,8.93 1.95,12 1.95,12S1.95,15.07 2.42,16.81C2.66,17.58 3.22,18.14 3.99,18.38C5.73,18.85 12,18.85 12,18.85S18.27,18.85 20.01,18.38C20.78,18.14 21.34,17.58 21.58,16.81C22.05,15.07 22.05,12 22.05,12S22.05,8.93 21.58,7.19M10,14.65V9.35L15,12L10,14.65Z' }
];

const SocialIcon = ({ name, href, path }: { name: string; href: string; path: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors duration-300">
        <span className="sr-only">{name}</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    </a>
);

interface FooterProps {
    language: Language;
    onNavClick: (view: string) => void;
}

const content = {
    en: {
        description: "A bilingual multimedia platform connecting worlds, one story at a time.",
        quickLinks: "Quick Links",
        connect: "Connect With Us",
        copyright: "© 2024 DaySun Media X. All Rights Reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
    },
    fa: {
        description: "یک پلتفرم چندرسانه‌ای دوزبانه که جهان‌ها را با هر داستان به هم پیوند می‌دهد.",
        quickLinks: "دسترسی سریع",
        connect: "با ما در ارتباط باشید",
        copyright: "© ۲۰۲۴ دی‌سان مدیا اکس. تمامی حقوق محفوظ است.",
        privacy: "سیاست حفظ حریم خصوصی",
        terms: "شرایط خدمات"
    }
};

const Footer: React.FC<FooterProps> = ({ language, onNavClick }) => {
  const t = content[language];
  const currentNav = navData[language];
  const isPersian = language === 'fa';
  
  return (
    <footer className="bg-gray-900/50 text-gray-400 border-t border-gray-800 font-ui" dir={isPersian ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-gold font-['Playfair_Display']">DaySun Media X</h3>
            <p className="text-sm">{t.description}</p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wider uppercase">{t.quickLinks}</h4>
            <nav>
              <ul className="space-y-2">
                {currentNav.links.map(link => {
                   const categoryKey = (currentNav.keyMap as any)[link] || link;
                   return (
                     <li key={link}>
                       <button onClick={() => onNavClick(categoryKey)} className="text-sm hover:text-brand-gold transition-colors duration-300">{link}</button>
                     </li>
                   );
                })}
              </ul>
            </nav>
          </div>
          
          {/* Column 3: Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wider uppercase">{t.connect}</h4>
            <div className="flex justify-center md:justify-start space-x-6">
              {/* Fix: Replaced object spread with explicit props to resolve a TypeScript type error. */}
              {socialLinks.map(({ name, href, path }) => <SocialIcon key={name} name={name} href={href} path={path} />)}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-4 sm:mb-0">{t.copyright}</p>
          <div className="flex space-x-6 rtl:space-x-reverse">
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;