import type { Product, Recommendation, Alert, Bill } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wheat Flour (Aata)',
    nameHindi: 'आटा',
    stock: 12,
    unit: 'kg',
    status: 'ok',
    salesVelocity: 'fast',
    daysOfStock: 8,
    lastUpdated: new Date(),
  },
  {
    id: '2',
    name: 'Rice (Chawal)',
    nameHindi: 'चावल',
    stock: 3,
    unit: 'kg',
    status: 'low',
    salesVelocity: 'fast',
    daysOfStock: 2,
    lastUpdated: new Date(),
  },
  {
    id: '3',
    name: 'Mustard Oil',
    nameHindi: 'सरसों का तेल',
    stock: 8,
    unit: 'L',
    status: 'ok',
    salesVelocity: 'slow',
    daysOfStock: 45,
    lastUpdated: new Date(),
  },
  {
    id: '4',
    name: 'Sugar (Chini)',
    nameHindi: 'चीनी',
    stock: 22,
    unit: 'kg',
    status: 'high',
    salesVelocity: 'normal',
    daysOfStock: 35,
    lastUpdated: new Date(),
  },
  {
    id: '5',
    name: 'Turmeric Powder',
    nameHindi: 'हल्दी पाउडर',
    stock: 5,
    unit: 'kg',
    status: 'ok',
    salesVelocity: 'normal',
    daysOfStock: 20,
    lastUpdated: new Date(),
  },
  {
    id: '6',
    name: 'Red Lentils (Masoor Dal)',
    nameHindi: 'मसूर दाल',
    stock: 2,
    unit: 'kg',
    status: 'low',
    salesVelocity: 'fast',
    daysOfStock: 3,
    lastUpdated: new Date(),
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    productId: '2',
    message: 'Rice stock will run out in 3 days. Reorder now.',
    messageHindi: 'चावल का स्टॉक 3 दिन में खतम हो जाएगा। अभी रीऑर्डर करें।',
    type: 'reorder',
    priority: 'high',
  },
  {
    id: '2',
    productId: '1',
    message: 'Wheat flour is selling fast. Keep a little extra stock.',
    messageHindi: 'आटा तेज़ बिक रहा है। थोड़ा ज़्यादा स्टॉक रखें।',
    type: 'increase',
    priority: 'medium',
  },
  {
    id: '3',
    productId: '3',
    message: 'Mustard oil has not sold in 45 days. Consider a discount.',
    messageHindi: 'सरसों का तेल 45 दिन से नहीं बिका। डिस्काउंट सोचिए।',
    type: 'discount',
    priority: 'medium',
  },
  {
    id: '4',
    productId: '4',
    message: 'Sugar is overstocked. Delay next order by 5 days.',
    messageHindi: 'चीनी ज़्यादा स्टॉक में है। अगला ऑर्डर 5 दिन बाद करें।',
    type: 'reduce',
    priority: 'low',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    productId: '2',
    type: 'stockout',
    message: 'Stock-out risk: Rice',
    messageHindi: 'स्टॉक खत्म होने का खतरा: चावल',
    action: 'Reorder now',
    actionHindi: 'रीऑर्डर करें',
  },
  {
    id: '2',
    productId: '4',
    type: 'overstock',
    message: 'Overstock: Sugar',
    messageHindi: 'ज़्यादा स्टॉक: चीनी',
    action: 'Delay order',
    actionHindi: 'ऑर्डर टालें',
  },
  {
    id: '3',
    productId: '3',
    type: 'pricing_loss',
    message: 'Slow mover: Mustard Oil',
    messageHindi: 'धीमी बिक्री: सरसों का तेल',
    action: 'Give discount',
    actionHindi: 'डिस्काउंट दें',
  },
  {
    id: '4',
    productId: '1',
    type: 'fast_mover',
    message: 'Fast mover: Wheat Flour',
    messageHindi: 'तेज़ बिक्री: आटा',
    action: 'Keep more stock',
    actionHindi: 'ज़्यादा स्टॉक रखें',
  },
];

export const mockBill: Bill = {
  id: 'bill-1',
  type: 'purchase',
  date: new Date(),
  items: [
    { name: 'Aata', quantity: 10, unit: 'kg', price: 450 },
    { name: 'Chawal', quantity: 5, unit: 'kg', price: 350 },
    { name: 'Mustard Oil', quantity: 2, unit: 'L', price: 280 },
    { name: 'Chini', quantity: 5, unit: 'kg', price: 225 },
  ],
  total: 1305,
};

