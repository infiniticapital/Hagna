import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone } from 'lucide-react';
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
            <img src="/hargna-horizontal1 copy.png" alt="Hargna Limited" className="h-14 w-auto" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">HARGNA LIMITED</span>
              <span className="text-white text-xs">HONG KONG</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {location.pathname === '/' ? (
              <>
                <button onClick={() => scrollToSection('home')} className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_home')}
                </button>
                <button onClick={() => scrollToSection('solutions')} className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_solutions')}
                </button>
                <button onClick={() => scrollToSection('industries')} className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_industries')}
                </button>
                <button onClick={() => scrollToSection('process')} className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_process')}
                </button>
                <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_about')}
                </button>
                <button onClick={() => scrollToSection('resources')} className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_resources')}
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_home')}
                </Link>
                <Link to="/#solutions" className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_solutions')}
                </Link>
                <Link to="/#industries" className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_industries')}
                </Link>
                <Link to="/#process" className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_process')}
                </Link>
                <Link to="/#about" className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_about')}
                </Link>
                <Link to="/#resources" className="text-white/80 hover:text-white transition-colors font-medium text-base">
                  {t('nav_resources')}
                </Link>
              </>
            )}
            <button
              onClick={() => {
                if (location.pathname === '/') {
                  scrollToSection('contact');
                } else {
                  window.location.href = '/#contact';
                }
              }}
              className="bg-red-600 text-white px-6 py-2.5 rounded-md hover:bg-red-700 transition-all duration-300 font-semibold text-base"
            >
              {t('nav_contact')}
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
              {location.pathname === '/' ? (
                <>
                  <button onClick={() => scrollToSection('home')} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_home')}
                  </button>
                  <button onClick={() => scrollToSection('solutions')} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_solutions')}
                  </button>
                  <button onClick={() => scrollToSection('industries')} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_industries')}
                  </button>
                  <button onClick={() => scrollToSection('process')} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_process')}
                  </button>
                  <button onClick={() => scrollToSection('about')} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_about')}
                  </button>
                  <button onClick={() => scrollToSection('resources')} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_resources')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_home')}
                  </Link>
                  <Link to="/#solutions" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_solutions')}
                  </Link>
                  <Link to="/#industries" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_industries')}
                  </Link>
                  <Link to="/#process" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_process')}
                  </Link>
                  <Link to="/#about" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_about')}
                  </Link>
                  <Link to="/#resources" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors font-medium text-left text-base">
                    {t('nav_resources')}
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  if (location.pathname === '/') {
                    scrollToSection('contact');
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-semibold text-left"
              >
                {t('nav_contact')}
              </button>
              <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
                <Globe className="w-4 h-4 text-white/70" />
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-1 rounded ${language === 'es' ? 'bg-primary-600 text-white' : 'text-white/70'} transition-colors text-sm font-medium`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded ${language === 'en' ? 'bg-primary-600 text-white' : 'text-white/70'} transition-colors text-sm font-medium`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('zh')}
                  className={`px-2 py-1 rounded ${language === 'zh' ? 'bg-primary-600 text-white' : 'text-white/70'} transition-colors text-sm font-medium`}
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
