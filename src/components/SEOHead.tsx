import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const seoContent = {
  es: {
    title: 'Hargna Limited | Importación desde China al Caribe',
    description: 'Puente confiable entre el Caribe y las fábricas China. Negociamos, verificamos y entregamos equipos y materiales con costos optimizados y cero sorpresas.',
    keywords: 'importación china, sourcing china, RFQ china, control calidad china, logística china caribe, importación república dominicana, estructuras metálicas china, paneles solares china, maquinaria china',
  },
  en: {
    title: 'Hargna Limited | Import from China to Caribbean',
    description: 'A trusted bridge between the Caribbean and Chinese factories. We negotiate, verify, and deliver certified-quality materials and equipment with optimized costs—no surprises.',
    keywords: 'china import, china sourcing, china RFQ, china quality control, china caribbean logistics, dominican republic import, metal structures china, solar panels china, machinery china',
  },
  zh: {
    title: 'Hargna Limited | 加勒比与中国工厂之间的桥梁',
    description: '加勒比与中国工厂之间的可靠桥梁。我们谈判、验证并交付经过认证的优质材料和设备，成本优化——无意外。',
    keywords: '中国进口, 中国采购, 中国询价, 中国质量控制, 中国加勒比物流, 多米尼加进口, 中国金属结构, 中国太阳能电池板, 中国机械',
  },
};

export default function SEOHead() {
  const { language } = useLanguage();
  const seo = seoContent[language];

  useEffect(() => {
    document.title = seo.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = seo.description;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seo.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = seo.keywords;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = seo.title;
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = seo.description;
      document.head.appendChild(meta);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      const meta = document.createElement('meta');
      meta.name = 'twitter:card';
      meta.content = 'summary_large_image';
      document.head.appendChild(meta);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seo.title);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = seo.title;
      document.head.appendChild(meta);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      meta.content = seo.description;
      document.head.appendChild(meta);
    }

    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', language);

  }, [language, seo]);

  return null;
}
