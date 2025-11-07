import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { language } = useLanguage();

  const testimonials = {
    es: [
      {
        name: 'Carlos Rodríguez',
        company: 'Constructor RD',
        role: 'Director de Compras',
        text: 'Hargna nos ayudó a importar estructuras metálicas desde China con total transparencia. La inspección de calidad nos dio confianza y ahorramos 30% vs. proveedores locales.',
        rating: 5,
      },
      {
        name: 'María Fernández',
        company: 'Solar Caribe',
        role: 'CEO',
        text: 'Excelente servicio de sourcing. Consolidaron nuestros pedidos de paneles solares y equipos eléctricos en un solo contenedor. Proceso muy profesional.',
        rating: 5,
      },
      {
        name: 'Juan Pérez',
        company: 'Industrial Supply',
        role: 'Gerente de Operaciones',
        text: 'La gestión de aduanas fue impecable. Conocen perfectamente los requisitos de la DGA y nos evitaron dolores de cabeza. Definitivamente volveremos a trabajar con ellos.',
        rating: 5,
      },
    ],
    en: [
      {
        name: 'Carlos Rodriguez',
        company: 'Constructor RD',
        role: 'Purchasing Director',
        text: 'Hargna helped us import metal structures from China with total transparency. The quality inspection gave us confidence and we saved 30% vs. local suppliers.',
        rating: 5,
      },
      {
        name: 'Maria Fernandez',
        company: 'Solar Caribbean',
        role: 'CEO',
        text: 'Excellent sourcing service. They consolidated our orders of solar panels and electrical equipment into one container. Very professional process.',
        rating: 5,
      },
      {
        name: 'Juan Perez',
        company: 'Industrial Supply',
        role: 'Operations Manager',
        text: 'Customs management was impeccable. They know the DGA requirements perfectly and saved us headaches. We will definitely work with them again.',
        rating: 5,
      },
    ],
    zh: [
      {
        name: 'Carlos Rodriguez',
        company: 'Constructor RD',
        role: '采购总监',
        text: 'Hargna帮助我们从中国进口金属结构，完全透明。质量检验让我们有信心，比本地供应商节省了30%。',
        rating: 5,
      },
      {
        name: 'Maria Fernandez',
        company: 'Solar Caribbean',
        role: 'CEO',
        text: '优秀的采购服务。他们将我们的太阳能电池板和电气设备订单合并到一个集装箱中。非常专业的流程。',
        rating: 5,
      },
      {
        name: 'Juan Perez',
        company: 'Industrial Supply',
        role: '运营经理',
        text: '海关管理无可挑剔。他们完全了解DGA要求，为我们省去了麻烦。我们肯定会再次与他们合作。',
        rating: 5,
      },
    ],
  };

  const currentTestimonials = testimonials[language];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            {language === 'es' ? 'Lo que dicen nuestros clientes' : language === 'en' ? 'What our clients say' : '客户评价'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'es' ? 'Casos reales de empresas que confían en Hargna' : language === 'en' ? 'Real cases from companies that trust Hargna' : '信任Hargna的公司的真实案例'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative"
            >
              <div className="absolute -top-4 -right-4 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-8 h-8 text-white" />
              </div>

              <div className="flex mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                "{testimonial.text}"
              </p>

              <div className="border-t pt-6">
                <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                <p className="text-gray-600 font-medium">{testimonial.role}</p>
                <p className="text-blue-600 font-bold mt-1">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl px-8 py-4 shadow-lg">
            <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">✓</span>
            </div>
            <p className="text-green-900 font-bold text-lg">
              {language === 'es' ? '100% de satisfacción en entregas a tiempo' : language === 'en' ? '100% satisfaction in on-time deliveries' : '100%准时交付满意度'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
