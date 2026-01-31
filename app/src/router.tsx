import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '@/App';
import { ShopPage } from '@/pages/ShopPage';
import { DemoPage } from '@/pages/DemoPage';
import { StartPage } from '@/pages/StartPage';
import { InventoryDetailPage } from '@/pages/InventoryDetailPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { AlertsPage } from '@/pages/AlertsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/demo',
    element: <DemoPage />,
  },
  {
    path: '/start',
    element: <StartPage />,
  },
  {
    path: '/inventory',
    element: <InventoryDetailPage />,
  },
  {
    path: '/recommendations',
    element: <RecommendationsPage />,
  },
  {
    path: '/alerts',
    element: <AlertsPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
