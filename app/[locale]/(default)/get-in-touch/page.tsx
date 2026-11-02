import { Metadata } from 'next';

import { BrandSection } from '~/components/ggg-storefront';
import { StoreContactForm } from '~/components/ggg-storefront/contact';
import { ContactFormProvider } from '~/lib/makeswift/components/ggg-storefront/client';
import { getMetadataAlternates } from '~/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Get in touch | Give Girls Guns',
    description: 'Get in touch for apparel questions, order support, and community conversations.',
    alternates: await getMetadataAlternates({ path: '/get-in-touch', locale }),
  };
}

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;

  return (
    <ContactFormProvider form={<StoreContactForm success={success === 'true'} />}>
      <BrandSection label="3G · Get in touch" name="contact" />
      <BrandSection instance="contact-extra" label="3G · Add contact sections" name="extra" />
    </ContactFormProvider>
  );
}
