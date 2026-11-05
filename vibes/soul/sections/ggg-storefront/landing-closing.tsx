'use client';

import { ArrowRight, Instagram } from 'lucide-react';
import { useId } from 'react';

import { InlineEmailForm } from '@/vibes/soul/primitives/inline-email-form';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { subscribe } from '~/components/subscribe/_actions/subscribe';

type Destination = { href: string; target?: string };
type EditableProps = { className?: string };

function destination(link: Destination | undefined, fallback: string) {
  const href = link?.href?.trim();

  return href && href !== '#' ? href : fallback;
}

export function RangeDayFeature({
  title = 'Make it a\nrange day.',
  description = 'Find your caliber. Plan your next trip.',
  buttonText = 'Explore the Collection',
  buttonLink,
  image,
  imageAlt = 'Woman wearing purple hearing protection and safety glasses at an outdoor shooting range',
  patternImage,
  showPattern = true,
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: Destination;
  image?: string;
  imageAlt?: string;
  patternImage?: string;
  showPattern?: boolean;
}) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={`ggg-range-day ${className ?? ''}`}>
      <div className="ggg-range-day-art">
        <Image
          alt={imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, 49vw"
          src={image || '/ggg/landing/range-shooter.png'}
        />
      </div>
      <div className={`ggg-range-day-copy ${showPattern ? 'ggg-range-day-patterned' : ''}`}>
        {showPattern && (
          <Image
            alt=""
            aria-hidden="true"
            className="ggg-range-day-pattern"
            height={2400}
            sizes="(max-width: 700px) 25vw, 14vw"
            src={patternImage || '/ggg/landing/editorial-pattern-edge.png'}
            width={1200}
          />
        )}
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
        <Link href={destination(buttonLink, '/shop')} target={buttonLink?.target}>
          {buttonText}
          <ArrowRight aria-hidden="true" size={24} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}

export function BrandNewsletter({
  title = 'Stay in the loop.',
  description = '',
  placeholder = 'Enter your email',
  buttonText = 'Sign Up',
  privacyText = '',
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  privacyText?: string;
}) {
  const headingId = useId();
  const hasCopy = Boolean(title.trim() || description.trim());

  return (
    <section
      aria-label={title.trim() ? undefined : 'Newsletter signup'}
      aria-labelledby={title.trim() ? headingId : undefined}
      className={`ggg-landing-newsletter ${className ?? ''}`}
      id="ggg-newsletter"
    >
      <div className={`ggg-landing-newsletter-inner ${hasCopy ? '' : 'ggg-newsletter-form-only'}`}>
        {hasCopy && (
          <div>
            {title && <h2 id={headingId}>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
        )}
        <div className="ggg-landing-signup">
          <InlineEmailForm
            action={subscribe}
            layout="separate"
            placeholder={placeholder}
            submitLabel={buttonText}
          />
          {privacyText && <small>{privacyText}</small>}
        </div>
      </div>
    </section>
  );
}

export function BrandFooter({
  brand = 'Give Girls Guns',
  logo,
  logoLink,
  cropLogo = true,
  shopLabel = 'Shop',
  storyLabel = 'About',
  contactLabel = 'Contact',
  privacyLabel = 'Privacy',
  shopLink,
  storyLink,
  contactLink,
  privacyLink,
  additionalLinks = [],
  instagramUrl = 'https://www.instagram.com/Atlanta_Arms/',
  cornerImage,
  showCorner = true,
  className,
}: EditableProps & {
  brand?: string;
  logo?: string;
  logoLink?: Destination;
  cropLogo?: boolean;
  shopLabel?: string;
  storyLabel?: string;
  contactLabel?: string;
  privacyLabel?: string;
  shopLink?: Destination;
  storyLink?: Destination;
  contactLink?: Destination;
  privacyLink?: Destination;
  additionalLinks?: Array<{ label?: string; link?: Destination }>;
  instagramUrl?: string;
  cornerImage?: string;
  showCorner?: boolean;
}) {
  const links = [
    { label: shopLabel, href: destination(shopLink, '/shop'), target: shopLink?.target },
    { label: storyLabel, href: destination(storyLink, '/our-story'), target: storyLink?.target },
    {
      label: contactLabel,
      href: destination(contactLink, '/get-in-touch'),
      target: contactLink?.target,
    },
    {
      label: privacyLabel,
      href: destination(privacyLink, 'https://atlantaarms.com/privacy-policy/'),
      target: privacyLink?.target,
    },
    ...additionalLinks.map(({ label, link }) => ({
      label,
      href: destination(link, '/shop'),
      target: link?.target,
    })),
  ];

  return (
    <footer className={`ggg-landing-footer ${className ?? ''}`}>
      <div className="ggg-landing-footer-inner">
        <div className="ggg-landing-footer-brand">
          <Link
            aria-label={`${brand} home`}
            className={`ggg-landing-logo ${cropLogo ? 'ggg-landing-logo-cropped' : ''}`}
            href={destination(logoLink, '/')}
            target={logoLink?.target}
          >
            <Image
              alt=""
              height={1000}
              sizes="125px"
              src={logo || '/ggg/landing/logo-main.png'}
              width={1000}
            />
          </Link>
        </div>
        {instagramUrl && (
          <a
            aria-label={`${brand} on Instagram (opens in a new tab)`}
            className="ggg-landing-instagram"
            href={instagramUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Instagram aria-hidden="true" size={27} strokeWidth={1.8} />
          </a>
        )}
        <nav aria-label="Footer navigation">
          {links.map(({ label, href, target }) => (
            <Link href={href} key={`${href}-${label}`} target={target}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {showCorner && (
        <Image
          alt=""
          aria-hidden="true"
          className="ggg-landing-footer-corner"
          height={160}
          src={cornerImage || '/ggg/landing/footer-corner-bottom-right.svg'}
          width={400}
        />
      )}
    </footer>
  );
}
