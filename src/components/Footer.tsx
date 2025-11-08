import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-900 text-white py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img
              src="/hargna-horizontal1 copy.png"
              alt="Hargna Limited Hong Kong"
              className="h-16 w-auto mb-6"
              loading="lazy"
            />
            <p className="text-gray-400 leading-relaxed text-base">
              {t('hero_subtitle')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('footer_company')}</h3>
            <div className="space-y-4">
              <div className="flex items-start group">
                <MapPin className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-1" />
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  <div className="font-semibold text-white mb-1">{t('footer_location')}</div>
                  <div className="text-sm leading-relaxed">
                    19/F, Tung Lee Comm Building,<br />
                    91-97 Jervois Street, Sheung Wan<br />
                    Hong Kong
                  </div>
                </div>
              </div>
              <div className="flex items-start group">
                <MapPin className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-1" />
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  <div className="font-semibold text-white mb-1">{t('footer_rd')}</div>
                  <div className="text-sm leading-relaxed">Oficina Virtual</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('contact_title')}</h3>
            <div className="space-y-4">
              <div className="flex items-center group">
                <Mail className="w-5 h-5 text-primary-500 mr-3" />
                <a href="mailto:info@hargna.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@hargna.com
                </a>
              </div>
              <div className="flex items-center group">
                <Phone className="w-5 h-5 text-primary-500 mr-3" />
                <a href="https://wa.me/85225211836" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +852-2521-1836
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Hargna Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
