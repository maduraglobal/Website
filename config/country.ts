export type PaymentGateway = 'razorpay' | 'stripe';

export interface RegionConfig {
  id: string;
  name: string;
  locale: string;
  currency: string;
  currencyCode: string;
  symbol: string;
  currencySymbol: string;
  payment: PaymentGateway;
  paymentGateway: PaymentGateway;
  dateFormat: string;
  phonePrefix: string;
  phoneFormat: string;
  language: string;
  exchangeRate: number;
  baseExchangeRate: number; // Static multiplier against the base currency (INR)
  pricingLogic: string;
}

/**
 * Core Configuration Engine
 * Controls country-specific settings including currency, payment, and formatting.
 */
export const COUNTRY_CONFIG = {
  IN: {
    id: 'en-in',
    name: 'India',
    locale: 'en-IN',
    currency: 'INR',
    currencyCode: 'INR',
    symbol: '₹',
    currencySymbol: '₹',
    payment: 'razorpay' as PaymentGateway,
    paymentGateway: 'razorpay' as PaymentGateway,
    dateFormat: 'dd/MM/yyyy',
    phonePrefix: '+91',
    phoneFormat: '+91 XXXXX XXXXX',
    language: 'English',
    exchangeRate: 1.0,
    baseExchangeRate: 1.0,
    pricingLogic: 'Tax inclusive, standard Indian pricing rules',
  },
  AU: {
    id: 'en-au',
    name: 'Australia',
    locale: 'en-AU',
    currency: 'AUD',
    currencyCode: 'AUD',
    symbol: 'A$',
    currencySymbol: 'A$',
    payment: 'stripe' as PaymentGateway,
    paymentGateway: 'stripe' as PaymentGateway,
    dateFormat: 'dd/MM/yyyy',
    phonePrefix: '+61',
    phoneFormat: '+61 XXX XXX XXX',
    language: 'English',
    exchangeRate: 0.018,
    baseExchangeRate: 0.018,
    pricingLogic: 'GST inclusive, Australian rounding rules',
  },
  US: {
    id: 'en-us',
    name: 'United States',
    locale: 'en-US',
    currency: 'USD',
    currencyCode: 'USD',
    symbol: '$',
    currencySymbol: '$',
    payment: 'stripe' as PaymentGateway,
    paymentGateway: 'stripe' as PaymentGateway,
    dateFormat: 'MM/dd/yyyy',
    phonePrefix: '+1',
    phoneFormat: '+1 (XXX) XXX-XXXX',
    language: 'English',
    exchangeRate: 0.012,
    baseExchangeRate: 0.012,
    pricingLogic: 'Tax exclusive, US standard pricing rules',
  }
} as const;

// Mapping for backward compatibility with region string keys
export const countryConfigs: Record<string, RegionConfig> = {
  'en-in': COUNTRY_CONFIG.IN as unknown as RegionConfig,
  'en-au': COUNTRY_CONFIG.AU as unknown as RegionConfig,
  'en-us': COUNTRY_CONFIG.US as unknown as RegionConfig,
};

/**
 * Retrieves the configuration for a specific geographic region.
 * Safely defaults to India ('en-in') if an unrecognized region is passed.
 */
export function getCountryConfig(region: string): RegionConfig {
  const normalizedRegion = region.toLowerCase();
  
  // Check if it's a full region string (e.g., 'en-in')
  if (countryConfigs[normalizedRegion]) {
    return countryConfigs[normalizedRegion];
  }

  // Check if it's a short country code (e.g., 'IN')
  const upperCountry = region.toUpperCase() as keyof typeof COUNTRY_CONFIG;
  if (COUNTRY_CONFIG[upperCountry]) {
    return COUNTRY_CONFIG[upperCountry] as unknown as RegionConfig;
  }

  return COUNTRY_CONFIG.IN as unknown as RegionConfig;
}

/**
 * Utility function to dynamically convert and format a base price (in INR) 
 * to the destination region's currency rules.
 */
export function formatRegionalPrice(baseInrPrice: number | string, region: string): string {
  const config = getCountryConfig(region);
  
  let numericPrice = 0;
  if (typeof baseInrPrice === 'string') {
    numericPrice = parseInt(baseInrPrice.replace(/[^0-9]/g, '')) || 0;
  } else {
    numericPrice = baseInrPrice;
  }

  const convertedPrice = numericPrice * config.exchangeRate;
  
  const formattedNumber = new Intl.NumberFormat(config.locale, {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(convertedPrice);

  return `${config.symbol}${formattedNumber}`;
}
