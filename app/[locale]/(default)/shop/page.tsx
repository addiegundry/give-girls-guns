import { Metadata } from 'next';

import { ApparelData, BrandSection } from '~/components/ggg-storefront';
import { getMetadataAlternates } from '~/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Shop apparel | Give Girls Guns',
    description: 'Explore our curated edit of Atlanta Arms T-shirts and headwear.',
    alternates: await getMetadataAlternates({ path: '/shop', locale }),
  };
}

export default async function Shop({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <ApparelData locale={locale}>
      <BrandSection label="3G · Shop introduction" name="page-intro" />
      <BrandSection label="3G · Shop apparel" name="shop-apparel" />
      <BrandSection instance="shop-extra" label="3G · Add shop sections" name="extra" />
    </ApparelData>
  );
}
