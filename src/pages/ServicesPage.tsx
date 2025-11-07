import { ArrowRight, ClipboardList, Building2, CheckCircle2, Ship, Package, FileCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: ClipboardList,
      title: t('service_rfq'),
      description: t('service_rfq_short'),
      slug: 'rfq'
    },
    {
      icon: Building2,
      title: t('service_audit'),
      description: t('service_audit_short'),
      slug: 'factory-audit'
    },
    {
      icon: CheckCircle2,
      title: t('service_quality'),
      description: t('service_quality_short'),
      slug: 'quality-control'
    },
    {
      icon: Ship,
      title: t('service_logistics'),
      description: t('service_logistics_short'),
      slug: 'logistics'
    },
    {
      icon: Package,
      title: t('service_consolidation'),
      description: t('service_consolidation_short'),
      slug: 'consolidation'
    },
    {
      icon: FileCheck,
      title: t('service_contracts'),
      description: t('service_contracts_short'),
      slug: 'contracts'
    }
  ];

  return (
    <>
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-5 uppercase tracking-wide">{t('services_page_label')}</div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
                    {t('services_page_title')}<span className="text-primary-600">.</span>
                  </h1>
                </div>
                <div className="flex items-center lg:pt-8">
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {t('services_page_subtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white p-10 rounded-2xl hover:shadow-2xl shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <service.icon className="w-16 h-16 text-gray-800" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-center text-primary-600 font-semibold">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                {t('services_cta_title')}
              </h2>
            </div>
            <div>
              <a
                href="/#contact"
                className="inline-flex items-center bg-white text-gray-900 px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-base shadow-xl"
              >
                {t('services_cta_button')}
                <ArrowRight className="ml-3 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
