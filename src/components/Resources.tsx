import { BookOpen, FileText, HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export default function Resources() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const resources = [
    {
      icon: BookOpen,
      title: t('resource_incoterms_title'),
      description: t('resource_incoterms_desc'),
      color: 'text-red-700'
    },
    {
      icon: FileText,
      title: t('resource_inspection_title'),
      description: t('resource_inspection_desc'),
      color: 'text-red-700'
    },
    {
      icon: FileText,
      title: t('resource_freight_title'),
      description: t('resource_freight_desc'),
      color: 'text-red-700'
    }
  ];

  const faqs = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1')
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2')
    },
    {
      question: t('faq_q3'),
      answer: t('faq_a3')
    },
    {
      question: t('faq_q4'),
      answer: t('faq_a4')
    },
    {
      question: t('faq_q5'),
      answer: t('faq_a5')
    }
  ];

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('resources_title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('resources_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-200"
            >
              <div className={`${resource.color} mb-4`}>
                <resource.icon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {resource.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {resource.description}
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-red-700 font-semibold hover:text-red-800 transition-colors"
              >
                {t('resource_download')} →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center mb-8">
            <HelpCircle className="w-8 h-8 text-red-700 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">
              {t('faq_title')}
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
