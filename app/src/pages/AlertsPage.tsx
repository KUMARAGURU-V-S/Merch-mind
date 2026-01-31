import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Package, Tag, TrendingUp, Check, Bell } from 'lucide-react';

const alertIcons: Record<string, React.ElementType> = {
  stockout: AlertCircle,
  overstock: Package,
  pricing_loss: Tag,
  fast_mover: TrendingUp,
};

export function AlertsPage() {
  const { t, language } = useLanguage();
  const { alerts } = useInventory();
  const navigate = useNavigate();

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'stockout':
        return 'bg-[#D64A36]/10 text-[#D64A36]';
      case 'overstock':
        return 'bg-[#0B5D5A]/10 text-[#0B5D5A]';
      case 'pricing_loss':
        return 'bg-[#D64A36]/10 text-[#D64A36]';
      case 'fast_mover':
        return 'bg-[#0B5D5A]/10 text-[#0B5D5A]';
      default:
        return 'bg-[#F6F3EE] text-[#6E6A63]';
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'stockout':
        return t('stockout');
      case 'overstock':
        return t('overstock');
      case 'pricing_loss':
        return t('pricingLoss');
      case 'fast_mover':
        return language === 'hi' ? 'तेज़ बिक्री' : 'Fast Mover';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F3EE' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#2A2A2A]/8 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-[#6E6A63] hover:text-[#2A2A2A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter">{language === 'hi' ? 'वापस' : 'Back'}</span>
            </button>
            
            <h1 className="font-display font-bold text-xl text-[#2A2A2A]">
              {t('alerts')}
            </h1>

            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-inter text-[#6E6A63] mb-1">
                {language === 'hi' ? 'कुल अलर्ट' : 'Total Alerts'}
              </p>
              <p className="font-display font-bold text-4xl text-[#2A2A2A]">
                {alerts.length}
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#D64A36]/10 flex items-center justify-center">
              <Bell className="w-8 h-8 text-[#D64A36]" />
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#0B5D5A]/10 rounded-2xl p-4 mb-6">
          <p className="font-inter text-[#2A2A2A] text-center">
            {t('knowBeforeMistake')}
          </p>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alertIcons[alert.type] || AlertCircle;
            return (
              <div
                key={alert.id}
                className="bg-white rounded-2xl p-6 card-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getAlertColor(alert.type)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full font-ui font-semibold text-xs uppercase tracking-wider ${getAlertColor(alert.type)}`}>
                        {getAlertTypeLabel(alert.type)}
                      </span>
                    </div>
                    
                    <p className="font-inter text-[#2A2A2A] text-lg mb-4">
                      {language === 'hi' ? alert.messageHindi : alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button
                        className={`px-4 py-2 rounded-full font-ui font-semibold text-sm transition-colors ${
                          alert.type === 'stockout'
                            ? 'bg-[#D64A36] text-white hover:bg-[#c44331]'
                            : 'bg-[#F6F3EE] text-[#2A2A2A] hover:bg-[#EBE6DE]'
                        }`}
                      >
                        {language === 'hi' ? alert.actionHindi : alert.action}
                      </button>
                      
                      <button className="w-8 h-8 rounded-full bg-[#F6F3EE] flex items-center justify-center hover:bg-[#0B5D5A] hover:text-white transition-colors group">
                        <Check className="w-4 h-4 text-[#6E6A63] group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
            <p className="font-inter text-[#6E6A63]">
              {language === 'hi' ? 'कोई अलर्ट नहीं' : 'No alerts'}
            </p>
            <p className="font-inter text-sm text-[#6E6A63]/70 mt-2">
              {language === 'hi' ? 'सब कुछ ठीक है!' : 'Everything looks good!'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
