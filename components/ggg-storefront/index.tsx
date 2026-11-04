import { Slot } from '@makeswift/runtime/next';
import { getFormatter } from 'next-intl/server';
import { ReactNode } from 'react';

import { Streamable } from '@/vibes/soul/lib/streamable';
import { CategoryContentProvider } from '@/vibes/soul/sections/ggg-storefront/category';
import { getSessionCustomerAccessToken } from '~/auth';
import { getCartCount } from '~/client/queries/get-cart-count';
import { getProductsByIds } from '~/client/queries/get-products';
import { CartCountProvider } from '~/components/ggg-storefront/cart-count';
import { productCardTransformer } from '~/data-transformers/product-card-transformer';
import { getCartId } from '~/lib/cart';
import { APPAREL_PRODUCT_IDS, DEFAULT_LINEUP_PRODUCTS } from '~/lib/ggg-storefront';
import { getComponentSnapshot } from '~/lib/makeswift/client';
import { Component } from '~/lib/makeswift/component';
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

export function CategoryHeroRegion({
  title,
  breadcrumbs,
  instance,
}: {
  title: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  instance: string;
}) {
  return (
    <CategoryContentProvider breadcrumbs={breadcrumbs} title={title}>
      <Component
        label={`${title} · Category hero`}
        snapshotId={`${instance}-hero`}
        type="ggg-category-hero"
      />
    </CategoryContentProvider>
  );
}

export function CartCountData({ children }: { children: ReactNode }) {
  const count = Streamable.from(async () => {
    const cartId = await getCartId();

    if (!cartId) return 0;

    return (await getCartCount(cartId, await getSessionCustomerAccessToken())) ?? 0;
  });

  return <CartCountProvider count={count}>{children}</CartCountProvider>;
}
