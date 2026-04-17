"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { COUNTRY_CONFIG, getCountryConfig, RegionConfig, formatRegionalPrice } from '@/config/country';

interface CountryContextType {
  selectedCountry: RegionConfig;
  setCountry: (countryId: string) => void;
  isAutoDetected: boolean;
  formatPrice: (amount: number | string) => string;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCountry, setSelectedCountry] = useState<RegionConfig>(getCountryConfig('en-in'));
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  // Sync state with URL on mount and when pathname changes
  useEffect(() => {
    const segments = pathname?.split('/') || [];
    const regionInUrl = segments[1];
    
    if (['en-in', 'en-au', 'en-us'].includes(regionInUrl)) {
      if (selectedCountry.id !== regionInUrl) {
        setSelectedCountry(getCountryConfig(regionInUrl));
      }
      return;
    }

    // If no region in URL, try localStorage
    const savedCountry = localStorage.getItem('selected-country');
    if (savedCountry) {
      setSelectedCountry(getCountryConfig(savedCountry));
    } else {
      // Auto-detect
      const browserLocale = navigator.language;
      let detectedCode = 'en-in';
      if (browserLocale.includes('AU')) detectedCode = 'en-au';
      else if (browserLocale.includes('US')) detectedCode = 'en-us';
      
      setSelectedCountry(getCountryConfig(detectedCode));
      setIsAutoDetected(true);
    }
  }, [pathname]);

  const setCountry = (countryId: string) => {
    const config = getCountryConfig(countryId);
    setSelectedCountry(config);
    localStorage.setItem('selected-country', countryId);
    
    // Update URL to match new region
    if (pathname) {
      const segments = pathname.split('/');
      if (['en-in', 'en-au', 'en-us'].includes(segments[1])) {
        segments[1] = countryId;
        router.push(segments.join('/'));
      } else {
        // If current path doesn't have region, add it
        router.push(`/${countryId}${pathname === '/' ? '' : pathname}`);
      }
    }
  };

  const formatPrice = useCallback((amount: number | string) => {
    return formatRegionalPrice(amount, selectedCountry.id);
  }, [selectedCountry.id]);

  return (
    <CountryContext.Provider value={{ selectedCountry, setCountry, isAutoDetected, formatPrice }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
