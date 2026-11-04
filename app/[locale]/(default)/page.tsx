import { Metadata } from 'next';

import { Suspense } from 'react';

import { RangeDayLineup } from '@/vibes/soul/sections/ggg-storefront/range-day-lineup';
import { LineupData, BrandSection } from '~/components/ggg-storefront';
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
    title: metadata?.title ?? 'Give Girls Guns | Find your caliber',
    description:
      metadata?.description ??
      'Find your caliber and make it a range day. Explore the Give Girls Guns ammunition lineup.',
    alternates: await getMetadataAlternates({ path: '/', locale }),
  };
}

// Intentionally no `generateStaticParams`: see the catch-all route for why the locale fan-out is
// gone.

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <BrandSection label="3G · Homepage hero" name="hero" />
      <BrandSection label="3G · Statement strip" name="marquee" />
      <Suspense fallback={<RangeDayLineup loading products={[]} />}>
        <LineupData locale={locale}>
          <BrandSection label="3G · Range-day lineup" name="lineup" />
        </LineupData>
      </Suspense>
      <BrandSection label="3G · Make it a range day" name="range-day" />
      <BrandSection label="3G · Add homepage sections" name="extra" />
    </>
  );
}
