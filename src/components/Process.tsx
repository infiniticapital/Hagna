import { FileText, Search, FileCheck, Factory, Ship, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  const steps = [
    { icon: FileText, text: t('process_step1') },
    { icon: Search, text: t('process_step2') },
    { icon: FileCheck, text: t('process_step3') },
    { icon: Factory, text: t('process_step4') },
    { icon: Ship, text: t('process_step5') },
    { icon: CheckCircle, text: t('process_step6') }
  ];

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('process_title')}
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-6 shadow-lg border-4 border-red-700 mb-4 relative z-10 hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-red-700" />
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-sm font-semibold text-gray-700">{step.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg inline-block">
            <p className="text-lg font-semibold text-gray-800">
              {t('cta_final')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
