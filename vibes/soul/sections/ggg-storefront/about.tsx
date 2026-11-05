'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useId } from 'react';

import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { GGG_INSTAGRAM_URL, resolveInstagramUrl } from '~/lib/ggg-storefront';

export const aboutDefaults = {
  eyebrow: 'About Give Girls Guns',
  title: 'We’re Not Empowered.',
  highlight: 'We’re Locked & Loaded.',
  introduction:
    'Women are one of the fastest-growing groups of new gun owners. Yet most guns, gear and ammo were never designed with us in mind, and many women still don’t know where to start. Give Girls Guns is here to change that. We’re a community and a one-stop shop for women who want to feel safe, capable and ready, at home, on the trail, and anywhere the “bears” show up.',
  defenseTitle: 'Elite Defense',
  defense:
    'Here’s what we’ve learned: confidence starts with trusting what’s in your gun. Good ammo works every time, shoots the same way every time, and doesn’t cost so much that you’re afraid to practice. That’s why we built Give Girls Guns around Elite Defense, our self-defense ammo, made by Atlanta Arms in Covington, Georgia. It’s a hollow-point, which means the bullet expands when it hits, and that’s what makes it the right choice for protection.',
  manufacturingTitle: 'Atlanta Arms',
  manufacturingHighlight: 'Manufacturing',
  manufacturing:
    'Our production facility is a 30,000+ square-foot precision manufacturing operation with state-of-the art equipment and automation. We manufacture not only the completed round, but the projectile and the brass casing in-house. Our quality team is trained by the Department of Defense and our tolerances are 7 times tighter than the competition’s, which means round after round shoots with unmatched precision.',
  communityTitle: 'Bears beware.',
  community:
    'So whether you’re buying your first box or sharpening skills you already have, we’re here for you. Give a girl a gun and the best ammo that won’t break the bank, and bears beware. Shop Elite Defense, join the community, and follow along on social.',
  statistics: [
    {
      title: '30,000+ SQ FT',
      description:
        'A precision manufacturing operation with state-of-the art equipment and automation.',
    },
    {
      title: 'Made In-House',
      description:
        'We manufacture not only the completed round, but the projectile and the brass casing in-house.',
    },
    {
      title: '7× Tighter Tolerances',
      description:
        'Our quality team is trained by the Department of Defense and our tolerances are 7 times tighter than the competition’s.',
    },
  ],
};

interface EditableSection {
  className?: string;
  title?: string;
  description?: string;
}

interface EditableDestination {
  href: string;
  target?: string;
}

function destination(link: EditableDestination | undefined, fallback: string) {
  const href = link?.href.trim();

  return href && href !== '#' ? href : fallback;
}

export function AboutIntroduction({
  className,
  eyebrow = aboutDefaults.eyebrow,
  title = aboutDefaults.title,
  highlight = aboutDefaults.highlight,
  description = aboutDefaults.introduction,
  image,
  imageAlt = 'Two women wearing purple range gear, safety glasses, and hearing protection at an outdoor shooting range',
}: EditableSection & {
  eyebrow?: string;
  highlight?: string;
  image?: string;
  imageAlt?: string;
}) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={`ggg-about-introduction ${className ?? ''}`}>
      <div className="ggg-about-introduction-copy">
        <p className="ggg-about-eyebrow">{eyebrow}</p>
        <h1 id={headingId}>
          <span>{title}</span>
          <span className="ggg-about-highlight">{highlight}</span>
        </h1>
        <p>{description}</p>
      </div>
      <div className="ggg-about-portrait">
        <Image
          alt={imageAlt}
          fill
          preload
          sizes="(min-width: 901px) 55vw, 100vw"
          src={image || '/ggg/about/about-range-portrait.webp'}
        />
      </div>
    </section>
  );
}

export function AboutEliteDefense({
  className,
  title = aboutDefaults.defenseTitle,
  description = aboutDefaults.defense,
  image,
  imageAlt = 'Give Girls Guns Elite Defense ammunition boxes and hollow-point cartridges on lavender podiums',
}: EditableSection & { image?: string; imageAlt?: string }) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={`ggg-about-defense ${className ?? ''}`}>
      <div className="ggg-about-defense-copy">
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="ggg-about-defense-art">
        <Image
          alt={imageAlt}
          fill
          sizes="(min-width: 901px) 60vw, 100vw"
          src={image || '/ggg/about/about-elite-defense.webp'}
        />
      </div>
    </section>
  );
}

export function AboutManufacturing({
  className,
  title = aboutDefaults.manufacturingTitle,
  highlight = aboutDefaults.manufacturingHighlight,
  description = aboutDefaults.manufacturing,
  statistics = aboutDefaults.statistics,
}: EditableSection & {
  highlight?: string;
  statistics?: Array<{ title?: string; description?: string }>;
}) {
  const headingId = useId();
  const displayedStatistics = statistics.length ? statistics : aboutDefaults.statistics;

  return (
    <section aria-labelledby={headingId} className={`ggg-about-manufacturing ${className ?? ''}`}>
      <div className="ggg-about-section-inner">
        <h2 id={headingId}>
          {title} <span className="ggg-about-highlight">{highlight}</span>
        </h2>
        <p>{description}</p>
        <dl className="ggg-about-statistics">
          {displayedStatistics.map((statistic, index) => (
            <div key={index}>
              <dt>{statistic.title}</dt>
              <dd>{statistic.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function AboutCommunity({
  className,
  title = aboutDefaults.communityTitle,
  description = aboutDefaults.community,
  shopLabel = 'Shop Elite Defense',
  shopLink,
  communityLabel = 'Join the Community',
  communityLink,
  socialLabel = 'Follow Along',
  socialLink,
}: EditableSection & {
  shopLabel?: string;
  shopLink?: EditableDestination;
  communityLabel?: string;
  communityLink?: EditableDestination;
  socialLabel?: string;
  socialLink?: EditableDestination;
}) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={`ggg-about-community ${className ?? ''}`}>
      <div className="ggg-about-section-inner">
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
        <div className="ggg-about-actions">
          <Link
            className="ggg-about-cta"
            href={destination(shopLink, '/shop')}
            target={shopLink?.target}
          >
            {shopLabel}
            <ArrowRight aria-hidden="true" size={22} />
          </Link>
          <Link
            className="ggg-about-cta ggg-about-cta-outline"
            href={destination(communityLink, '#ggg-newsletter')}
            target={communityLink?.target}
          >
            {communityLabel}
            <ArrowRight aria-hidden="true" size={22} />
          </Link>
          <Link
            className="ggg-about-social"
            href={resolveInstagramUrl(destination(socialLink, GGG_INSTAGRAM_URL))}
            rel="noopener noreferrer"
            target={socialLink?.target || '_blank'}
          >
            {socialLabel}
            <ArrowUpRight aria-hidden="true" size={23} />
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
