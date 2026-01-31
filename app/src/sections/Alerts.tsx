import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Package, Tag, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const alertIcons: Record<string, React.ElementType> = {
  stockout: AlertCircle,
  overstock: Package,
  pricing_loss: Tag,
  fast_mover: TrendingUp,
};

export function Alerts() {
  const { t, language } = useLanguage();
  const { alerts } = useInventory();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLParagraphElement>(null);

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
        cardRef.current,
        { opacity: 0, y: '8vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0
      );
      
      chipsRef.current.forEach((chip, index) => {
        if (chip) {
          scrollTl.fromTo(
            chip,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, ease: 'none' },
            0.05 + index * 0.03
          );
        }
      });
      
      scrollTl.fromTo(
        captionRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1, scale: 1 },
        { y: '12vh', opacity: 0.25, scale: 0.98, ease: 'power2.in' },
        0.7
      );
      
      chipsRef.current.forEach((chip) => {
        if (chip) {
          const randomX = (Math.random() - 0.5) * 8;
          const randomY = (Math.random() - 0.5) * 6;
          scrollTl.fromTo(
            chip,
            { x: 0, y: 0, opacity: 1 },
            { x: `${randomX}vw`, y: `${randomY}vh`, opacity: 0, ease: 'power2.in' },
            0.7
          );
        }
      });
      
      scrollTl.fromTo(
        captionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#F6F3EE', zIndex: 32 }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 opacity-[0.03]"
        style={{
          background: 'linear-gradient(to top, #D64A36 0%, transparent 100%)',
        }}
      />

      <div
        ref={(el) => { chipsRef.current[0] = el; }}
        className="absolute left-[8vw] top-[18vh] signal-chip border-[#D64A36] text-[#D64A36] opacity-0 hidden lg:flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-[#D64A36]" />
        {t('stockout')}
      </div>

      <div
        ref={(el) => { chipsRef.current[1] = el; }}
        className="absolute left-[10vw] top-[72vh] signal-chip border-[#0B5D5A] text-[#0B5D5A] opacity-0 hidden lg:flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-[#0B5D5A]" />
        {t('overstock')}
      </div>

      <div
        ref={(el) => { chipsRef.current[2] = el; }}
        className="absolute right-[8vw] top-1/2 -translate-y-1/2 signal-chip border-[#D64A36] text-[#D64A36] opacity-0 hidden lg:flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-[#D64A36]" />
        {t('pricingLoss')}
      </div>

      <div
        ref={cardRef}
        onClick={() => navigate('/alerts')}
        className="relative w-[90vw] lg:w-[min(920px,70vw)] h-[min(520px,62vh)] bg-white rounded-[28px] card-shadow overflow-hidden opacity-0 cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="p-6 border-b border-[#2A2A2A]/8">
          <h3 className="font-display font-semibold text-xl text-[#2A2A2A]">
            {t('alerts')}
          </h3>
        </div>

        <div className="overflow-y-auto max-h-[calc(100%-80px)]">
          {alerts.map((alert) => {
            const Icon = alertIcons[alert.type] || AlertCircle;
            return (
              <div
                key={alert.id}
                className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]/5 hover:bg-[#F6F3EE]/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      alert.type === 'stockout' || alert.type === 'pricing_loss'
                        ? 'bg-[#D64A36]/10'
                        : 'bg-[#0B5D5A]/10'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        alert.type === 'stockout' || alert.type === 'pricing_loss'
                          ? 'text-[#D64A36]'
                          : 'text-[#0B5D5A]'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-[#2A2A2A]">
                      {language === 'hi' ? alert.messageHindi : alert.message}
                    </p>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-full font-ui font-semibold text-xs uppercase tracking-wider transition-colors ${
                    alert.type === 'stockout'
                      ? 'bg-[#D64A36] text-white hover:bg-[#c44331]'
                      : 'bg-[#F6F3EE] text-[#2A2A2A] hover:bg-[#EBE6DE]'
                  }`}
                >
                  {language === 'hi' ? alert.actionHindi : alert.action}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p
        ref={captionRef}
        onClick={() => navigate('/alerts')}
        className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 font-display font-semibold text-xl lg:text-2xl text-[#2A2A2A] text-center w-[min(560px,80vw)] opacity-0 cursor-pointer hover:text-[#0B5D5A] transition-colors"
      >
        {t('knowBeforeMistake')}
      </p>
    </section>
  );
}
