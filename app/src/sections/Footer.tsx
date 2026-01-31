import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Globe, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.3,
          },
        }
      );

      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 45%',
            scrub: 0.3,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-20 pb-0"
      style={{ backgroundColor: '#0B5D5A' }}
    >
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div
          ref={cardRef}
          className="w-full bg-white rounded-[28px] card-shadow p-8 lg:p-12 text-center opacity-0"
        >
          <h2 className="font-display font-bold text-2xl lg:text-4xl text-[#2A2A2A] mb-4">
            {t('startToday')}
          </h2>
          <p className="font-inter text-[#6E6A63] text-lg mb-8 max-w-xl mx-auto">
            {t('noSetup')}
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-6 opacity-0">
            <button 
              onClick={() => navigate('/start')}
              className="btn-primary"
            >
              {t('startNow')}
            </button>
            <button 
              onClick={() => navigate('/demo')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              {t('watchDemo')}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-[#6E6A63]">
            <Shield className="w-4 h-4" />
            <span>{t('dataSafe')}</span>
          </div>
        </div>
      </div>

      <div
        className="w-full py-12 px-4"
        style={{ backgroundColor: '#094A47' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                {t('appName')}
              </h3>
              <p className="font-inter text-white/70 text-sm">
                {t('footerTagline')}
              </p>
            </div>

            <div>
              <h4 className="font-ui font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
                {t('contact')}
              </h4>
              <a
                href="mailto:hello@dukaanai.app"
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-inter">hello@dukaanai.app</span>
              </a>
            </div>

            <div>
              <h4 className="font-ui font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
                {t('languages')}
              </h4>
              <div className="flex items-center gap-2 text-white">
                <Globe className="w-4 h-4" />
                <span className="font-inter">English / हिंदी / தமிழ்</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="font-inter text-white/50 text-sm">
              © 2025 Dukaan AI. {language === 'hi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
