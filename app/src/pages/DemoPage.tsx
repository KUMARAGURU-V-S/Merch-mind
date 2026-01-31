import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, ScanLine, MessageCircle, Check, Play } from 'lucide-react';

const demoSteps = [
  {
    id: 1,
    icon: Camera,
    image: '/hero_bill_phone.jpg',
  },
  {
    id: 2,
    icon: ScanLine,
    image: '/inventory_phone_preview.jpg',
  },
  {
    id: 3,
    icon: MessageCircle,
    image: '/retailer_portrait.jpg',
  },
];

export function DemoPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: language === 'hi' ? 'बिल की फोटो लें' : 'Snap the Bill',
      desc: language === 'hi' 
        ? 'अपने सेल्स या खरीदारी बिल की साफ़ फोटो खींचें' 
        : 'Take a clear photo of your sales or purchase bill',
    },
    {
      title: language === 'hi' ? 'AI समझेगा' : 'AI Understands',
      desc: language === 'hi'
        ? 'AI स्वचालित रूप से आइटम, मात्रा और कीमत निकालेगा'
        : 'AI automatically extracts items, quantities, and prices',
    },
    {
      title: language === 'hi' ? 'सलाह पाएं' : 'Get Advice',
      desc: language === 'hi'
        ? 'स्मार्ट सलाह प्राप्त करें - क्या खरीदें, क्या नहीं'
        : 'Get smart advice on what to buy and what to avoid',
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlayDemo = () => {
    setIsPlaying(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentStep(0);
      } else {
        setCurrentStep(step);
      }
    }, 2500);
  };

  const CurrentIcon = demoSteps[currentStep].icon;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F3EE' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#2A2A2A]/8 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#6E6A63] hover:text-[#2A2A2A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter">{language === 'hi' ? 'वापस' : 'Back'}</span>
            </button>
            
            <h1 className="font-display font-bold text-xl text-[#2A2A2A]">
              {language === 'hi' ? 'डेमो' : 'Demo'}
            </h1>

            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-[#0B5D5A]' 
                  : index < currentStep 
                    ? 'w-4 bg-[#0B5D5A]/50' 
                    : 'w-4 bg-[#2A2A2A]/10'
              }`}
            />
          ))}
        </div>

        {/* Demo Card */}
        <div className="bg-white rounded-[28px] card-shadow overflow-hidden mb-8">
          {/* Image */}
          <div className="relative h-64 lg:h-80 bg-[#F6F3EE]">
            <img
              src={demoSteps[currentStep].image}
              alt={steps[currentStep].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            {/* Step indicator */}
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <CurrentIcon className="w-6 h-6 text-[#0B5D5A]" />
            </div>

            {/* Play button overlay */}
            {!isPlaying && currentStep === 0 && (
              <button
                onClick={handlePlayDemo}
                className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#0B5D5A] ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h2 className="font-display font-bold text-2xl text-[#2A2A2A] mb-3">
              {steps[currentStep].title}
            </h2>
            <p className="font-inter text-[#6E6A63] text-lg">
              {steps[currentStep].desc}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-ui font-semibold transition-colors ${
              currentStep === 0 
                ? 'text-[#6E6A63]/50 cursor-not-allowed' 
                : 'text-[#2A2A2A] hover:bg-white'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            {language === 'hi' ? 'पीछे' : 'Previous'}
          </button>

          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[#2A2A2A]">
              {currentStep + 1}
            </span>
            <span className="text-[#6E6A63]">/</span>
            <span className="text-[#6E6A63]">{steps.length}</span>
          </div>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => navigate('/start')}
              className="btn-primary flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              {language === 'hi' ? 'शुरू करें' : 'Get Started'}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B5D5A] text-white font-ui font-semibold hover:bg-[#094A47] transition-colors"
            >
              {language === 'hi' ? 'आगे' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="font-inter text-[#6E6A63] mb-4">
            {language === 'hi' 
              ? 'तैयार हैं अपनी दुकान को स्मार्ट बनाने के लिए?' 
              : 'Ready to make your shop smarter?'}
          </p>
          <button 
            onClick={() => navigate('/start')}
            className="btn-primary"
          >
            {t('startNow')}
          </button>
        </div>
      </main>
    </div>
  );
}
