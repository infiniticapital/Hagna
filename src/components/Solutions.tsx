import { FileText, Building2, ClipboardCheck, Ship, Package, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Solutions() {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: FileText,
      title: t('solution_rfq_title'),
      description: t('solution_rfq_desc'),
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Building2,
      title: t('solution_audit_title'),
      description: t('solution_audit_desc'),
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: ClipboardCheck,
      title: t('solution_quality_title'),
      description: t('solution_quality_desc'),
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Ship,
      title: t('solution_logistics_title'),
      description: t('solution_logistics_desc'),
      color: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Package,
      title: t('solution_consolidation_title'),
      description: t('solution_consolidation_desc'),
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solutions" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.05),transparent_70%)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-block px-5 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-6 border border-primary-100">
            {t('solutions_label')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {t('solutions_title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('solutions_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-3xl hover:shadow-2xl shadow-lg transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className={`${solution.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                  <solution.icon className={`w-8 h-8 ${solution.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-base">
                  {solution.description}
                </p>
                <button
                  onClick={scrollToContact}
                  className="text-primary-600 font-semibold flex items-center group-hover:gap-2 transition-all hover:text-primary-700"
                >
                  {t('solutions_learn_more')}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 rounded-3xl p-12 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
          <div className="relative text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
              {t('solutions_cta_title')}
            </h3>
            <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('solutions_cta_subtitle')}
            </p>
            <button
              onClick={scrollToContact}
              className="bg-primary-600 text-white px-12 py-5 rounded-full hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-2xl shadow-primary-900/50 inline-flex items-center hover:shadow-primary-900/70"
            >
              {t('solutions_cta_button')}
              <ArrowRight className="ml-3 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
