import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from '@/hooks/useLanguage';
import { InventoryProvider } from '@/hooks/useInventory';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { HowItWorks } from '@/sections/HowItWorks';
import { Inventory } from '@/sections/Inventory';
import { SmartAdvice } from '@/sections/SmartAdvice';
import { Alerts } from '@/sections/Alerts';
import { Testimonial } from '@/sections/Testimonial';
import { Footer } from '@/sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

interface PinnedRange {
  start: number;
  end: number;
  center: number;
}

function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges: PinnedRange[] = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <LanguageProvider>
      <InventoryProvider>
        <div className="relative">
          <div className="grain-overlay" />
          <Navigation />
          <main className="relative">
            <Hero />
            <HowItWorks />
            <Inventory />
            <SmartAdvice />
            <Alerts />
            <Testimonial />
            <Footer />
          </main>
        </div>
      </InventoryProvider>
    </LanguageProvider>
  );
}

export default App;
