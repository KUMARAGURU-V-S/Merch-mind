import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { useSpeech } from '@/hooks/useSpeech';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Volume2, 
  VolumeX,
  Plus,
  Search,
  Home,
  Lightbulb,
  Bell
} from 'lucide-react';

export function ShopPage() {
  const { t, language } = useLanguage();
  const { products, recommendations, alerts, getLowStockProducts } = useInventory();
  const { speak, stop, isSpeaking } = useSpeech();
  const navigate = useNavigate();

  const lowStockCount = getLowStockProducts().length;

  const handleVoiceSummary = () => {
    if (isSpeaking) {
      stop();
    } else {
      const summary = language === 'hi'
        ? `आपकी दुकान में ${products.length} प्रोडक्ट हैं। ${lowStockCount} प्रोडक्ट का स्टॉक कम है। ${alerts.length} अलर्ट हैं।`
        : `Your shop has ${products.length} products. ${lowStockCount} products are low on stock. You have ${alerts.length} alerts.`;
      speak(summary, language);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F3EE' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#2A2A2A]/8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#6E6A63] hover:text-[#2A2A2A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter">{language === 'hi' ? 'वापस' : 'Back'}</span>
            </button>
            
            <h1 className="font-display font-bold text-xl text-[#2A2A2A]">
              {t('myShop')}
            </h1>

            <button
              onClick={handleVoiceSummary}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isSpeaking ? 'bg-[#D64A36] text-white' : 'bg-[#F6F3EE] text-[#0B5D5A]'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => navigate('/inventory')}
            className="bg-white rounded-2xl p-6 card-shadow cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0B5D5A]/10 flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-[#0B5D5A]" />
            </div>
            <p className="font-inter text-sm text-[#6E6A63]">{language === 'hi' ? 'कुल प्रोडक्ट' : 'Total Products'}</p>
            <p className="font-display font-bold text-3xl text-[#2A2A2A]">{products.length}</p>
          </div>

          <div 
            onClick={() => navigate('/alerts')}
            className="bg-white rounded-2xl p-6 card-shadow cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D64A36]/10 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-[#D64A36]" />
            </div>
            <p className="font-inter text-sm text-[#6E6A63]">{language === 'hi' ? 'अलर्ट' : 'Alerts'}</p>
            <p className="font-display font-bold text-3xl text-[#D64A36]">{alerts.length}</p>
          </div>

          <div 
            onClick={() => navigate('/inventory')}
            className="bg-white rounded-2xl p-6 card-shadow cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D64A36]/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-[#D64A36]" />
            </div>
            <p className="font-inter text-sm text-[#6E6A63]">{language === 'hi' ? 'कम स्टॉक' : 'Low Stock'}</p>
            <p className="font-display font-bold text-3xl text-[#2A2A2A]">{lowStockCount}</p>
          </div>

          <div 
            onClick={() => navigate('/recommendations')}
            className="bg-white rounded-2xl p-6 card-shadow cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0B5D5A]/10 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-[#0B5D5A]" />
            </div>
            <p className="font-inter text-sm text-[#6E6A63]">{language === 'hi' ? 'सलाह' : 'Advice'}</p>
            <p className="font-display font-bold text-3xl text-[#2A2A2A]">{recommendations.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
          <h2 className="font-display font-semibold text-lg text-[#2A2A2A] mb-4">
            {language === 'hi' ? 'त्वरित कार्रवाई' : 'Quick Actions'}
          </h2>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/start')}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('uploadBill')}
            </button>
            <button 
              onClick={() => navigate('/inventory')}
              className="btn-secondary flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {t('search')}
            </button>
            <button 
              onClick={() => navigate('/alerts')}
              className="px-4 py-2 rounded-full border border-[#D64A36] text-[#D64A36] font-ui font-semibold text-sm flex items-center gap-2 hover:bg-[#D64A36]/5 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {t('alerts')}
            </button>
          </div>
        </div>

        {/* Recent Inventory */}
        <div className="bg-white rounded-2xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-[#2A2A2A]">
              {t('todaysStock')}
            </h2>
            <button 
              onClick={() => navigate('/inventory')}
              className="text-[#0B5D5A] font-ui font-semibold text-sm hover:underline"
            >
              {language === 'hi' ? 'सभी देखें →' : 'View All →'}
            </button>
          </div>
          
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div 
                key={product.id}
                onClick={() => navigate('/inventory')}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F6F3EE] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F6F3EE] flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#6E6A63]" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-[#2A2A2A]">
                      {language === 'hi' ? product.nameHindi : product.name}
                    </p>
                    <p className="font-inter text-sm text-[#6E6A63]">
                      {product.stock} {product.unit}
                    </p>
                  </div>
                </div>
                <span className={`status-badge ${
                  product.status === 'ok' ? 'status-ok' : 
                  product.status === 'low' ? 'status-low' : 'status-high'
                }`}>
                  {product.status === 'ok' ? t('ok') : product.status === 'low' ? t('low') : t('high')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#2A2A2A]/8 px-4 py-3 z-50">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-[#6E6A63] hover:text-[#0B5D5A] transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-inter">{language === 'hi' ? 'होम' : 'Home'}</span>
          </button>
          <button 
            onClick={() => navigate('/inventory')}
            className="flex flex-col items-center gap-1 text-[#6E6A63] hover:text-[#0B5D5A] transition-colors"
          >
            <Package className="w-5 h-5" />
            <span className="text-xs font-inter">{t('stock')}</span>
          </button>
          <button 
            onClick={() => navigate('/start')}
            className="w-14 h-14 rounded-full bg-[#D64A36] text-white flex items-center justify-center -mt-6 shadow-lg hover:scale-110 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate('/recommendations')}
            className="flex flex-col items-center gap-1 text-[#6E6A63] hover:text-[#0B5D5A] transition-colors"
          >
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs font-inter">{language === 'hi' ? 'सलाह' : 'Advice'}</span>
          </button>
          <button 
            onClick={() => navigate('/alerts')}
            className="flex flex-col items-center gap-1 text-[#6E6A63] hover:text-[#0B5D5A] transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs font-inter">{t('alerts')}</span>
          </button>
        </div>
      </nav>

      {/* Bottom padding for fixed nav */}
      <div className="h-20" />
    </div>
  );
}
