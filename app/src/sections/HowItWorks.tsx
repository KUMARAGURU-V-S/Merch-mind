import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { Camera, ScanLine, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Camera,
    key: 'step1',
  },
  {
    number: '02',
    icon: ScanLine,
    key: 'step2',
  },
  {
    number: '03',
    icon: MessageCircle,
    key: 'step3',
  },
];

export function HowItWorks() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.3,
          },
        }
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.98 },
            {
              opacity: 1,
              y: index === 1 ? -12 : 0, // Center card slightly elevated
              scale: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'top 45%',
                scrub: 0.3,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-4"
      style={{ backgroundColor: '#F6F3EE' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="font-display font-bold text-3xl lg:text-4xl text-[#2A2A2A] text-center mb-16 opacity-0"
        >
          {t('stepsTitle')}
        </h2>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`bg-white rounded-[28px] p-8 card-shadow opacity-0 ${
                  index === 1 ? 'md:-translate-y-3' : ''
                }`}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#F6F3EE] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#0B5D5A]" />
                </div>

                {/* Number */}
                <span
                  className="font-display font-bold text-6xl lg:text-7xl absolute top-6 right-6 opacity-[0.08]"
                  style={{ color: '#6E6A63' }}
                >
                  {step.number}
                </span>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl text-[#2A2A2A] mb-3">
                  {step.key === 'step1' ? t('step1Title') : step.key === 'step2' ? t('step2Title') : t('step3Title')}
                </h3>
                <p className="font-inter text-[#6E6A63] leading-relaxed">
                  {step.key === 'step1' ? t('step1Desc') : step.key === 'step2' ? t('step2Desc') : t('step3Desc')}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
