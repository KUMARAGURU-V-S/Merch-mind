import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useInventory } from '@/hooks/useInventory';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Package, ChevronRight } from 'lucide-react';

export function InventoryDetailPage() {
  const { t, language } = useLanguage();
  const { products } = useInventory();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'high' | 'ok'>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = (language === 'hi' ? product.nameHindi : product.name)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || product.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F3EE' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#2A2A2A]/8 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-[#6E6A63] hover:text-[#2A2A2A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter">{language === 'hi' ? 'वापस' : 'Back'}</span>
            </button>
            
            <h1 className="font-display font-bold text-xl text-[#2A2A2A]">
              {t('todaysStock')}
            </h1>

            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'प्रोडक्ट खोजें...' : 'Search products...'}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#2A2A2A]/10 bg-white font-inter focus:outline-none focus:border-[#0B5D5A] transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'ok', 'low', 'high'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-ui font-semibold text-sm whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-[#0B5D5A] text-white'
                  : 'bg-white text-[#6E6A63] hover:bg-[#F6F3EE]'
              }`}
            >
              {f === 'all' 
                ? (language === 'hi' ? 'सभी' : 'All')
                : f === 'ok' 
                  ? t('ok')
                  : f === 'low'
                    ? t('low')
                    : t('high')}
            </button>
          ))}
        </div>

        {/* Product List */}
        <div className="bg-white rounded-2xl card-shadow overflow-hidden">
          <div className="p-4 border-b border-[#2A2A2A]/8">
            <p className="font-inter text-sm text-[#6E6A63]">
              {filteredProducts.length} {language === 'hi' ? 'प्रोडक्ट' : 'products'}
            </p>
          </div>
          
          <div className="divide-y divide-[#2A2A2A]/5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 hover:bg-[#F6F3EE]/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F6F3EE] flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#6E6A63]" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-[#2A2A2A]">
                      {language === 'hi' ? product.nameHindi : product.name}
                    </p>
                    <p className="font-inter text-sm text-[#6E6A63]">
                      {language === 'hi' ? 'बिक्री गति' : 'Sales velocity'}: {' '}
                      {product.salesVelocity === 'fast' 
                        ? (language === 'hi' ? 'तेज़' : 'Fast')
                        : product.salesVelocity === 'slow'
                          ? (language === 'hi' ? 'धीमा' : 'Slow')
                          : (language === 'hi' ? 'सामान्य' : 'Normal')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-display font-semibold text-lg text-[#2A2A2A]">
                      {product.stock} {product.unit}
                    </p>
                    <p className="font-inter text-xs text-[#6E6A63]">
                      {product.daysOfStock} {language === 'hi' ? 'दिन बचे' : 'days left'}
                    </p>
                  </div>
                  <span className={`status-badge ${
                    product.status === 'ok' ? 'status-ok' : 
                    product.status === 'low' ? 'status-low' : 'status-high'
                  }`}>
                    {product.status === 'ok' ? t('ok') : product.status === 'low' ? t('low') : t('high')}
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#6E6A63]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
            <p className="font-inter text-[#6E6A63]">
              {language === 'hi' ? 'कोई प्रोडक्ट नहीं मिला' : 'No products found'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
