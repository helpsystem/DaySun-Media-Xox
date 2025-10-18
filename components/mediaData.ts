export interface MediaItem {
    id: number;
    type: 'video' | 'podcast';
    title: string;
    description: string;
    thumbnail: string;
    embedUrl: string;
}

interface MediaData {
    en: MediaItem[];
    fa: MediaItem[];
}

export const mediaData: MediaData = {
    en: [
        {
            id: 1,
            type: 'video',
            title: "Culinary Crossroads: A Taste of Nowruz",
            description: "Join chef Yasmin Khan as she explores the rich culinary traditions of Nowruz, the Persian New Year. A feast for the eyes and the soul.",
            thumbnail: "https://images.unsplash.com/photo-1598511829631-432a46d9e5a8?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 2,
            type: 'podcast',
            title: "Diaspora Dialogues: Identity in the 21st Century",
            description: "A conversation with Dr. Neda Kazemi on navigating cultural identity, family expectations, and personal freedom in the diaspora.",
            thumbnail: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 3,
            type: 'video',
            title: "Architects of the Future: Tehran's Modernist Movement",
            description: "A visual documentary exploring the stunning and often overlooked modernist architecture of Tehran from the 1950s to the 1970s.",
            thumbnail: "https://images.unsplash.com/photo-1593901618428-f2e1763ae389?q=80&w=1974&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 4,
            type: 'podcast',
            title: "The Sound of Home: Music and Memory",
            description: "Musician Amir Rezai discusses how traditional Persian melodies influence his modern compositions and serve as a link to his heritage.",
            thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 5,
            type: 'video',
            title: "Threads of Time: The Art of the Persian Carpet",
            description: "Journey into the intricate world of Persian rug making. Discover the stories, symbols, and craftsmanship woven into every thread.",
            thumbnail: "https://images.unsplash.com/photo-1595344407855-53049187a173?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 6,
            type: 'podcast',
            title: "Startup Spirit: From Tehran to Toronto",
            description: "An interview with Iranian-Canadian tech entrepreneurs on how their cross-cultural experiences have shaped their innovative businesses.",
            thumbnail: "https://images.unsplash.com/photo-1522881193457-31ae8f4a5473?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
    ],
    fa: [
        {
            id: 1,
            type: 'video',
            title: "چهارراه آشپزی: طعم نوروز",
            description: "با سرآشپز یاسمین خان همراه شوید تا سنت‌های غنی آشپزی نوروز، سال نو ایرانی را کشف کنید. ضیافتی برای چشم و روح.",
            thumbnail: "https://images.unsplash.com/photo-1598511829631-432a46d9e5a8?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 2,
            type: 'podcast',
            title: "گفتگوهای دیاسپورا: هویت در قرن بیست و یکم",
            description: "گفتگو با دکتر ندا کاظمی درباره پیمایش هویت فرهنگی، انتظارات خانواده و آزادی فردی در دیاسپورا.",
            thumbnail: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 3,
            type: 'video',
            title: "معماران آینده: جنبش مدرنیستی تهران",
            description: "یک مستند تصویری که به کاوش در معماری مدرنیستی خیره‌کننده و اغلب نادیده گرفته شده تهران از دهه ۱۳۳۰ تا ۱۳۵۰ می‌پردازد.",
            thumbnail: "https://images.unsplash.com/photo-1593901618428-f2e1763ae389?q=80&w=1974&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 4,
            type: 'podcast',
            title: "آوای خانه: موسیقی و خاطره",
            description: "امیر رضایی، موسیقی‌دان، درباره تأثیر ملودی‌های سنتی ایرانی بر ساخته‌های مدرن خود و اینکه چگونه این ملودی‌ها پیوندی با میراث او هستند، صحبت می‌کند.",
            thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 5,
            type: 'video',
            title: "نخ‌های زمان: هنر فرش ایرانی",
            description: "به دنیای پیچیده قالی‌بافی ایرانی سفر کنید. داستان‌ها، نمادها و هنرمندی بافته شده در هر نخ را کشف کنید.",
            thumbnail: "https://images.unsplash.com/photo-1595344407855-53049187a173?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
        {
            id: 6,
            type: 'podcast',
            title: "روح استارتاپی: از تهران تا تورنتو",
            description: "مصاحبه با کارآفرینان فناوری ایرانی-کانادایی درباره اینکه چگونه تجربیات بین فرهنگی آنها کسب‌وکارهای نوآورانه‌شان را شکل داده است.",
            thumbnail: "https://images.unsplash.com/photo-1522881193457-31ae8f4a5473?q=80&w=2070&auto=format&fit=crop",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        },
    ]
};
