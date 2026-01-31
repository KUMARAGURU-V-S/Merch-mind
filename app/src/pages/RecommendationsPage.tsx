import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { useSpeech } from '@/hooks/useSpeech';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Timer, TrendingUp, AlertCircle, Calendar, Lightbulb } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  reorder: Timer,
  increase: TrendingUp,
  discount: AlertCircle,
  reduce: Calendar,
};

export function RecommendationsPage() {
  const { t, language } = useLanguage();
  const { recommendations } = useInventory();
  const { speak, stop, isSpeaking } = useSpeech();
  const navigate = useNavigate();

  const handleVoiceAll = () => {
    if (isSpeaking) {
      stop();
    } else {
      const text = recommendations
        .map((r) => (language === 'hi' ? r.messageHindi : r.message))
        .join('. ');
      speak(text, language);
    }
  };

  const handleVoiceSingle = (message: string, messageHindi: string) => {
    speak(language === 'hi' ? messageHindi : message, language);
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
              {t('smartRecommendations')}
            </h1>

            <button
              onClick={handleVoiceAll}
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
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Info Card */}
        <div className="bg-[#0B5D5A]/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B5D5A] flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg text-[#2A2A2A] mb-1">
                {t('understandableAdvice')}
              </h2>
              <p className="font-inter text-[#6E6A63]">
                {t('noCharts')}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const Icon = iconMap[rec.type] || AlertCircle;
            return (
              <div
                key={rec.id}
                className="bg-white rounded-2xl p-6 card-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      rec.priority === 'high'
                        ? 'bg-[#D64A36]/10'
                        : rec.priority === 'medium'
                        ? 'bg-[#0B5D5A]/10'
                        : 'bg-[#F6F3EE]'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        rec.priority === 'high'
                          ? 'text-[#D64A36]'
                          : rec.priority === 'medium'
                          ? 'text-[#0B5D5A]'
                          : 'text-[#6E6A63]'
                      }`}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-inter text-[#2A2A2A] text-lg leading-relaxed mb-3">
                      {language === 'hi' ? rec.messageHindi : rec.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full font-ui font-semibold text-xs uppercase tracking-wider ${
                          rec.priority === 'high'
                            ? 'bg-[#D64A36]/10 text-[#D64A36]'
                            : rec.priority === 'medium'
                            ? 'bg-[#0B5D5A]/10 text-[#0B5D5A]'
                            : 'bg-[#F6F3EE] text-[#6E6A63]'
                        }`}
                      >
                        {rec.priority === 'high'
                          ? (language === 'hi' ? 'ज़रूरी' : 'High Priority')
                          : rec.priority === 'medium'
                          ? (language === 'hi' ? 'मध्यम' : 'Medium')
                          : (language === 'hi' ? 'कम' : 'Low')}
                      </span>
                      
                      <button
                        onClick={() => handleVoiceSingle(rec.message, rec.messageHindi)}
                        className="w-8 h-8 rounded-full bg-[#F6F3EE] flex items-center justify-center hover:bg-[#EBE6DE] transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-[#0B5D5A]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
            <p className="font-inter text-[#6E6A63]">
              {language === 'hi' ? 'अभी कोई सलाह नहीं' : 'No recommendations yet'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
