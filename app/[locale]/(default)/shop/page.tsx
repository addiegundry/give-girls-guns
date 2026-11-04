import { Metadata } from 'next';

import { LineupData, BrandSection, CategoryHeroRegion } from '~/components/ggg-storefront';
import { getMetadataAlternates } from '~/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Shop Ammo | Give Girls Guns',
    description: 'Get to know the Give Girls Guns ammunition lineup, one box at a time.',
    alternates: await getMetadataAlternates({ path: '/shop', locale }),
  };
}

export default async function Shop({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="ggg-category-page">
      <CategoryHeroRegion
        breadcrumbs={[{ label: 'Shop Ammo', href: '/shop' }]}
        instance="ggg-shop-category"
        title="Shop Ammo"
      />
      <LineupData locale={locale}>
        <BrandSection label="3G · Shop category products" name="category-products" />
      </LineupData>
      <BrandSection label="3G · New to ammo" name="category-basics" />
      <BrandSection instance="shop-extra" label="3G · Add shop sections" name="extra" />
    </div>
  );
}
