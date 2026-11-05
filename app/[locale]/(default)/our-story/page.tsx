import { Metadata } from 'next';

import '@/vibes/soul/sections/ggg-storefront/about.css';

import { BrandSection } from '~/components/ggg-storefront';
import { getMetadataAlternates } from '~/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'About Us | Give Girls Guns',
    description:
      'We’re Not Empowered. We’re Locked & Loaded. Meet Give Girls Guns and the Atlanta Arms team behind Elite Defense ammunition.',
    alternates: await getMetadataAlternates({ path: '/our-story', locale }),
  };
}

export default function OurStory() {
  return (
    <div className="ggg-about-page">
      <BrandSection label="3G · About introduction" name="about-introduction" />
      <BrandSection label="3G · Elite Defense" name="about-defense" />
      <BrandSection label="3G · Atlanta Arms manufacturing" name="about-manufacturing" />
      <BrandSection label="3G · Join our community" name="about-community" />
      <BrandSection instance="about-extra" label="3G · Add story sections" name="extra" />
    </div>
  );
}