export const translations = {
  appName: {
    en: 'Dukaan AI',
    hi: 'दुकान AI',
  },
  tagline: {
    en: 'Make your business smart from bills.',
    hi: 'बिल से बिजनेस स्मार्ट बनाएं।',
  },
  uploadBill: {
    en: 'Upload Bill',
    hi: 'बिल अपलोड करें',
  },
  watchDemo: {
    en: 'Watch Demo →',
    hi: 'डेमो देखें →',
  },
  noPOS: {
    en: 'No POS. No dashboard. Just your bill.',
    hi: 'कोई POS नहीं। कोई डैशबोर्ड नहीं। सिर्फ आपका बिल।',
  },
  myShop: {
    en: 'My Shop',
    hi: 'अपनी दुकान',
  },
  stepsTitle: {
    en: 'Just 3 steps',
    hi: 'सिर्फ 3 कदम',
  },
  step1Title: {
    en: 'Snap the bill',
    hi: 'बिल की फोटो लो',
  },
  step1Desc: {
    en: 'Sales or purchase bill—just click with your camera.',
    hi: 'सेल्स या खरीदारी बिल—बस कैमरा से क्लिक करें।',
  },
  step2Title: {
    en: 'AI writes it down',
    hi: 'AI लिख लेगा',
  },
  step2Desc: {
    en: 'Items, quantities, prices—automatically structured.',
    hi: 'आइटम, मात्रा, कीमत—अपने आप व्यवस्थित हो जाएगा।',
  },
  step3Title: {
    en: 'Get advice',
    hi: 'सलाह पाएं',
  },
  step3Desc: {
    en: 'What to reorder, what not—simple answers, even in voice.',
    hi: 'क्या रीऑर्डर करें, क्या नहीं—सीधा जवाब, आवाज़ में भी।',
  },
  todaysStock: {
    en: "Today's Stock",
    hi: 'आज का स्टॉक',
  },
  allCategories: {
    en: 'All Categories',
    hi: 'सभी कैटेगरी',
  },
  item: {
    en: 'Item',
    hi: 'आइटम',
  },
  stock: {
    en: 'Stock',
    hi: 'स्टॉक',
  },
  status: {
    en: 'Status',
    hi: 'स्थिति',
  },
  ok: {
    en: 'OK',
    hi: 'ठीक',
  },
  low: {
    en: 'Low',
    hi: 'कम',
  },
  high: {
    en: 'High',
    hi: 'ज़्यादा',
  },
  everyItem: {
    en: 'Count of every item',
    hi: 'हर आइटम का हिसाब',
  },
  autoUpdate: {
    en: 'Stock auto-updates. No typing needed.',
    hi: 'स्टॉक अपने आप अपडेट होता है। कुछ टाइप करने की ज़रूरत नहीं।',
  },
  realTimeInventory: {
    en: 'REAL-TIME INVENTORY',
    hi: 'रीयल-टाइम इन्वेंटरी',
  },
  understandableAdvice: {
    en: 'Advice that makes sense',
    hi: 'समझने वाली सलाह',
  },
  noCharts: {
    en: 'No charts—just direct answers. Listen in your language.',
    hi: 'कोई चार्ट नहीं—बस सीधा जवाब। अपनी भाषा में सुन सकते हैं।',
  },
  smartRecommendations: {
    en: 'SMART RECOMMENDATIONS',
    hi: 'स्मार्ट सलाह',
  },
  listen: {
    en: 'Listen',
    hi: 'सुनिए',
  },
  alerts: {
    en: 'Alerts',
    hi: 'अलर्ट',
  },
  knowBeforeMistake: {
    en: 'Know before a mistake happens.',
    hi: 'गलती होने से पहले ही पता चल जाएगा।',
  },
  stockout: {
    en: 'Stock-out',
    hi: 'स्टॉक खत्म',
  },
  overstock: {
    en: 'Overstock',
    hi: 'ज़्यादा स्टॉक',
  },
  pricingLoss: {
    en: 'Pricing Loss',
    hi: 'कीमत का नुकसान',
  },
  testimonialMetric: {
    en: '30% less stock-out',
    hi: '30% कम स्टॉक खत्म',
  },
  testimonialQuote: {
    en: 'I used to order by guesswork. Now the bill is enough—I know what is about to run out.',
    hi: 'पहले अंदाज़ से ऑर्डर करता था। अब बिल ही काफी है—पता चल जाता है क्या खत्म होने वाला है।',
  },
  testimonialName: {
    en: '— Rajesh, Kirana store, Jaipur',
    hi: '— राजेश, किराना स्टोर, जयपुर',
  },
  noPOSNeeded: {
    en: 'No POS installed, just uploaded bills from phone.',
    hi: 'POS नहीं लगाया, बस फोन से बिल अपलोड किए।',
  },
  startToday: {
    en: 'Upload your first bill today.',
    hi: 'आज ही अपना पहला बिल अपलोड करें।',
  },
  noSetup: {
    en: 'No setup. No fees. Just your bill, and smart advice.',
    hi: 'कोई सेटअप नहीं। कोई फीस नहीं। बस आपका बिल, और स्मार्ट सलाह।',
  },
  startNow: {
    en: 'Start Now',
    hi: 'शुरू करें',
  },
  dataSafe: {
    en: 'Your data is safe. Stays on your phone.',
    hi: 'डेटा सुरक्षित है। फोन में ही रहता है।',
  },
  footerTagline: {
    en: 'Smart business from bills.',
    hi: 'बिल से स्मार्ट बिजनेस।',
  },
  contact: {
    en: 'Contact',
    hi: 'संपर्क',
  },
  languages: {
    en: 'Languages',
    hi: 'भाषाएं',
  },
  search: {
    en: 'Search',
    hi: 'खोजें',
  },
};
