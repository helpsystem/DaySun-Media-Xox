import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../App';
import type { Story } from './StoryDetailPage';
import StorySubmissionForm from './StorySubmissionForm';

interface ContentProps {
    language: Language;
    onSelectStory: (story: Story) => void;
    currentView: string;
}

export const storiesData = {
    en: [
        {
            id: 1, category: "Art & Culture", title: "Nasser Ovissi: The Painter of Two Worlds",
            excerpt: "A poetic journey from Tehran to Paris, painting the bridge between cultures.",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1948&auto=format&fit=crop",
            author: "By Kianna Rahimi", date: "Dec 1, 2023",
            content: "Nasser Ovissi's canvases are a vibrant dialogue between Persian mythology and European modernism. His iconic horses, rendered in bold strokes and shimmering gold leaf, are not mere animals but symbols of freedom, passion, and a heritage that gallops across continents. This retrospective explores Ovissi's life, from his formative years in Tehran to his evolution as a celebrated artist in Paris, revealing how he masterfully wove the threads of two worlds into a singular, breathtaking tapestry."
        },
        {
            id: 2, category: "Human Experience", title: "Turning Toward the Light",
            excerpt: "A refugee family discovers hope through art therapy in Maryland.",
            image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2070&auto=format&fit=crop",
            author: "By Sarah Jenkins", date: "Nov 22, 2023",
            content: "For the Alami family, the colors of their new life in Maryland were muted by the trauma of displacement. But inside a small community center, they found a new language: paint. Through an innovative art therapy program, they began to process their journey, transforming silent pain into powerful imagery. This is a story about the profound healing power of creativity and how a single brushstroke can be a lifeline back to hope."
        },
        {
            id: 3, category: "Business", title: "From Silicon Valley to Sunset Boulevard",
            excerpt: "An Iranian-American creator shaping media across continents.",
            image: "https://images.unsplash.com/photo-1634952902062-DE30f95e5a9b?q=80&w=1974&auto=format&fit=crop",
            author: "By David Chen", date: "Nov 15, 2023",
            content: "Mana Rostami started with a simple idea: to build a platform that told the stories she never saw growing up. Today, her media-tech company bridges the gap between the innovation of Silicon Valley and the creative engine of Hollywood. We trace her journey from a young coder to a media mogul, exploring how her dual heritage became her greatest asset in building a global brand that champions diverse narratives."
        },
        {
            id: 4, category: "Lifestyle", title: "Persian Kitchens, Global Hearts",
            excerpt: "How food keeps memory alive across generations.",
            image: "https://images.unsplash.com/photo-1629583751882-35434f59c4a8?q=80&w=1964&auto=format&fit=crop",
            author: "By Yasmin Khan", date: "Nov 8, 2023",
            content: "For the diaspora, a recipe is more than a list of ingredients; it's a map back home. In kitchens from Los Angeles to London, the scent of saffron, cardamom, and simmering ghormeh sabzi connects generations. This piece delves into the culinary traditions that Persian families carry with them, exploring how food becomes a vessel for memory, identity, and love in a world far from its origins."
        },
        {
            id: 5, category: "Art & Culture", title: "Songs of Exile",
            excerpt: "Young musicians in LA reviving Persian music with modern sound.",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
            author: "By Amir Rezai", date: "Oct 30, 2023",
            content: "In the vibrant music scene of Los Angeles, a new sound is emerging. A generation of Iranian-American musicians is taking the soulful melodies of their heritage and fusing them with electronic beats, jazz improvisations, and indie rock. 'Songs of Exile' follows three groundbreaking bands as they navigate their dual identities, creating a soundtrack for a generation that belongs to both everywhere and nowhere."
        },
        {
            id: 6, category: "Human Experience", title: "Home Beyond Borders",
            excerpt: "Stories of belonging, migration, and rediscovery.",
            image: "https://images.unsplash.com/photo-1484627147134-2_a92a2a793d?q=80&w=2070&auto=format&fit=crop",
            author: "By Multiple Contributors", date: "Oct 21, 2023",
            content: "What does it mean to be 'from' somewhere? This collection of personal essays explores the complex tapestry of identity for those who have built lives across multiple borders. From the feeling of being a tourist in your own birthplace to finding family in unexpected places, these stories challenge our conventional notions of home and belonging, revealing that 'home' is not just a place, but a feeling we build within ourselves."
        },
        {
            id: 7, category: "Lifestyle", title: "The Weight of Identity",
            excerpt: "Exploring freedom, family, and faith in diaspora life.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
            author: "By Dr. Neda Kazemi", date: "Oct 14, 2023",
            content: "Navigating the expectations of family, the traditions of a rich heritage, and the freedoms of a new society is a delicate balancing act. This thoughtful analysis delves into the psychological and social dynamics of diaspora life, examining how individuals reconcile conflicting values to forge a unique and authentic sense of self. It’s a profound look at the challenges and triumphs of living in the 'in-between'."
        },
        {
            id: 8, category: "Business", title: "Startup Dreams from Tehran to Toronto",
            excerpt: "Entrepreneurship born from resilience and vision.",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop",
            author: "By Mark O'Connell", date: "Oct 5, 2023",
            content: "The journey of an entrepreneur is always challenging, but for those who start in one country and build in another, it requires a unique brand of resilience. We profile three Iranian-Canadian founders who have turned the challenges of immigration into a competitive advantage, launching successful tech startups in Toronto's booming ecosystem. Their stories are a testament to the power of a global perspective and unwavering determination."
        },
        {
            id: 9, category: "Art & Culture", title: "Threads of Heritage",
            excerpt: "Persian artisans weaving stories into fabric and memory.",
            image: "https://images.unsplash.com/photo-1561572258-2a9a4e332a6c?q=80&w=1974&auto=format&fit=crop",
            author: "By Layla Ansari", date: "Sep 28, 2023",
            content: "Every Persian carpet tells a story. In its intricate knots and symbolic patterns lie centuries of history, poetry, and artistry. We journey into the world of traditional artisans, from the bustling workshops of Isfahan to contemporary designers in New York who are reinterpreting this ancient craft. 'Threads of Heritage' is a celebration of a timeless art form and the master weavers who keep its stories alive."
        },
        {
            id: 10, category: "Human Experience", title: "New Dawn, New Voices",
            excerpt: "The next generation of Iranian-American writers, photographers, and thinkers.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
            author: "By DaySun Editors", date: "Sep 20, 2023",
            content: "Who will tell the stories of tomorrow? Meet the rising stars of the Iranian-American community. This feature introduces a new wave of creators—poets, filmmakers, journalists, and activists—who are shaping the cultural conversation. They are bold, innovative, and unafraid to tackle complex issues, offering fresh perspectives on what it means to be bicultural in the 21st century."
        }
    ],
    fa: [
        {
            id: 1, category: "هنر و فرهنگ", title: "ناصر اویسی: نقاش دو جهان",
            excerpt: "سفری شاعرانه از تهران تا پاریس، نقاشی پلی میان فرهنگ‌ها.",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1948&auto=format&fit=crop",
            author: "نوشته کیانا رحیمی", date: "۱۰ آذر ۱۴۰۲",
            content: "بوم‌های ناصر اویسی گفتگویی پر جنب و جوش بین اساطیر ایرانی و مدرنیسم اروپایی است. اسب‌های نمادین او که با ضربات قلم جسورانه و ورقه‌های طلای درخشان ترسیم شده‌اند، صرفاً حیوان نیستند، بلکه نمادهایی از آزادی، شور و میراثی هستند که در سراسر قاره‌ها می‌تازد. این مرور گذشته، زندگی اویسی را از سال‌های شکل‌گیری او در تهران تا تکامل او به عنوان یک هنرمند مشهور در پاریس بررسی می‌کند و نشان می‌دهد که چگونه او استادانه نخ‌های دو جهان را در یک гобелен خیره‌کننده و منحصربه‌فرد بافته است."
        },
        {
            id: 2, category: "تجربه انسانی", title: "روی به سوی نور",
            excerpt: "خانواده‌ای پناهنده از طریق هنر درمانی در مریلند امید را کشف می‌کنند.",
            image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2070&auto=format&fit=crop",
            author: "نوشته سارا جنکینز", date: "۱ آذر ۱۴۰۲",
            content: "برای خانواده عالمی، رنگ‌های زندگی جدیدشان در مریلند با آسیب‌های ناشی از آوارگی کم‌رنگ شده بود. اما در داخل یک مرکز اجتماعی کوچک، آنها زبان جدیدی پیدا کردند: رنگ. از طریق یک برنامه هنر درمانی نوآورانه، آنها شروع به پردازش سفر خود کردند و درد خاموش را به تصاویری قدرتمند تبدیل کردند. این داستانی است درباره قدرت شفابخش عمیق خلاقیت و اینکه چگونه یک ضربه قلم مو می‌تواند راه نجاتی به سوی امید باشد."
        },
        {
            id: 3, category: "کسب و کار", title: "از سیلیکون ولی تا بلوار سانست",
            excerpt: "یک خالق ایرانی-آمریکایی که رسانه‌ها را در سراسر قاره‌ها شکل می‌دهد.",
            image: "https://images.unsplash.com/photo-1634952902062-DE30f95e5a9b?q=80&w=1974&auto=format&fit=crop",
            author: "نوشته دیوید چن", date: "۲۴ آبان ۱۴۰۲",
            content: "مانا رستمی با یک ایده ساده شروع کرد: ساختن پلتفرمی که داستان‌هایی را که هرگز در دوران کودکی‌اش ندیده بود، روایت کند. امروز، شرکت رسانه‌ای-فناوری او پلی بین نوآوری سیلیکون ولی و موتور خلاق هالیوود ایجاد کرده است. ما سفر او را از یک کدنویس جوان تا یک غول رسانه‌ای دنبال می‌کنیم و بررسی می‌کنیم که چگونه میراث دوگانه‌اش به بزرگترین دارایی او در ساختن یک برند جهانی تبدیل شد که از روایت‌های متنوع حمایت می‌کند."
        },
        {
            id: 4, category: "سبک زندگی", title: "آشپزخانه‌های ایرانی، قلب‌های جهانی",
            excerpt: "چگونه غذا خاطره را در میان نسل‌ها زنده نگه می‌دارد.",
            image: "https://images.unsplash.com/photo-1629583751882-35434f59c4a8?q=80&w=1964&auto=format&fit=crop",
            author: "نوشته یاسمین خان", date: "۱۷ آبان ۱۴۰۲",
            content: "برای دیاسپورا، یک دستور غذا چیزی فراتر از لیستی از مواد تشکیل‌دهنده است؛ این یک نقشه برای بازگشت به خانه است. در آشپزخانه‌هایی از لس‌آنجلس تا لندن، عطر زعفران، هل و قورمه‌سبزی در حال جوشیدن، نسل‌ها را به هم متصل می‌کند. این قطعه به بررسی سنت‌های آشپزی می‌پردازد که خانواده‌های ایرانی با خود حمل می‌کنند و بررسی می‌کند که چگونه غذا به ظرفی برای خاطره، هویت و عشق در دنیایی دور از ریشه‌هایش تبدیل می‌شود."
        },
        {
            id: 5, category: "هنر و فرهنگ", title: "ترانه‌های تبعید",
            excerpt: "موسیقی‌دانان جوان در لس‌آنجلس موسیقی ایرانی را با صدایی مدرن احیا می‌کنند.",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
            author: "نوشته امیر رضایی", date: "۸ آبان ۱۴۰۲",
            content: "در صحنه موسیقی پر جنب و جوش لس‌آنجلس، صدای جدیدی در حال ظهور است. نسلی از موسیقی‌دانان ایرانی-آمریکایی ملودی‌های روح‌نواز میراث خود را گرفته و آنها را با بیت‌های الکترونیکی، بداهه‌نوازی‌های جاز و ایندی راک ترکیب می‌کنند. «ترانه‌های تبعید» سه گروه پیشگام را دنبال می‌کند که هویت دوگانه خود را می‌پیمایند و موسیقی متنی برای نسلی خلق می‌کنند که هم به همه‌جا و هم به هیچ‌جا تعلق دارد."
        },
        {
            id: 6, category: "تجربه انسانی", title: "خانه فرای مرزها",
            excerpt: "داستان‌هایی از تعلق، مهاجرت و بازکشف.",
            image: "https://images.unsplash.com/photo-1484627147134-2_a92a2a793d?q=80&w=2070&auto=format&fit=crop",
            author: "مشارکت‌کنندگان متعدد", date: "۲۹ مهر ۱۴۰۲",
            content: "«اهل» جایی بودن به چه معناست؟ این مجموعه از مقالات شخصی، بافت پیچیده هویت را برای کسانی که زندگی خود را در چندین مرز ساخته‌اند، بررسی می‌کند. از احساس توریست بودن در زادگاه خود تا یافتن خانواده در مکان‌های غیرمنتظره، این داستان‌ها تصورات متعارف ما از خانه و تعلق را به چالش می‌کشند و نشان می‌ده دهند که «خانه» فقط یک مکان نیست، بلکه احساسی است که ما در درون خود می‌سازیم."
        },
        {
            id: 7, category: "سبک زندگی", title: "سنگینی هویت",
            excerpt: "کاوش در آزادی، خانواده و ایمان در زندگی دیاسپورا.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
            author: "نوشته دکتر ندا کاظمی", date: "۲۲ مهر ۱۴۰۲",
            content: "پیمودن انتظارات خانواده، سنت‌های یک میراث غنی و آزادی‌های یک جامعه جدید، یک عمل موازنه ظریف است. این تحلیل متفکرانه به بررسی پویایی‌های روانی و اجتماعی زندگی دیاسپora می‌پردازد و بررسی می‌کند که چگونه افراد ارزش‌های متضاد را برای ایجاد یک حس منحصربه‌فرد و معتبر از خود آشتی می‌دهند. این نگاهی عمیق به چالش‌ها و پیروزی‌های زندگی در «بینابین» است."
        },
        {
            id: 8, category: "کسب و کار", title: "رویاهای استارتاپی از تهران تا تورنتو",
            excerpt: "کارآفرینی متولد شده از تاب‌آوری و چشم‌انداز.",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop",
            author: "نوشته مارک اوکانل", date: "۱۳ مهر ۱۴۰۲",
            content: "سفر یک کارآفرین همیشه چالش‌برانگیز است، اما برای کسانی که در یک کشور شروع می‌کنند و در کشور دیگری می‌سازند، به نوعی منحصربه‌فرد از تاب‌آوری نیاز دارد. ما سه بنیان‌گذار ایرانی-کانادایی را معرفی می‌کنیم که چالش‌های مهاجرت را به یک مزیت رقابتی تبدیل کرده‌اند و استارتاپ‌های فناوری موفقی را در اکوسیستم پررونق تورنتو راه‌اندازی کرده‌اند. داستان‌های آنها گواهی بر قدرت یک دیدگاه جهانی و عزم تزلزل‌ناپذیر است."
        },
        {
            id: 9, category: "هنر و فرهنگ", title: "نخ‌های میراث",
            excerpt: "صنعتگران ایرانی که داستان‌ها را در پارچه و خاطره می‌بافند.",
            image: "https://images.unsplash.com/photo-1561572258-2a9a4e332a6c?q=80&w=1974&auto=format&fit=crop",
            author: "نوشته لیلا انصاری", date: "۶ مهر ۱۴۰۲",
            content: "هر فرش ایرانی داستانی را روایت می‌کند. در گره‌های پیچیده و الگوهای نمادین آن، قرن‌ها تاریخ، شعر و هنر نهفته است. ما به دنیای صنعتگران سنتی سفر می‌کنیم، از کارگاه‌های شلوغ اصفهان تا طراحان معاصر در نیویورک که این هنر باستانی را بازتفسیر می‌کنند. «نخ‌های میراт» جشنی از یک هنر جاودانه و بافندگان ماهری است که داستان‌های آن را زنده نگه می‌دارند."
        },
        {
            id: 10, category: "تجربه انسانی", title: "سپیده‌دمی نو، صداهایی نو",
            excerpt: "نسل بعدی نویسندگان، عکاسان و متفکران ایرانی-آمریکایی.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
            author: "دبیران دی‌سان", date: "۲۹ شهریور ۱۴۰۲",
            content: "چه کسی داستان‌های فردا را روایت خواهد کرد؟ با ستارگان در حال ظهور جامعه ایرانی-آمریکایی آشنا شوید. این ویژه‌نامه موج جدیدی از خالقان - شاعران، فیلم‌سازان، روزنامه‌نگاران و فعالان - را معرفی می‌کند که در حال شکل دادن به گفتگوی فرهنگی هستند. آنها جسور، نوآور و بی‌باک در پرداختن به مسائل پیچیده هستند و دیدگاه‌های تازه‌ای درباره معنای دو فرهنگی بودن در قرن بیست و یکم ارائه می‌دهند."
        }
    ]
};


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const StoryCard: React.FC<{ story: Story, onSelectStory: (story: Story) => void, isPersian: boolean }> = ({ story, onSelectStory, isPersian }) => (
    <motion.div
        className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 flex flex-col group"
        variants={itemVariants}
    >
        <div className="overflow-hidden">
            <img src={story.image} alt={story.title} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <p className="text-sm text-brand-gold font-semibold mb-2 font-ui">{story.category}</p>
            <h4 className="text-2xl font-bold text-white mb-3 flex-grow">{story.title}</h4>
            <p className="text-gray-400 mb-4 text-sm">{story.excerpt}</p>
            <button onClick={() => onSelectStory(story)} className="mt-auto text-brand-gold font-semibold hover:text-yellow-300 self-start text-left rtl:text-right font-ui">
                {isPersian ? "ورق بزنید" : "Read More"} &rarr;
            </button>
        </div>
    </motion.div>
);

