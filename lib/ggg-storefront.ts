// This launch collection intentionally contains only the three approved apparel products.
// Product names, images, prices, and options remain managed in BigCommerce.
export const APPAREL_PRODUCT_IDS = [446, 104, 453] as const;

// Verified Storefront catalog products, ordered to match the landing-page caliber lineup.
export const DEFAULT_LINEUP_PRODUCTS = [
  { entityId: '104', displayName: '9mm Ammo' },
  { entityId: '457', displayName: '.380 ACP Ammo' },
  { entityId: '100', displayName: '.223 Remington Ammo' },
] as const;

export interface LineupSelection {
  entityId?: string;
  displayName?: string;
}
