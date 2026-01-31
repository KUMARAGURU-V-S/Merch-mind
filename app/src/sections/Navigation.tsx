import { useLanguage } from '@/hooks/useLanguage';
import { Store, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-[#2A2A2A]">
            {t('appName')}
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#2A2A2A]/10 hover:bg-white transition-colors"
          >
            <Globe className="w-4 h-4 text-[#6E6A63]" />
            <span className="font-ui text-sm font-medium text-[#2A2A2A]">
              {language === 'en' ? 'EN / हिंदी' : 'हिंदी / EN'}
            </span>
          </button>

          {/* My Shop Button */}
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#2A2A2A]/20 hover:border-[#0B5D5A] hover:text-[#0B5D5A] transition-colors bg-white/80 backdrop-blur-sm"
          >
            <Store className="w-4 h-4" />
            <span className="font-ui text-sm font-semibold uppercase tracking-wider">
              {t('myShop')}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
