export interface Product {
  id: string;
  name: string;
  nameHindi: string;
  stock: number;
  unit: string;
  status: 'ok' | 'low' | 'high';
  salesVelocity: 'fast' | 'normal' | 'slow';
  daysOfStock: number;
  lastUpdated: Date;
}

export interface BillItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface Bill {
  id: string;
  type: 'sales' | 'purchase';
  date: Date;
  items: BillItem[];
  total: number;
}

export interface Recommendation {
  id: string;
  productId: string;
  message: string;
  messageHindi: string;
  type: 'reorder' | 'reduce' | 'discount' | 'increase';
  priority: 'high' | 'medium' | 'low';
}

export interface Alert {
  id: string;
  productId: string;
  type: 'stockout' | 'overstock' | 'pricing_loss' | 'fast_mover';
  message: string;
  messageHindi: string;
  action: string;
  actionHindi: string;
}

export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}
