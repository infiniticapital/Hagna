import { CheckCircle, Target, Users, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const differentiators = [
    t('diff_1'),
    t('diff_2'),
    t('diff_3'),
    t('diff_4')
  ];

  const values = [
    { icon: Target, title: 'Quality', description: 'Commitment to excellence' },
    { icon: Users, title: 'Teamwork', description: 'Collaborative approach' },
    { icon: Award, title: 'Innovation', description: 'Leading solutions' },
    { icon: TrendingUp, title: 'Growth', description: 'Continuous improvement' }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-2xl">
              <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                {t('about_title')}
              </h2>
              <p className="text-2xl text-blue-400 mb-6 font-bold">
                {t('about_subtitle')}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                {t('about_text')}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-8">
                {t('differentiators_title')}
              </h3>
              <ul className="space-y-5">
                {differentiators.map((diff, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-green-50 p-2 rounded-lg mr-4 group-hover:bg-green-100 transition-colors">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed text-lg flex-1">{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center group">
              <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <value.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
