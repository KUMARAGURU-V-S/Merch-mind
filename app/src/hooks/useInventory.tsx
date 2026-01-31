import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product, Recommendation, Alert, Bill, BillItem } from '@/types';
import { mockProducts, mockRecommendations, mockAlerts } from '@/data/mockData';

interface InventoryContextType {
  products: Product[];
  recommendations: Recommendation[];
  alerts: Alert[];
  bills: Bill[];
  addBill: (bill: Bill) => void;
  getProductById: (id: string) => Product | undefined;
  getLowStockProducts: () => Product[];
  getFastMovingProducts: () => Product[];
  getSlowMovingProducts: () => Product[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [recommendations] = useState<Recommendation[]>(mockRecommendations);
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [bills, setBills] = useState<Bill[]>([]);

  const addBill = useCallback((bill: Bill) => {
    setBills(prev => [bill, ...prev]);
    
    // Update product stock based on bill items
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      
      bill.items.forEach((item: BillItem) => {
        const existingProduct = updatedProducts.find(
          p => p.name.toLowerCase() === item.name.toLowerCase() ||
               p.nameHindi === item.name
        );
        
        if (existingProduct) {
          if (bill.type === 'purchase') {
            existingProduct.stock += item.quantity;
          } else {
            existingProduct.stock -= item.quantity;
          }
          existingProduct.lastUpdated = new Date();
          
          // Update status based on stock
          if (existingProduct.stock < 5) {
            existingProduct.status = 'low';
          } else if (existingProduct.stock > 20) {
            existingProduct.status = 'high';
          } else {
            existingProduct.status = 'ok';
          }
        }
      });
      
      return updatedProducts;
    });
  }, []);

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  const getLowStockProducts = useCallback(() => {
    return products.filter(p => p.status === 'low');
  }, [products]);

  const getFastMovingProducts = useCallback(() => {
    return products.filter(p => p.salesVelocity === 'fast');
  }, [products]);

  const getSlowMovingProducts = useCallback(() => {
    return products.filter(p => p.salesVelocity === 'slow');
  }, [products]);

  return (
    <InventoryContext.Provider value={{
      products,
      recommendations,
      alerts,
      bills,
      addBill,
      getProductById,
      getLowStockProducts,
      getFastMovingProducts,
      getSlowMovingProducts,
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
