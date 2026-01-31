import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { X, Camera, Loader2, Check } from 'lucide-react';
import type { Bill, BillItem } from '@/types';

interface BillUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simulated AI extraction
const simulateAIExtraction = async (_file: File): Promise<BillItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock extracted items
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

export function BillUploadModal({ isOpen, onClose }: BillUploadModalProps) {
  const { t, language } = useLanguage();
  const { addBill } = useInventory();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedItems, setExtractedItems] = useState<BillItem[] | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
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

    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsProcessing(true);

    // Simulate AI extraction
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
        type: 'purchase',
        date: new Date(),
        items: extractedItems,
        total: extractedItems.reduce((sum, item) => sum + item.price, 0),
      };
      addBill(bill);
      setIsSuccess(true);
      
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  };

  const handleClose = () => {
    setIsDragging(false);
    setIsProcessing(false);
    setExtractedItems(null);
    setPreviewUrl(null);
    setIsSuccess(false);
    onClose();
  };

  const handleRetake = () => {
    setExtractedItems(null);
    setPreviewUrl(null);
    setIsSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-[28px] card-shadow overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]/8">
          <h3 className="font-display font-semibold text-xl text-[#2A2A2A]">
            {t('uploadBill')}
          </h3>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-[#F6F3EE] flex items-center justify-center hover:bg-[#EBE6DE] transition-colors"
          >
            <X className="w-5 h-5 text-[#6E6A63]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!previewUrl && !isSuccess && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#0B5D5A] bg-[#0B5D5A]/5'
                  : 'border-[#2A2A2A]/20 hover:border-[#0B5D5A]/50'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-[#F6F3EE] flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-[#0B5D5A]" />
              </div>
              <p className="font-inter text-[#2A2A2A] mb-2">
                {language === 'hi'
                  ? 'बिल की फोटो खींचें या अपलोड करें'
                  : 'Take or upload a photo of your bill'}
              </p>
              <p className="font-inter text-sm text-[#6E6A63]">
                {language === 'hi'
                  ? 'PNG, JPG upto 10MB'
                  : 'PNG, JPG up to 10MB'}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {previewUrl && !isSuccess && (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Bill preview"
                  className="w-full h-48 object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                      <p className="text-white font-inter text-sm">
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
                <div className="bg-[#F6F3EE] rounded-2xl p-4">
                  <h4 className="font-ui font-semibold text-sm uppercase tracking-wider text-[#6E6A63] mb-3">
                    {language === 'hi' ? 'मिले आइटम' : 'Items Found'}
                  </h4>
                  <div className="space-y-2">
                    {extractedItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-[#2A2A2A]/5 last:border-0"
                      >
                        <span className="font-inter text-[#2A2A2A]">{item.name}</span>
                        <span className="font-inter text-[#6E6A63]">
                          {item.quantity} {item.unit} · ₹{item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {!isProcessing && (
                <div className="flex gap-3">
                  <button
                    onClick={handleRetake}
                    className="flex-1 py-3 rounded-full border-2 border-[#2A2A2A]/20 font-ui font-semibold text-sm uppercase tracking-wider hover:bg-[#F6F3EE] transition-colors"
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
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#0B5D5A] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-display font-semibold text-xl text-[#2A2A2A] mb-2">
                {language === 'hi' ? 'बिल जोड़ा गया!' : 'Bill Added!'}
              </h4>
              <p className="font-inter text-[#6E6A63]">
                {language === 'hi'
                  ? 'आपका स्टॉक अपडेट हो गया है'
                  : 'Your stock has been updated'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
