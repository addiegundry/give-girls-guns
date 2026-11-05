// This launch collection intentionally contains only the three approved apparel products.
// Product names, images, prices, and options remain managed in BigCommerce.
export const APPAREL_PRODUCT_IDS = [446, 104, 453] as const;

// Storefront products: the three ammo calibers, followed by the IceShaker partner collection.
export const DEFAULT_LINEUP_PRODUCTS = [
  { entityId: '104', displayName: '9mm Ammo' },
  { entityId: '457', displayName: '.380 ACP Ammo' },
  { entityId: '100', displayName: '.223 Remington Ammo' },
  { entityId: '467', buttonText: 'View Tumbler' },
  { entityId: '468', buttonText: 'View Tumbler' },
  { entityId: '469', buttonText: 'View Tumbler' },
] as const;

export interface LineupSelection {
  entityId?: string;
  displayName?: string;
  buttonText?: string;
}

export const GGG_INSTAGRAM_URL = 'https://www.instagram.com/give_girls_guns/';

export function resolveInstagramUrl(url: string) {
  const trimmedUrl = url.trim();

  return /^https?:\/\/(?:www\.)?instagram\.com\/atlanta_arms\/?(?:[?#].*)?$/i.test(trimmedUrl)
    ? GGG_INSTAGRAM_URL
    : trimmedUrl;
}
