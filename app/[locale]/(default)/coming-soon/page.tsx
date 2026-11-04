import type { Metadata } from 'next';

import { BrandSection } from '~/components/ggg-storefront';

export const metadata: Metadata = {
  title: 'Ammo Basics — Coming soon | Give Girls Guns',
  description: 'Ammo basics are on the way. Explore the Give Girls Guns collection while you wait.',
  robots: { index: false, follow: true },
};

export default function ComingSoon() {
  return <BrandSection label="3G · Ammo basics coming soon" name="coming-soon" />;
}
