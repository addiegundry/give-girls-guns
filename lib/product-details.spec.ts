import { describe, expect, it } from 'vitest';

import { catalogProductDetails } from './product-details';

describe('catalogProductDetails', () => {
  it('derives named ammunition facts without inventing a package quantity', () => {
    const details = catalogProductDetails({
      name: 'Elite Defense | 9mm | 124GR HP',
      sku: '9124T/D',
      customFields: [],
    });
    expect(details.caliber).toBe('9mm');
    expect(details.specifications).toContainEqual({ name: 'Bullet weight', value: '124 grain' });
    expect(details.specifications).toContainEqual({ name: 'Bullet type', value: 'HP' });
    expect(details.specifications.some((field) => field.name === 'Quantity')).toBe(false);
  });

  it('prefers explicit custom fields and omits empty or missing values', () => {
    const details = catalogProductDetails({
      name: 'Elite | 9mm | 124GR HP',
      customFields: [
        { name: 'Caliber', value: '.380 ACP' },
        { name: 'Quantity', value: '20 cartridges' },
        { name: 'Finish', value: '' },
      ],
    });
    expect(details.caliber).toBe('.380 ACP');
    expect(details.specifications.filter((field) => field.name === 'Caliber')).toHaveLength(1);
    expect(details.highlights).toContainEqual({ name: 'Quantity', value: '20 cartridges' });
    expect(
      details.specifications.some(
        (field) => field.value.includes('undefined') || field.name === 'Finish',
      ),
    ).toBe(false);
  });

  it('does not apply ammunition facts to a product with no such data', () => {
    const details = catalogProductDetails({ name: 'Leather Shield Patch Hat', customFields: [] });
    expect(details.caliber).toBeUndefined();
    expect(details.highlights).toEqual([]);
    expect(details.specifications).toEqual([]);
  });

  it('does not treat a clothing color or size as a caliber', () => {
    const details = catalogProductDetails({ name: 'T-Shirt | Purple | Small', customFields: [] });
    expect(details.caliber).toBeUndefined();
    expect(details.collection).toBeUndefined();
  });

  it('does not turn a marketing word into a bullet type', () => {
    const details = catalogProductDetails({ name: 'Elite | 9mm | 124GR MATCH', customFields: [] });
    expect(details.specifications.some((field) => field.name === 'Bullet type')).toBe(false);
  });
});
