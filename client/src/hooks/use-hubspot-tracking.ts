import { useEffect } from "react";
import { useLocation } from "wouter";

export function useHubSpotTracking() {
  const [location] = useLocation();

  useEffect(() => {
    // Ensure HubSpot tracking code is loaded
    const _hsq = (window as any)._hsq = (window as any)._hsq || [];
    
    // Set the current path and track page view
    _hsq.push(['setPath', location]);
    _hsq.push(['trackPageView']);
    
    console.log('HubSpot tracked:', location);
  }, [location]);
}
