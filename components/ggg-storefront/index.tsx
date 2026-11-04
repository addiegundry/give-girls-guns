import { getFormatter } from 'next-intl/server';
import { Slot } from '@makeswift/runtime/next';
import { ReactNode } from 'react';

import { getProductsByIds } from '~/client/queries/get-products';
import { productCardTransformer } from '~/data-transformers/product-card-transformer';
import { APPAREL_PRODUCT_IDS, DEFAULT_LINEUP_PRODUCTS } from '~/lib/ggg-storefront';
import { Component } from '~/lib/makeswift/component';
import { getComponentSnapshot } from '~/lib/makeswift/client';
import { ApparelProvider, LineupProvider } from '~/lib/makeswift/components/ggg-storefront/client';

export async function BrandSection({
  name,
  instance = name,
  label,
}: {
  name: string;
  instance?: string;
  label?: string;
}) {
  if (name === 'extra') {
    return (
      <Slot
        fallback={null}
        label={label ?? 'Additional sections'}
        snapshot={await getComponentSnapshot(`ggg-${instance}`)}
      />
    );
  }

  return (
    <Component label={label ?? `3G ${name}`} snapshotId={`ggg-${instance}`} type={`ggg-${name}`} />
  );
}

export async function ApparelData({ locale, children }: { locale: string; children: ReactNode }) {
  const ids = [...APPAREL_PRODUCT_IDS];
  const [result, format] = await Promise.all([
    getProductsByIds({ entityIds: ids, locale }),
    getFormatter(),
  ]);
  const ordered = ids.flatMap(
    (id) => result.products?.filter((product) => product.entityId === id) ?? [],
  );

  return (
    <ApparelProvider products={productCardTransformer(ordered, format)}>{children}</ApparelProvider>
  );
}

export async function LineupData({ locale, children }: { locale: string; children: ReactNode }) {
  const ids = DEFAULT_LINEUP_PRODUCTS.map(({ entityId }) => Number(entityId));
  const [result, format] = await Promise.all([
    getProductsByIds({ entityIds: ids, locale }),
    getFormatter(),
  ]);

  return (
    <LineupProvider products={productCardTransformer(result.products ?? [], format)}>
      {children}
    </LineupProvider>
  );
}
