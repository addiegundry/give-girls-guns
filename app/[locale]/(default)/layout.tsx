import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import '@/vibes/soul/sections/ggg-storefront/styles.css';
import '@/vibes/soul/sections/ggg-storefront/landing-header-hero.css';
import '@/vibes/soul/sections/ggg-storefront/landing-lineup.css';
import '@/vibes/soul/sections/ggg-storefront/landing-closing.css';

import { BrandSection } from '~/components/ggg-storefront';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div className="ggg-storefront">
      <BrandSection label="3G · Navigation" name="header" />

      <main className="ggg-main-content" id="main-content">
        {children}
      </main>

      <BrandSection label="3G · Newsletter" name="newsletter" />
      <BrandSection label="3G · Footer" name="footer" />
    </div>
  );
}
