import { Metadata } from 'next';

import { BrandSection } from '~/components/ggg-storefront';
import { getMetadataAlternates } from '~/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Our story | Give Girls Guns',
    description:
      'Meet a community built on confidence, individuality, and showing up for one another.',
    alternates: await getMetadataAlternates({ path: '/our-story', locale }),
  };
}

export default function OurStory() {
  return (
    <>
      <BrandSection label="3G · About our community" name="about" />
      <BrandSection label="3G · Shared values" name="values" />
      <BrandSection instance="about-extra" label="3G · Add story sections" name="extra" />
    </>
  );
}
