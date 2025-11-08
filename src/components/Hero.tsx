import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/690e24e52359baba240acd44/690e24e92359baba240ad12e_we%27re-global-logistic-providers-cargo-x-webflow-template.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/85 via-dark-900/75 to-dark-900/40"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-[1.15] tracking-tight max-w-4xl">
            {t('hero_title').includes('Caribe') ? (
              <>
                Puente confiable entre el Caribe y las fábricas China<span className="text-primary-500">.</span>
              </>
            ) : t('hero_title').includes('Caribbean') ? (
              <>
                A trusted bridge between the Caribbean and Chinese factories<span className="text-primary-500">.</span>
              </>
            ) : (
              <>
                加勒比与中国工厂之间的可靠桥梁<span className="text-primary-500">.</span>
              </>
            )}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button
              onClick={scrollToContact}
              className="group bg-primary-600 text-white px-10 py-4 rounded-full hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 font-semibold text-base uppercase tracking-wide shadow-2xl shadow-primary-900/50 flex items-center justify-center hover:shadow-primary-900/70"
            >
              {t('hero_cta_quote')}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToSolutions}
              className="bg-transparent text-white px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-semibold text-base uppercase tracking-wide flex items-center justify-center backdrop-blur-sm"
            >
              {t('hero_cta_services')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
