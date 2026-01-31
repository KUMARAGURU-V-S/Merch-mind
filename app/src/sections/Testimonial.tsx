import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Testimonial() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait animation
      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, x: '-8vw', scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.3,
          },
        }
      );

      // Quote card animation
      gsap.fromTo(
        quoteCardRef.current,
        { opacity: 0, x: '10vw', y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );

      // Metric chip animation
      gsap.fromTo(
        metricRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 35%',
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
      className="relative w-full py-20 lg:py-32 px-4"
      style={{ backgroundColor: '#F6F3EE' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
          {/* Portrait card */}
          <div
            ref={portraitRef}
            className="w-full lg:w-[420px] h-[400px] lg:h-[520px] rounded-[28px] overflow-hidden card-shadow opacity-0"
          >
            <img
              src="/retailer_portrait.jpg"
              alt="Retailer testimonial"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quote card */}
          <div
            ref={quoteCardRef}
            className="w-full lg:w-[640px] lg:h-[420px] bg-white rounded-[28px] card-shadow p-8 lg:p-12 lg:absolute lg:left-[34vw] lg:top-8 opacity-0"
          >
            {/* Quote icon */}
            <Quote className="absolute top-8 right-8 w-12 h-12 text-[#0B5D5A] opacity-10" />

            {/* Metric chip */}
            <div
              ref={metricRef}
              className="inline-flex px-4 py-2 rounded-full bg-[#0B5D5A]/10 text-[#0B5D5A] font-ui font-semibold text-sm uppercase tracking-wider mb-6 opacity-0"
            >
              {t('testimonialMetric')}
            </div>

            {/* Quote text */}
            <blockquote className="font-display font-semibold text-xl lg:text-2xl text-[#2A2A2A] leading-relaxed mb-6">
              "{t('testimonialQuote')}"
            </blockquote>

            {/* Attribution */}
            <p className="font-inter text-[#6E6A63] mb-4">
              {t('testimonialName')}
            </p>

            {/* Supporting line */}
            <p className="font-inter text-sm text-[#6E6A63]/70">
              {t('noPOSNeeded')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
