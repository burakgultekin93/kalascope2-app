import { useState } from 'react';

type Language = 'tr' | 'en';

interface Translations {
    [key: string]: {
        tr: string;
        en: string;
    };
}

const translations: Translations = {
    // Navbar
    'nav_login': { tr: 'Giriş', en: 'Login' },
    'nav_start_free': { tr: 'Ücretsiz Başla', en: 'Start Free' },

    // Hero
    'hero_title_1': { tr: 'Fotoğrafını Çek.', en: 'Capture Photo.' },
    'hero_title_2': { tr: 'Kalorisini Bil.', en: 'Know the Calories.' },
    'hero_badge': { tr: 'KaloScope v1.0 Yayında', en: 'KaloScope v1.0 Is Live' },
    'hero_desc': {
        tr: 'Yapay zeka ile yediklerini saniyeler içinde analiz et. Dünya mutfağını anlayan asistanınızla can sıkıcı diyet listelerine son.',
        en: 'Analyze what you eat in seconds with AI. End boring diet lists with your assistant who understands world cuisine.'
    },
    'hero_cta': { tr: 'Ücretsiz Başla', en: 'Start for Free' },

    // Trust Badges
    'trust_foods': { tr: '500+ Dünya ve Türk Mutfağı', en: '500+ World & Local Cuisines' },
    'trust_speed': { tr: '3 Saniye Analiz Hızı', en: '3 Second Analysis Speed' },
    'trust_security': { tr: 'Gizli Ücret Yok', en: 'No Hidden Fees' },

    // Features
    'feat_title': { tr: 'Neden KaloScope?', en: 'Why KaloScope?' },
    'feat_desc': { tr: 'Piyasadaki en yetenekli yemek analiz ve kalori takip aracı.', en: 'The most capable food analysis and calorie tracking tool on the market.' },

    'feat_1_title': { tr: 'Fotoğraf Çek, Sonucu Gör', en: 'Snap a Photo, See Results' },
    'feat_1_desc': { tr: 'Sadece tabağının fotoğrafını çek, AI kalorisini çıkarsın.', en: 'Just take a photo of your plate, let AI calculate the calories.' },

    'feat_2_title': { tr: 'Anında Düzelt', en: 'Correct Instantly' },
    'feat_2_desc': { tr: 'Porsiyon yanlış mı? Magic slider ile saniyeler içinde düzelt.', en: 'Portion wrong? Fix it in seconds with the magic slider.' },

    'feat_3_title': { tr: 'Sesle Söyle', en: 'Voice Log' },
    'feat_3_desc': { tr: "Fotoğraf çekemiyorsan 'Yarım lahmacun yedim' demen yeterli.", en: "Can't take a photo? Just say 'I ate half a pizza'." },

    'feat_4_title': { tr: 'Dünya Mutfağı Uzmanı', en: 'World Cuisine Expert' },
    'feat_4_desc': { tr: 'Global mutfaklardan yöresel tatlara, binlerce yemeği tanır.', en: 'Recognizes thousands of dishes, from global cuisines to local flavors.' },

    'feat_5_title': { tr: 'Trendlerini Takip Et', en: 'Track Your Trends' },
    'feat_5_desc': { tr: 'Kilo ve kalori hedeflerini haftalık raporlarla gör.', en: 'See weight and calorie goals with weekly reports.' },

    'feat_6_title': { tr: 'Hedefine Ulaş', en: 'Reach Your Goal' },
    'feat_6_desc': { tr: 'Oyunlaştırma ve seri sistemiyle motivasyonunu yüksek tut.', en: 'Keep motivation high with gamification and streak systems.' },

    // Pricing
    'pricing_title': { tr: 'Şeffaf Fiyatlandırma', en: 'Transparent Pricing' },
    'pricing_desc': { tr: 'Sürpriz yok, gizli ücret yok. Kullanıcı dostu planlar.', en: 'No surprises, no hidden fees. User-friendly plans.' },

    'plan_free_title': { tr: 'Başlangıç', en: 'Starter' },
    'plan_free_price': { tr: 'Ücretsiz', en: 'Free' },
    'plan_free_feat_1': { tr: 'Günde 3 AI Tarama', en: '3 AI Scans per day' },
    'plan_free_cta': { tr: 'Hemen Başla', en: 'Get Started' },

    'plan_pro_price': { tr: '₺149.99 / ay', en: '$14.99 / mo' },
    'plan_pro_promo': { tr: 'Yıllık planda %50 indirimli', en: '50% off with annual plan' },
    'plan_pro_feat_1': { tr: 'Sınırsız AI Tarama', en: 'Unlimited AI Scans' },
    'plan_pro_feat_2': { tr: 'Gelişmiş Makro Analizi', en: 'Advanced Macro Analysis' },
    'plan_pro_feat_3': { tr: 'AI Diyet Asistanı', en: 'AI Diet Assistant' },
    'plan_pro_cta': { tr: '7 Gün Ücretsiz Dene', en: 'Start 7-Day Free Trial' },

    // Footer
    'footer_desc': { tr: 'Dünya mutfağını anlayan akıllı beslenme asistanınız.', en: 'Your smart nutrition assistant who understands world cuisine.' },
    'footer_rights': { tr: 'Tüm hakları saklıdır.', en: 'All rights reserved.' }
};

export const useTranslation = () => {
    const getInitialLang = (): Language => {
        if (typeof window !== 'undefined') {
            const browserLang = navigator.language.split('-')[0];
            return browserLang === 'en' ? 'en' : 'tr';
        }
        return 'tr';
    };

    const [lang, setLang] = useState<Language>(getInitialLang);

    const t = (key: string) => {
        return translations[key]?.[lang] || key;
    };

    return { t, lang, setLang };
};
