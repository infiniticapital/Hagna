import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import SEOHead from './components/SEOHead';
import AdminDashboard from './components/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import { LanguageProvider } from './context/LanguageContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function App() {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(window.location.pathname === '/admin');
  }, []);

  if (isAdmin) {
    return (
      <ErrorBoundary>
        <AdminDashboard />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey || ''}>
        <LanguageProvider>
          <GoogleAnalytics />
          <SEOHead />
          <Router>
            <div className="min-h-screen bg-white">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
              </Routes>
              <Footer />
              <WhatsAppButton />
            </div>
          </Router>
        </LanguageProvider>
      </GoogleReCaptchaProvider>
    </ErrorBoundary>
  );
}

export default App;
