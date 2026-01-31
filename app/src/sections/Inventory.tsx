import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function Inventory() {
  const { t, language } = useLanguage();
  const { products } = useInventory();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, y: '10vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        phoneRef.current,
        { opacity: 0, x: '-6vw' },
        { opacity: 1, x: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        textRef.current,
        { opacity: 0, x: '6vw' },
        { opacity: 1, x: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1, scale: 1 },
        { x: '-18vw', opacity: 0.25, scale: 0.98, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        phoneRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return <span className="status-badge status-ok">{t('ok')}</span>;
      case 'low':
        return <span className="status-badge status-low">{t('low')}</span>;
      case 'high':
        return <span className="status-badge status-high">{t('high')}</span>;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#F6F3EE', zIndex: 30 }}
    >
      <div
        className="absolute w-[50vw] h-[50vh] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #0B5D5A 0%, transparent 70%)',
          left: '60vw',
          top: '10vh',
        }}
      />

      <div
        ref={phoneRef}
        className="absolute left-[6vw] top-1/2 -translate-y-1/2 w-44 lg:w-56 h-80 lg:h-[420px] bg-white rounded-[36px] card-shadow overflow-hidden opacity-0 hidden lg:block"
      >
        <img
          src="/inventory_phone_preview.jpg"
          alt="Phone preview"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={cardRef}
        onClick={() => navigate('/inventory')}
        className="relative w-[92vw] lg:w-[min(980px,70vw)] h-[min(640px,78vh)] bg-white rounded-[28px] card-shadow overflow-hidden opacity-0 cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]/8">
          <h3 className="font-display font-semibold text-xl text-[#2A2A2A]">
            {t('todaysStock')}
          </h3>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-[#F6F3EE] flex items-center justify-center hover:bg-[#EBE6DE] transition-colors">
              <Search className="w-5 h-5 text-[#6E6A63]" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6F3EE] text-sm font-ui font-medium text-[#6E6A63]">
              <Filter className="w-4 h-4" />
              {t('allCategories')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 px-6 py-3 bg-[#F6F3EE]/50">
          <span className="font-ui font-semibold text-xs uppercase tracking-wider text-[#6E6A63]">
            {t('item')}
          </span>
          <span className="font-ui font-semibold text-xs uppercase tracking-wider text-[#6E6A63] text-center">
            {t('stock')}
          </span>
          <span className="font-ui font-semibold text-xs uppercase tracking-wider text-[#6E6A63] text-right">
            {t('status')}
          </span>
        </div>

        <div className="overflow-y-auto max-h-[calc(100%-120px)]">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-3 px-6 py-4 border-b border-[#2A2A2A]/5 hover:bg-[#F6F3EE]/30 transition-colors"
            >
              <div>
                <p className="font-inter font-medium text-[#2A2A2A]">
                  {language === 'hi' ? product.nameHindi : product.name}
                </p>
              </div>
              <div className="text-center">
                <span className="font-inter text-[#2A2A2A]">
                  {product.stock} {product.unit}
                </span>
              </div>
              <div className="text-right">{getStatusBadge(product.status)}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={textRef}
        onClick={() => navigate('/inventory')}
        className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-64 hidden lg:block opacity-0 cursor-pointer"
      >
        <span className="font-ui text-xs uppercase tracking-wider text-[#0B5D5A] mb-3 block">
          {t('realTimeInventory')}
        </span>
        <h3 className="font-display font-bold text-2xl text-[#2A2A2A] mb-3">
          {t('everyItem')}
        </h3>
        <p className="font-inter text-[#6E6A63] leading-relaxed">
          {t('autoUpdate')}
        </p>
        <p className="font-ui text-sm text-[#0B5D5A] mt-4 hover:underline">
          {language === 'hi' ? 'पूरी इन्वेंटरी देखें →' : 'View full inventory →'}
        </p>
      </div>
    </section>
  );
}
