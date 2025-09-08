// src/components/AnalyticsTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Page view tracked: ${location.pathname + location.search}`);
    if (window.gtag) {
      window.gtag('config', 'G-PC595YVGHV', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null; 
};

export default AnalyticsTracker;