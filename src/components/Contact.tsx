import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useFormValidation } from '../hooks/useFormValidation';
import { trackEvent } from './GoogleAnalytics';

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { errors, validateField, setFieldError, clearErrors } = useFormValidation();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, required } = e.target;
    const error = validateField(name, value, required);
    setFieldError(name, error);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    clearErrors();

    if (!executeRecaptcha) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);

    const requiredFields = ['company', 'name', 'email', 'phone', 'products'];
    let hasErrors = false;

    requiredFields.forEach(field => {
      const value = formData.get(field) as string;
      const error = validateField(field, value, true);
      if (error) {
        setFieldError(field, error);
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    try {
      const token = await executeRecaptcha('rfq_submission');

      const data = {
        company: formData.get('company') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        products: formData.get('products') as string,
        specifications: formData.get('specifications') as string,
        quantity: formData.get('quantity') as string,
        destination: formData.get('destination') as string,
        incoterm: formData.get('incoterm') as string,
        timeline: formData.get('timeline') as string,
        inspection_required: formData.get('inspection_required') === 'on',
        consolidation_needed: formData.get('consolidation_needed') === 'on',
        translation_needed: formData.get('translation_needed') === 'on',
        additional: formData.get('additional') as string,
        recaptcha_token: token,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('rfq_submissions')
        .insert([data]);

      if (error) throw error;

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        await fetch(`${supabaseUrl}/functions/v1/send-rfq-notification`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }

      trackEvent('rfq_submission', {
        industry: data.products,
        incoterm: data.incoterm,
        destination: data.destination
      });

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
      clearErrors();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
            {t('contact_badge')}
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            {t('contact_title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact_subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_company')} *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${errors.company ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_phone')} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="products" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('form_products')} *
            </label>
            <textarea
              id="products"
              name="products"
              required
              rows={3}
              placeholder={t('form_products_placeholder')}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none ${errors.products ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            ></textarea>
            {errors.products && <p className="text-red-500 text-sm mt-1">{errors.products}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="specifications" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('form_specifications')}
            </label>
            <textarea
              id="specifications"
              name="specifications"
              rows={3}
              placeholder={t('form_specifications_placeholder')}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_quantity')}
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                placeholder={t('form_quantity_placeholder')}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_destination')}
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                placeholder={t('form_destination_placeholder')}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="incoterm" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_incoterm')}
              </label>
              <select
                id="incoterm"
                name="incoterm"
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              >
                <option value="">{t('form_incoterm_select')}</option>
                <option value="EXW">EXW</option>
                <option value="FOB">FOB</option>
                <option value="CIF">CIF</option>
                <option value="DDP">DDP</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form_timeline')}
              </label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                placeholder={t('form_timeline_placeholder')}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t('form_services')}
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inspection_required"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <span className="ml-3 text-gray-700">{t('form_inspection')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="consolidation_needed"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <span className="ml-3 text-gray-700">{t('form_consolidation')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="translation_needed"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <span className="ml-3 text-gray-700">{t('form_translation')}</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="additional" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('form_additional')}
            </label>
            <textarea
              id="additional"
              name="additional"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('form_submitting') : t('form_submit')}
            <Send className="ml-3 w-6 h-6" />
          </button>

          {submitStatus === 'success' && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl flex items-start shadow-lg">
              <div className="bg-green-500 p-2 rounded-full mr-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-green-900 font-semibold text-lg">{t('form_success')}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 rounded-xl flex items-start shadow-lg">
              <div className="bg-red-500 p-2 rounded-full mr-4">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-red-900 font-semibold text-lg">{t('form_error')}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
