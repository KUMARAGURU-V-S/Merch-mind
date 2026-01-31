import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { useSpeech } from '@/hooks/useSpeech';
import { useNavigate } from 'react-router-dom';
import { Timer, TrendingUp, AlertCircle, Calendar, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  reorder: Timer,
  increase: TrendingUp,
  discount: AlertCircle,
  reduce: Calendar,
};

export function SmartAdvice() {
  const { t, language } = useLanguage();
  const { recommendations } = useInventory();
  const { speak, stop, isSpeaking } = useSpeech();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);
  const voicePillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        chatCardRef.current,
        { opacity: 0, x: '10vw' },
        { opacity: 1, x: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        leftTextRef.current,
        { opacity: 0, x: '-8vw' },
        { opacity: 1, x: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        voicePillRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        chatCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        leftTextRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        voicePillRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleVoiceClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      const text = recommendations
        .map((r) => (language === 'hi' ? r.messageHindi : r.message))
        .join('. ');
      speak(text, language);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#F6F3EE', zIndex: 31 }}
    >
      <div
        ref={leftTextRef}
        onClick={() => navigate('/recommendations')}
        className="absolute left-[6vw] top-1/2 -translate-y-1/2 w-[min(420px,34vw)] hidden lg:block opacity-0 cursor-pointer"
      >
        <span className="font-ui text-xs uppercase tracking-wider text-[#0B5D5A] mb-3 block">
          {t('smartRecommendations')}
        </span>
        <h3 className="font-display font-bold text-3xl text-[#2A2A2A] mb-4">
          {t('understandableAdvice')}
        </h3>
        <p className="font-inter text-[#6E6A63] leading-relaxed">
          {t('noCharts')}
        </p>
        <p className="font-ui text-sm text-[#0B5D5A] mt-4 hover:underline">
          {language === 'hi' ? 'सभी सलाह देखें →' : 'View all advice →'}
        </p>
      </div>

      <button
        ref={voicePillRef}
        onClick={handleVoiceClick}
        className={`absolute right-[28vw] top-[14vh] px-6 py-2.5 rounded-full font-ui font-semibold text-sm flex items-center gap-2 transition-all z-10 opacity-0 ${
          isSpeaking
            ? 'bg-[#D64A36] text-white'
            : 'bg-[#0B5D5A] text-white hover:bg-[#094A47]'
        }`}
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {isSpeaking ? (language === 'hi' ? 'रोकें' : 'Stop') : t('listen')}
      </button>

      <div
        ref={chatCardRef}
        onClick={() => navigate('/recommendations')}
        className="relative w-[92vw] lg:w-[min(720px,56vw)] h-[min(600px,72vh)] bg-white rounded-[28px] card-shadow overflow-hidden opacity-0 cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="p-6 border-b border-[#2A2A2A]/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0B5D5A] flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">AI</span>
            </div>
            <div>
              <h4 className="font-display font-semibold text-[#2A2A2A]">
                {language === 'hi' ? 'सलाह' : 'Advice'}
              </h4>
              <p className="font-inter text-xs text-[#6E6A63]">
                {language === 'hi' ? 'आपकी दुकान के लिए' : 'For your shop'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100%-100px)]">
          {recommendations.map((rec) => {
            const Icon = iconMap[rec.type] || AlertCircle;
            return (
              <div
                key={rec.id}
                className="chat-bubble flex items-start gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    rec.priority === 'high'
                      ? 'bg-[#D64A36]/10'
                      : rec.priority === 'medium'
                      ? 'bg-[#0B5D5A]/10'
                      : 'bg-[#F6F3EE]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      rec.priority === 'high'
                        ? 'text-[#D64A36]'
                        : rec.priority === 'medium'
                        ? 'text-[#0B5D5A]'
                        : 'text-[#6E6A63]'
                    }`}
                  />
                </div>
                <p className="font-inter text-[#2A2A2A] leading-relaxed">
                  {language === 'hi' ? rec.messageHindi : rec.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
