import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppButton() {
  const { language } = useLanguage();

  const messages = {
    es: 'Hola, me gustaría solicitar información sobre sus servicios de importación desde China.',
    en: 'Hello, I would like to request information about your import services from China.',
    zh: '您好，我想了解您从中国进口的服务。'
  };

  const handleClick = () => {
    const phoneNumber = '18098632569';
    const message = encodeURIComponent(messages[language]);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all transform hover:scale-110 z-50 flex items-center gap-3"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-semibold hidden sm:inline">WhatsApp</span>
    </button>
  );
}
