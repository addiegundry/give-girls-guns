import { Metadata } from 'next';

import { ApparelData, BrandSection } from '~/components/ggg-storefront';
import { getMakeswiftPageMetadata } from '~/lib/makeswift';
import { getMetadataAlternates } from '~/lib/seo/canonical';

interface Params {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await getMakeswiftPageMetadata({ path: '/', locale });

  return {
    title: metadata?.title ?? 'Give Girls Guns | Wear your confidence',
    description:
      metadata?.description ??
      'Everyday apparel for independent spirits. Discover the collection and meet the Give Girls Guns community.',
    alternates: await getMetadataAlternates({ path: '/', locale }),
  };
}

// Intentionally no `generateStaticParams`: see the catch-all route for why the locale fan-out is
// gone.

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <ApparelData locale={locale}>
      <BrandSection label="3G · Homepage hero" name="hero" />
      <BrandSection label="3G · Statement strip" name="marquee" />
      <BrandSection label="3G · Featured apparel" name="apparel" />
      <BrandSection label="3G · Our community" name="story" />
      <BrandSection label="3G · Our values" name="values" />
      <BrandSection label="3G · Add homepage sections" name="extra" />
    </ApparelData>
  );
}
