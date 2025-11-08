import { Building2, Sun, Cog, HardHat, Snowflake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Industries() {
  const { t } = useLanguage();

  const industries = [
    { icon: Building2, name: t('industry_metal') },
    { icon: Sun, name: t('industry_solar') },
    { icon: Cog, name: t('industry_machinery') },
    { icon: HardHat, name: t('industry_construction') },
    { icon: Snowflake, name: t('industry_cold') }
  ];

  return (
    <section id="industries" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('industries_title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('industries_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-red-700 to-red-800 p-6 rounded-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 text-white group min-h-[200px] flex flex-col justify-start"
            >
              <industry.icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform flex-shrink-0" />
              <h3 className="text-sm font-semibold leading-snug break-words">
                {industry.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
          >
            {t('cta_catalog')}
          </button>
        </div>
      </div>
    </section>
  );
}
