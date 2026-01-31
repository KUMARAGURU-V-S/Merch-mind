import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { Upload, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const secondaryRef = useRef<HTMLButtonElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        stripRef.current,
        { opacity: 0, rotate: -10, y: 30 },
        { opacity: 1, rotate: -6, y: 0, duration: 0.8 }
      )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          0.1
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.6 },
          0.2
        )
        .fromTo(
          subheadRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6 },
          0.3
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.4
        )
        .fromTo(
          secondaryRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.5
        )
        .fromTo(
          trustRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.6
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 40, scale: 1.03 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7 },
          0.3
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=40%',
          scrub: 0.5,
        },
      });

      scrollTl
        .fromTo(
          cardRef.current,
          { y: 0, scale: 1, opacity: 1 },
          { y: '-18vh', scale: 0.96, opacity: 0.25, ease: 'power2.in' },
          0
        )
        .fromTo(
          [headlineRef.current, subheadRef.current, ctaRef.current, secondaryRef.current],
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0.2, ease: 'power2.in' },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-10 px-4"
      style={{ backgroundColor: '#F6F3EE' }}
    >
      <div
        ref={stripRef}
        className="absolute w-[120%] h-[80vh] -left-[10%] top-[15vh] rounded-3xl opacity-0"
        style={{ backgroundColor: '#EBE6DE' }}
      />

      <div
        ref={cardRef}
        className="relative w-full max-w-5xl min-h-[70vh] bg-white rounded-[28px] card-shadow overflow-hidden flex flex-col lg:flex-row opacity-0"
      >
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <h1
            ref={headlineRef}
            className="font-display font-bold text-3xl lg:text-5xl text-[#2A2A2A] mb-4 opacity-0"
          >
            {t('tagline')}
          </h1>

          <p
            ref={subheadRef}
            className="font-inter text-lg lg:text-xl text-[#6E6A63] mb-8 opacity-0"
          >
            {language === 'hi'
              ? 'फोटो खींचो। AI समझ लेगा। बस।'
              : 'Snap a photo. AI understands. That\'s it.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              ref={ctaRef} 
              onClick={() => navigate('/start')}
              className="btn-primary flex items-center justify-center gap-2 opacity-0"
            >
              <Upload className="w-5 h-5" />
              {t('uploadBill')}
            </button>

            <button
              ref={secondaryRef}
              onClick={() => navigate('/demo')}
              className="flex items-center justify-center gap-2 text-[#0B5D5A] font-ui font-semibold text-sm tracking-wider hover:underline opacity-0"
            >
              <Play className="w-4 h-4" />
              {t('watchDemo')}
            </button>
          </div>

          <p
            ref={trustRef}
            className="text-sm text-[#6E6A63] font-inter opacity-0"
          >
            {t('noPOS')}
          </p>
        </div>

        <div
          ref={imageRef}
          className="lg:w-[45%] h-64 lg:h-auto relative opacity-0"
        >
          <img
            src="/hero_bill_phone.jpg"
            alt="Bill and phone"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
