export interface ProductSpecification {
  name: string;
  value: string;
}

export interface CatalogProductDetails {
  collection?: string;
  caliber?: string;
  highlights: ProductSpecification[];
  specifications: ProductSpecification[];
}

export function catalogProductDetails(product: {
  name: string;
  sku?: string;
  brand?: string;
  condition?: string | null;
  weight?: { value: number; unit: string } | null;
  customFields: ProductSpecification[];
}): CatalogProductDetails {
  const customFields = product.customFields.filter((field) => field.value.trim());
  const find = (pattern: RegExp) => customFields.find((field) => pattern.test(field.name))?.value;
  const parts = product.name.split(/\s*\|\s*|\s+\/\s+/);
  const namedCaliber =
    parts.length > 2 && /^\.?\d+(?:\.\d+)?(?:\s|mm\b|$)/i.test(parts[1] || '')
      ? parts[1]?.trim()
      : undefined;
  const collection = find(/^collection$/i) || (namedCaliber ? parts[0]?.trim() : undefined);
  const caliber = find(/^calib(?:er|re)$/i) || namedCaliber;
  const bulletWeight =
    find(/^(bullet weight|grain weight)$/i) ||
    product.name.match(/\b(\d+(?:\.\d+)?)\s*GR(?:AIN)?\b/i)?.[1];
  const bulletType =
    find(/^bullet type$/i) ||
    product.name.match(
      /\b\d+(?:\.\d+)?\s*GR(?:AIN)?\s+(JHP|HPBT|BTHP|FMJ|JFP|HP|SWC|HBWC|SBT|TMJ)\b/i,
    )?.[1];
  const quantity = find(/^(quantity|rounds per box|cartridges per box|box count)$/i);
  const specifications = [
    { name: 'Manufacturer', value: find(/^manufacturer$/i) || product.brand || '' },
    { name: 'Collection', value: collection || '' },
    { name: 'Caliber', value: caliber || '' },
    {
      name: 'Bullet weight',
      value: bulletWeight
        ? /^\d+(\.\d+)?$/.test(bulletWeight)
          ? `${bulletWeight} grain`
          : bulletWeight
        : '',
    },
    { name: 'Bullet type', value: bulletType || '' },
    { name: 'Quantity', value: quantity || '' },
    { name: 'SKU', value: product.sku || '' },
    {
      name: 'Weight',
      value: product.weight?.value ? `${product.weight.value} ${product.weight.unit}` : '',
    },
    { name: 'Condition', value: product.condition || '' },
  ].filter((field) => field.value);
  const names = new Set(specifications.map((field) => field.name.toLowerCase()));
  specifications.push(...customFields.filter((field) => !names.has(field.name.toLowerCase())));
  const highlights = [
    { name: 'Caliber', value: caliber || '' },
    {
      name: 'Bullet',
      value: [
        bulletWeight && (/^\d+(\.\d+)?$/.test(bulletWeight) ? `${bulletWeight} GR` : bulletWeight),
        bulletType,
      ]
        .filter(Boolean)
        .join(' '),
    },
    { name: 'Quantity', value: quantity || '' },
    { name: 'Manufacturer', value: product.brand || '' },
    { name: 'SKU', value: product.sku || '' },
  ]
    .filter((field) => field.value)
    .slice(0, 3);

  return { collection, caliber, specifications, highlights };
}
