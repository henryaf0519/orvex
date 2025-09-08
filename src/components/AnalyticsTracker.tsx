// src/components/AnalyticsTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-PC595YVGHV', { // <-- Reemplaza el ID aquí
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null; 
};

export default AnalyticsTracker;