const CategorySection: React.FC<{ title: string, stories: Story[], onSelectStory: (story: Story) => void, language: Language }> = ({ title, stories, onSelectStory, language }) => (
    <div className="mb-20 last:mb-0">
        <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-brand-gold"
        >
            {title}
        </motion.h3>
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {stories.map((story) => (
                <StoryCard key={story.id} story={story} onSelectStory={onSelectStory} isPersian={language === 'fa'} />
            ))}
        </motion.div>
    </div>
);

const ContentSection: React.FC<ContentProps> = ({ language, onSelectStory, currentView }) => {
    const isPersian = language === 'fa';
    const allStories: Story[] = storiesData[language];

    const storiesByCategory = allStories.reduce((acc, story) => {
        const { category } = story;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(story);
        return acc;
    }, {} as Record<string, Story[]>);

    const categoryOrder = {
      en: ['Art & Culture', 'Human Experience', 'Lifestyle', 'Business'],
      fa: ['هنر و فرهنگ', 'تجربه انسانی', 'سبک زندگی', 'کسب و کار']
    };

    const isHomePage = currentView === 'home';
    
    const noStoriesMessage = {
        en: "No stories found in this category yet.",
        fa: "این صفحه در انتظار قصه‌ی خویش است."
    };

    const renderContent = () => {
        if (currentView === 'Community') {
            return <StorySubmissionForm language={language} />;
        }

        if (isHomePage) {
            return categoryOrder[language].map(categoryName => (
                storiesByCategory[categoryName] && (
                    <CategorySection
                        key={categoryName}
                        title={categoryName}
                        stories={storiesByCategory[categoryName]}
                        onSelectStory={onSelectStory}
                        language={language}
                    />
                )
            ));
        }
        
        const storiesForView = allStories.filter(story => story.category === currentView);
        if (storiesForView.length > 0) {
            return (
                <CategorySection
                    title={currentView}
                    stories={storiesForView}
                    onSelectStory={onSelectStory}
                    language={language}
                />
            );
        }

        return <p className="text-center text-gray-400">{noStoriesMessage[language]}</p>;
    }

    return (
        <section id="stories-section" className="bg-black py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto" dir={isPersian ? 'rtl' : 'ltr'}>
                {renderContent()}
            </div>
        </section>
    );
};

export default ContentSection;