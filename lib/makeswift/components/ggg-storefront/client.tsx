'use client';

import { createContext, ReactNode, useContext } from 'react';

import { Product } from '@/vibes/soul/primitives/product-card';
import { ApparelCollection, BrandContact } from '@/vibes/soul/sections/ggg-storefront';
import { CategoryProductGrid } from '@/vibes/soul/sections/ggg-storefront/category';
import { useProducts } from '~/lib/makeswift/utils/use-products';
import {
  APPAREL_PRODUCT_IDS,
  DEFAULT_LINEUP_PRODUCTS,
  type LineupSelection,
} from '~/lib/ggg-storefront';
import {
  RangeDayLineup,
  type RangeDayLineupProps,
} from '@/vibes/soul/sections/ggg-storefront/range-day-lineup';

const APPAREL_IDS = APPAREL_PRODUCT_IDS.map(String);

const CatalogContext = createContext<Product[] | null>(null);
const LineupContext = createContext<Product[] | null>(null);
const ContactContext = createContext<ReactNode>(null);

export function ApparelProvider({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  return <CatalogContext.Provider value={products}>{children}</CatalogContext.Provider>;
}

export function LineupProvider({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  return <LineupContext.Provider value={products}>{children}</LineupContext.Provider>;
}

export function MSRangeDayLineup({
  selectedProducts = [],
  ...props
}: Omit<RangeDayLineupProps, 'products' | 'loading'> & { selectedProducts?: LineupSelection[] }) {
  const initialProducts = useContext(LineupContext);
  const chosenProducts = selectedProducts.filter((product) => product.entityId);
  const selection = chosenProducts.length ? chosenProducts : DEFAULT_LINEUP_PRODUCTS;
  const useInitialProducts = !chosenProducts.length && initialProducts !== null;
  const { products, isLoading } = useProducts({
    collection: 'none',
    additionalProductIds: useInitialProducts
      ? []
      : selection.flatMap((product) => (product.entityId ? [product.entityId] : [])),
  });
  const catalogProducts = useInitialProducts ? initialProducts : products;
  const orderedProducts = selection.flatMap((selected) => {
    const product = catalogProducts?.find((item) => item.id === selected.entityId);

    return product ? [{ ...product, displayName: selected.displayName }] : [];
  });

  return (
    <RangeDayLineup
      {...props}
      loading={!useInitialProducts && isLoading}
      products={orderedProducts}
    />
  );
}

export function MSCategoryProducts({
  selectedProducts = [],
  buttonText,
  showPrices = false,
  className,
}: {
  selectedProducts?: LineupSelection[];
  buttonText?: string;
  showPrices?: boolean;
  className?: string;
}) {
  const initialProducts = useContext(LineupContext);
  const chosen = selectedProducts.filter(({ entityId }) => entityId);
  const selection = chosen.length ? chosen : DEFAULT_LINEUP_PRODUCTS;
  const useInitial = !chosen.length && initialProducts !== null;
  const { products, isLoading } = useProducts({
    collection: 'none',
    additionalProductIds: useInitial
      ? []
      : selection.flatMap(({ entityId }) => (entityId ? [entityId] : [])),
  });
  const catalog = useInitial ? initialProducts : products;
  const ordered = selection.flatMap(
    ({ entityId }) => catalog?.filter(({ id }) => id === entityId) ?? [],
  );

  return (
    <div className={className}>
      <CategoryProductGrid
        buttonText={buttonText}
        loading={!useInitial && isLoading}
        products={ordered}
        showPrices={showPrices}
      />
    </div>
  );
}

export function ContactFormProvider({ form, children }: { form: ReactNode; children: ReactNode }) {
  return <ContactContext.Provider value={form}>{children}</ContactContext.Provider>;
}

export function MSApparelCollection(props: {
  className?: string;
  title?: string;
  description?: string;
  eyebrow?: string;
  showAllLink?: boolean;
}) {
  const initialProducts = useContext(CatalogContext);
  const { products, isLoading } = useProducts({
    collection: 'none',
    additionalProductIds: initialProducts === null ? APPAREL_IDS : [],
  });

  return (
    <ApparelCollection
      {...props}
      loading={initialProducts === null && isLoading}
      products={initialProducts ?? products ?? []}
    />
  );
}

export function MSBrandContact(props: {
  className?: string;
  title?: string;
  description?: string;
  image?: string;
}) {
  return <BrandContact {...props}>{useContext(ContactContext)}</BrandContact>;
}

export function BrandExtraSections({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
