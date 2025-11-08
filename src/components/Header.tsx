import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-dark-900/90 backdrop-blur-xl z-50 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/hargna-horizontal.png" alt="Hargna Limited" className="h-10" />
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
            <Link to="/" className={`${location.pathname === '/' ? 'text-white' : 'text-white/80'} hover:text-white transition-colors font-medium text-sm uppercase tracking-wider relative group`}>
              <span>{t('nav_home_label')}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {location.pathname === '/' && (
              <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider relative group">
                <span>{t('nav_about_label')}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
            <Link to="/services" className={`${location.pathname === '/services' ? 'text-white' : 'text-white/80'} hover:text-white transition-colors font-medium text-sm uppercase tracking-wider relative group`}>
              <span>{t('nav_services_label')}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {location.pathname === '/' && (
              <button onClick={() => scrollToSection('industries')} className="text-white/80 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider relative group">
                <span>{t('nav_pages_label')}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
            {location.pathname === '/' && (
              <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider relative group">
                <span>{t('nav_contact_label')}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-all duration-300 font-semibold ml-4 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
            >
              {t('nav_quote_button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-1 ml-4">
            <Globe className="w-4 h-4 text-white/60 mr-2" />
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-2 rounded-lg ${language === 'es' ? 'bg-primary-600 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'} transition-all text-sm font-medium`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-2 rounded-lg ${language === 'en' ? 'bg-primary-600 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'} transition-all text-sm font-medium`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-3 py-2 rounded-lg ${language === 'zh' ? 'bg-primary-600 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'} transition-all text-sm font-medium`}
            >
              中文
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left uppercase text-sm">
                {t('nav_home_label').toUpperCase()}
              </Link>
              {location.pathname === '/' && (
                <button onClick={() => scrollToSection('about')} className="text-white/90 hover:text-white transition-colors font-medium text-left uppercase text-sm">
                  {t('nav_about_label').toUpperCase()}
                </button>
              )}
              <Link to="/services" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left uppercase text-sm">
                {t('nav_services_label').toUpperCase()}
              </Link>
              {location.pathname === '/' && (
                <>
                  <button onClick={() => scrollToSection('industries')} className="text-white/90 hover:text-white transition-colors font-medium text-left uppercase text-sm">
                    {t('nav_pages_label').toUpperCase()}
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-white/90 hover:text-white transition-colors font-medium text-left uppercase text-sm">
                    {t('nav_contact_label').toUpperCase()}
                  </button>
                </>
              )}
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
              >
                {t('nav_quote_button').toUpperCase()}
              </button>
              <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
                <Globe className="w-4 h-4 text-white/70" />
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-1 rounded ${language === 'es' ? 'bg-blue-600 text-white' : 'text-white/70'} transition-colors text-sm font-medium`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'text-white/70'} transition-colors text-sm font-medium`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('zh')}
                  className={`px-2 py-1 rounded ${language === 'zh' ? 'bg-blue-600 text-white' : 'text-white/70'} transition-colors text-sm font-medium`}
                >
                  中文
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
