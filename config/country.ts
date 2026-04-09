export type PaymentGateway = 'razorpay' | 'stripe';

export interface RegionConfig {
  id: string;
  name: string;
  locale: string;
  currencyCode: string;
  currencySymbol: string;
  paymentGateway: PaymentGateway;
  dateFormat: string;
  phonePrefix: string;
  language: string;
  
  // Static multiplier against the base currency (INR for Madura travel model)
  // In production, this would be updated or overridden daily via a Forex API.
  baseExchangeRate: number; 
}

export const countryConfigs: Record<string, RegionConfig> = {
  'en-in': {
    id: 'en-in',
    name: 'India',
    locale: 'en-IN',
    currencyCode: 'INR',
    currencySymbol: '₹',
    paymentGateway: 'razorpay',
    dateFormat: 'dd/MM/yyyy',
    phonePrefix: '+91',
    language: 'English',
    baseExchangeRate: 1.0, 
  },
  'en-au': {
    id: 'en-au',
    name: 'Australia',
    locale: 'en-AU',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    paymentGateway: 'stripe',
    dateFormat: 'dd/MM/yyyy',
    phonePrefix: '+61',
    language: 'English',
    baseExchangeRate: 0.018, // ~ 1 INR = 0.018 AUD
  },
  'en-us': {
    id: 'en-us',
    name: 'United States',
    locale: 'en-US',
    currencyCode: 'USD',
    currencySymbol: '$',
    paymentGateway: 'stripe',
    dateFormat: 'MM/dd/yyyy',
    phonePrefix: '+1',
    language: 'English',
    baseExchangeRate: 0.012, // ~ 1 INR = 0.012 USD
  }
};

/**
 * Retrieves the heavily typed configuration for a specific geographic region binding.
 * Safely defaults to India ('en-in') if an unrecognized region is passed.
 */
export function getCountryConfig(region: string): RegionConfig {
  return countryConfigs[region.toLowerCase()] || countryConfigs['en-in'];
}

/**
 * Utility function to dynamically convert and format a base price (in INR) 
 * to the destination region's currency rules layout (using the Intl API).
 */
export function formatRegionalPrice(baseInrPrice: number | string, region: string): string {
  const config = getCountryConfig(region);
  
  // Clean and parse the input if it's a string
  let numericPrice = 0;
  if (typeof baseInrPrice === 'string') {
    numericPrice = parseInt(baseInrPrice.replace(/[^0-9]/g, '')) || 0;
  } else {
    numericPrice = baseInrPrice;
  }

  const convertedPrice = numericPrice * config.baseExchangeRate;
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currencyCode,
    maximumFractionDigits: 0,
  }).format(convertedPrice);
}
