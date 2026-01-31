import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Loader2, Check, FileText } from 'lucide-react';
import type { Bill, BillItem } from '@/types';

// Simulated AI extraction
const simulateAIExtraction = async (_file: File): Promise<BillItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items: BillItem[] = [
        { name: 'Aata', quantity: 10, unit: 'kg', price: 450 },
        { name: 'Chawal', quantity: 5, unit: 'kg', price: 350 },
        { name: 'Mustard Oil', quantity: 2, unit: 'L', price: 280 },
        { name: 'Chini', quantity: 5, unit: 'kg', price: 225 },
      ];
      resolve(items);
    }, 2000);
  });
};

export function StartPage() {
  const { t, language } = useLanguage();
  const { addBill } = useInventory();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedItems, setExtractedItems] = useState<BillItem[] | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [billType, setBillType] = useState<'sales' | 'purchase'>('purchase');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(language === 'hi' ? 'कृपया एक छवि फ़ाइल अपलोड करें' : 'Please upload an image file');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsProcessing(true);

    const items = await simulateAIExtraction(file);
    setExtractedItems(items);
    setIsProcessing(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleConfirm = () => {
    if (extractedItems) {
      const bill: Bill = {
        id: `bill-${Date.now()}`,
        type: billType,
        date: new Date(),
        items: extractedItems,
        total: extractedItems.reduce((sum, item) => sum + item.price, 0),
      };
      addBill(bill);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/shop');
      }, 1500);
    }
  };

  const handleRetake = () => {
    setExtractedItems(null);
    setPreviewUrl(null);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F3EE' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#2A2A2A]/8 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#6E6A63] hover:text-[#2A2A2A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter">{language === 'hi' ? 'वापस' : 'Back'}</span>
            </button>
            
            <h1 className="font-display font-bold text-xl text-[#2A2A2A]">
              {t('uploadBill')}
            </h1>

            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {!previewUrl && !isSuccess && (
          <>
            {/* Bill Type Selection */}
            <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
              <h2 className="font-display font-semibold text-lg text-[#2A2A2A] mb-4">
                {language === 'hi' ? 'बिल का प्रकार' : 'Bill Type'}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setBillType('purchase')}
                  className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${
                    billType === 'purchase'
                      ? 'border-[#0B5D5A] bg-[#0B5D5A]/5'
                      : 'border-[#2A2A2A]/10 hover:border-[#2A2A2A]/20'
                  }`}
                >
                  <FileText className={`w-6 h-6 mx-auto mb-2 ${billType === 'purchase' ? 'text-[#0B5D5A]' : 'text-[#6E6A63]'}`} />
                  <p className={`font-inter font-medium ${billType === 'purchase' ? 'text-[#0B5D5A]' : 'text-[#2A2A2A]'}`}>
                    {language === 'hi' ? 'खरीदारी' : 'Purchase'}
                  </p>
                </button>
                <button
                  onClick={() => setBillType('sales')}
                  className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${
                    billType === 'sales'
                      ? 'border-[#0B5D5A] bg-[#0B5D5A]/5'
                      : 'border-[#2A2A2A]/10 hover:border-[#2A2A2A]/20'
                  }`}
                >
                  <FileText className={`w-6 h-6 mx-auto mb-2 ${billType === 'sales' ? 'text-[#0B5D5A]' : 'text-[#6E6A63]'}`} />
                  <p className={`font-inter font-medium ${billType === 'sales' ? 'text-[#0B5D5A]' : 'text-[#2A2A2A]'}`}>
                    {language === 'hi' ? 'बिक्री' : 'Sales'}
                  </p>
                </button>
              </div>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors bg-white ${
                isDragging
                  ? 'border-[#0B5D5A] bg-[#0B5D5A]/5'
                  : 'border-[#2A2A2A]/20 hover:border-[#0B5D5A]/50'
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-[#F6F3EE] flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-[#0B5D5A]" />
              </div>
              <p className="font-display font-semibold text-xl text-[#2A2A2A] mb-2">
                {language === 'hi' ? 'बिल की फोटो खींचें' : 'Take Photo of Bill'}
              </p>
              <p className="font-inter text-[#6E6A63] mb-4">
                {language === 'hi' 
                  ? 'या फोटो खींचने के लिए क्लिक करें' 
                  : 'Or click to take a photo'}
              </p>
              <p className="font-inter text-sm text-[#6E6A63]/70">
                PNG, JPG up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </>
        )}

        {previewUrl && !isSuccess && (
          <div className="space-y-4">
            {/* Preview */}
            <div className="relative rounded-2xl overflow-hidden card-shadow">
              <img
                src={previewUrl}
                alt="Bill preview"
                className="w-full h-64 object-cover"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 text-white animate-spin mx-auto mb-3" />
                    <p className="text-white font-inter">
                      {language === 'hi'
                        ? 'AI बिल पढ़ रहा है...'
                        : 'AI is reading the bill...'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Extracted items */}
            {!isProcessing && extractedItems && (
              <div className="bg-white rounded-2xl p-6 card-shadow">
                <h3 className="font-display font-semibold text-lg text-[#2A2A2A] mb-4">
                  {language === 'hi' ? 'मिले आइटम' : 'Items Found'}
                </h3>
                <div className="space-y-3">
                  {extractedItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-[#2A2A2A]/5 last:border-0"
                    >
                      <span className="font-inter font-medium text-[#2A2A2A]">{item.name}</span>
                      <span className="font-inter text-[#6E6A63]">
                        {item.quantity} {item.unit} · ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#2A2A2A]/10">
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-[#6E6A63]">{language === 'hi' ? 'कुल' : 'Total'}</span>
                    <span className="font-display font-bold text-xl text-[#2A2A2A]">
                      ₹{extractedItems.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            {!isProcessing && (
              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  className="flex-1 py-4 rounded-full border-2 border-[#2A2A2A]/20 font-ui font-semibold text-sm uppercase tracking-wider hover:bg-[#F6F3EE] transition-colors"
                >
                  {language === 'hi' ? 'दोबारा लें' : 'Retake'}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  {language === 'hi' ? 'पुष्टि करें' : 'Confirm'}
                </button>
              </div>
            )}
          </div>
        )}

        {isSuccess && (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-[#0B5D5A] flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-display font-bold text-2xl text-[#2A2A2A] mb-3">
              {language === 'hi' ? 'बिल जोड़ा गया!' : 'Bill Added!'}
            </h3>
            <p className="font-inter text-[#6E6A63] mb-2">
              {language === 'hi'
                ? 'आपका स्टॉक अपडेट हो गया है'
                : 'Your stock has been updated'}
            </p>
            <p className="font-inter text-sm text-[#6E6A63]/70">
              {language === 'hi' ? 'दुकान पर ले जाया जा रहा है...' : 'Taking you to your shop...'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
