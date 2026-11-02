'use client';

import { ArrowDown, ArrowRight, Heart, Menu, ShoppingBag, UserRound, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { InlineEmailForm } from '@/vibes/soul/primitives/inline-email-form';
import { PriceLabel } from '@/vibes/soul/primitives/price-label';
import { Product } from '@/vibes/soul/primitives/product-card';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { subscribe } from '~/components/subscribe/_actions/subscribe';

export const brandDefaults = {
  heroTitle: 'Be fearless.\nBe yourself.',
  heroDescription:
    'A little boldness looks good on you. Meet everyday apparel with a whole lot of attitude.',
  storyTitle: 'More than a look.\nA whole movement.',
  storyDescription:
    'Give Girls Guns is a community built on confidence, individuality, and showing up for one another. We believe women deserve to take up space, write their own stories, and feel at home being themselves.',
};

type EditableProps = { className?: string };

export function BrandHeader({
  brand = 'Give Girls Guns',
  announcement = 'A little attitude. A lot of confidence. Welcome to the club.',
  shopLabel = 'Shop apparel',
  storyLabel = 'Our story',
  contactLabel = 'Get in touch',
  className,
}: EditableProps & {
  brand?: string;
  announcement?: string;
  shopLabel?: string;
  storyLabel?: string;
  contactLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <header className={`ggg-header ${className ?? ''}`}>
      <a className="ggg-skip" href="#main-content">
        Skip to content
      </a>
      {showAnnouncement && announcement && (
        <div className="ggg-announcement">
          <span>{announcement}</span>
          <button
            aria-label="Dismiss announcement"
            onClick={() => setShowAnnouncement(false)}
            type="button"
          >
            <X size={15} />
          </button>
        </div>
      )}
      <div className="ggg-nav ggg-container">
        <Link aria-label={`${brand} home`} className="ggg-wordmark" href="/">
          {brand}
          <span className="ggg-wordmark-dot">✳</span>
        </Link>
        <nav aria-label="Main navigation" className="ggg-desktop-nav">
          <Link href="/shop">{shopLabel}</Link>
          <Link href="/our-story">{storyLabel}</Link>
          <Link href="/get-in-touch">{contactLabel}</Link>
        </nav>
        <div className="ggg-nav-actions">
          <Link aria-label="Your account" className="ggg-icon-link" href="/login">
            <UserRound size={21} strokeWidth={1.5} />
          </Link>
          <Link aria-label="Shopping bag" className="ggg-bag" href="/cart">
            <ShoppingBag size={21} strokeWidth={1.5} />
            <span>Bag</span>
          </Link>
          <button
            aria-controls="ggg-mobile-nav"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="ggg-menu-toggle"
            onClick={() => setOpen(!open)}
            type="button"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" className="ggg-mobile-nav" id="ggg-mobile-nav">
          {[
            ['/shop', shopLabel],
            ['/our-story', storyLabel],
            ['/get-in-touch', contactLabel],
          ].map(([href, label]) => (
            <Link href={href ?? '/'} key={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function BrandHero({
  title = brandDefaults.heroTitle,
  description = brandDefaults.heroDescription,
  eyebrow = 'For women who take up space',
  image,
  imageAlt = 'A colorful illustrated lineup of confident women',
  buttonText = 'Find your everyday bold',
  buttonLink,
  secondaryText = 'Meet the community',
  secondaryLink,
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: { href: string; target?: string };
  secondaryText?: string;
  secondaryLink?: { href: string; target?: string };
}) {
  return (
    <section className={`ggg-hero ggg-container ${className ?? ''}`}>
      <div className="ggg-hero-copy">
        <p className="ggg-eyebrow">
          <span />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p className="ggg-hero-description">{description}</p>
        <Link
          className="ggg-button"
          href={buttonLink?.href && buttonLink.href !== '#' ? buttonLink.href : '/shop'}
          target={buttonLink?.target}
        >
          {buttonText}
          <ArrowRight size={19} />
        </Link>
        <Link
          className="ggg-text-link"
          href={
            secondaryLink?.href && secondaryLink.href !== '#' ? secondaryLink.href : '/our-story'
          }
          target={secondaryLink?.target}
        >
          {secondaryText}
          <ArrowRight size={16} />
        </Link>
        <div className="ggg-hero-footnote">
          <span>Independent spirits. Shared purpose.</span>
          <ArrowDown size={17} />
        </div>
      </div>
      <div className="ggg-hero-art">
        <Image
          alt={imageAlt}
          className="ggg-cover"
          fill
          preload
          sizes="(min-width: 900px) 62vw, 100vw"
          src={image || '/ggg/GGG-hero.webp'}
        />
        <div className="ggg-sticker" aria-hidden="true">
          A little
          <br />
          <em>fearless.</em>
          <span>100% YOU ✳</span>
        </div>
        <span className="ggg-art-caption">THE GIVE GIRLS GUNS COLLECTIVE / 01</span>
      </div>
    </section>
  );
}

export function BrandMarquee({
  text = 'Confidence looks good on everyone',
  className,
}: EditableProps & { text?: string }) {
  return (
    <div className={`ggg-marquee ${className ?? ''}`}>
      <span>✳</span>
      <p>{text}</p>
      <span>✳</span>
      <p className="ggg-marquee-repeat" aria-hidden="true">
        Wear your own kind of bold
      </p>
      <span className="ggg-marquee-repeat" aria-hidden="true">
        ✳
      </span>
    </div>
  );
}

export function ApparelCollection({
  products,
  loading = false,
  title = 'Small collection. Big energy.',
  description = 'The everyday rotation, with a little more personality.',
  eyebrow = 'The apparel edit',
  showAllLink = true,
  className,
}: EditableProps & {
  products: Product[];
  loading?: boolean;
  title?: string;
  description?: string;
  eyebrow?: string;
  showAllLink?: boolean;
}) {
  return (
    <section
      aria-labelledby="ggg-collection-heading"
      className={`ggg-collection ggg-container ${className ?? ''}`}
      id="collection"
    >
      <div className="ggg-section-header">
        <div>
          <p className="ggg-eyebrow">{eyebrow}</p>
          <h2 id="ggg-collection-heading">{title}</h2>
          <p>{description}</p>
        </div>
        {showAllLink && (
          <Link className="ggg-text-link" href="/shop">
            Shop the collection
            <ArrowRight size={18} />
          </Link>
        )}
      </div>
      {loading ? (
        <div aria-label="Loading apparel" aria-busy="true" className="ggg-product-grid">
          {[1, 2, 3].map((n) => (
            <div className="ggg-product-skeleton" key={n} />
          ))}
        </div>
      ) : products.length ? (
        <div className="ggg-product-grid">
          {products.map((product, index) => (
            <article className="ggg-product" key={product.id}>
              <Link
                aria-label={`View ${product.title}`}
                className={`ggg-product-image ggg-product-tone-${index % 3}`}
                href={product.href}
              >
                <span className="ggg-product-tag">
                  {index === 2 ? 'THE FINISHING TOUCH' : 'EVERYDAY ROTATION'}
                </span>
                {product.image ? (
                  <Image
                    alt={product.image.alt || product.title}
                    className="ggg-product-photo"
                    fill
                    sizes="(min-width: 900px) 30vw, (min-width: 600px) 45vw, 90vw"
                    src={product.image.src}
                  />
                ) : (
                  <ShoppingBag aria-hidden="true" size={64} />
                )}
                <span aria-hidden="true" className="ggg-product-arrow">
                  <ArrowRight size={22} />
                </span>
              </Link>
              <div className="ggg-product-meta">
                <span>ATLANTA ARMS / APPAREL</span>
                <span>0{index + 1}</span>
              </div>
              <Link className="ggg-product-title" href={product.href}>
                <h3>{product.title}</h3>
              </Link>
              <div className="ggg-product-bottom">
                {product.price ? (
                  <PriceLabel price={product.price} />
                ) : (
                  <span>See product for pricing</span>
                )}
                <Link className="ggg-text-link" href={product.href}>
                  {index === 2 ? 'View details' : 'Choose your size'}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="ggg-empty">
          <h3>The apparel edit is taking a quick break.</h3>
          <p>We couldn’t load the collection. Please refresh the page to try again.</p>
          <button className="ggg-button" onClick={() => window.location.reload()} type="button">
            Try again
            <ArrowRight size={18} />
          </button>
        </div>
      )}
      <p className="ggg-collection-note">Three picks. Endless ways to make them yours.</p>
    </section>
  );
}

export function BrandStory({
  title = brandDefaults.storyTitle,
  description = brandDefaults.storyDescription,
  eyebrow = 'Built on boldness. Rooted in community.',
  image,
  imageAlt = 'Pop-art illustration of a diverse community of women',
  buttonText = 'This is our story',
  buttonLink,
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: { href: string; target?: string };
}) {
  return (
    <section className={`ggg-story ggg-container ${className ?? ''}`}>
      <div className="ggg-story-art">
        <Image
          alt={imageAlt}
          className="ggg-cover"
          fill
          sizes="(min-width: 900px) 50vw, 100vw"
          src={image || '/ggg/who-we-are.webp'}
        />
        <span className="ggg-story-label">
          Different stories.
          <br />
          <em>Shared strength.</em>
        </span>
      </div>
      <div className="ggg-story-copy">
        <span aria-hidden="true" className="ggg-story-star">
          ✳
        </span>
        <p className="ggg-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link
          className="ggg-button ggg-button-outline"
          href={buttonLink?.href && buttonLink.href !== '#' ? buttonLink.href : '/our-story'}
          target={buttonLink?.target}
        >
          {buttonText}
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function BrandValues({
  firstTitle = 'Your own kind of bold',
  firstDescription = 'No one-size-fits-all idea of who you should be. Come as you are.',
  secondTitle = 'Better together',
  secondDescription = 'Different backgrounds. Shared confidence. A place to belong.',
  thirdTitle = 'More than the everyday',
  thirdDescription = 'Wear what speaks to you. Make the ordinary feel a little more yours.',
  className,
}: EditableProps & {
  firstTitle?: string;
  firstDescription?: string;
  secondTitle?: string;
  secondDescription?: string;
  thirdTitle?: string;
  thirdDescription?: string;
}) {
  return (
    <section
      aria-label="What we stand for"
      className={`ggg-values ggg-container ${className ?? ''}`}
    >
      {[
        [firstTitle, firstDescription],
        [secondTitle, secondDescription],
        [thirdTitle, thirdDescription],
      ].map(([title, description], i) => (
        <div key={i}>
          <span className="ggg-value-number">0{i + 1} /</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </section>
  );
}

export function BrandNewsletter({
  title = 'You’re our kind of people.',
  description = 'New arrivals, fresh ideas, and a little community in your inbox. Be part of what’s next.',
  eyebrow = 'Good company. Great inbox.',
  privacyText = 'Only the good stuff. Unsubscribe whenever you like.',
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  eyebrow?: string;
  privacyText?: string;
}) {
  return (
    <section className={`ggg-newsletter ${className ?? ''}`}>
      <div className="ggg-container ggg-newsletter-inner">
        <div>
          <p className="ggg-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="ggg-newsletter-form">
          <p id="ggg-newsletter-label">Join the list</p>
          <div aria-labelledby="ggg-newsletter-label" role="group">
            <InlineEmailForm
              action={subscribe}
              placeholder="Your email address"
              submitLabel="Join the newsletter"
            />
          </div>
          <small>{privacyText}</small>
        </div>
      </div>
    </section>
  );
}

export function BrandFooter({
  brand = 'Give Girls Guns',
  tagline = 'For the bold. For the individual. For each other.',
  artNote = 'Original spirit. AI-assisted illustrations.',
  instagramUrl,
  className,
}: EditableProps & { brand?: string; tagline?: string; artNote?: string; instagramUrl?: string }) {
  return (
    <footer className={`ggg-footer ${className ?? ''}`}>
      <div className="ggg-container">
        <div className="ggg-footer-top">
          <div>
            <Link className="ggg-wordmark" href="/">
              {brand}
              <span className="ggg-wordmark-dot">✳</span>
            </Link>
            <p>{tagline}</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/shop">Shop apparel</Link>
            <Link href="/our-story">Our story</Link>
            <Link href="/get-in-touch">Get in touch</Link>
            <Link href="/account/orders">Your orders</Link>
            {instagramUrl && (
              <a href={instagramUrl} rel="noopener noreferrer" target="_blank">
                Instagram ↗
              </a>
            )}
          </nav>
        </div>
        <div className="ggg-footer-bottom">
          <span>
            © {new Date().getFullYear()} {brand}
          </span>
          <span>{artNote}</span>
          <span>
            Wear your confidence.
            <Heart aria-hidden="true" size={13} />
          </span>
        </div>
      </div>
    </footer>
  );
}

export function BrandPageIntro({
  title = 'Wear your confidence.',
  description = 'A considered edit of everyday apparel. Three pieces. All you.',
  eyebrow = 'The collection',
  className,
}: EditableProps & { title?: string; description?: string; eyebrow?: string }) {
  return (
    <div className={`ggg-page-intro ggg-container ${className ?? ''}`}>
      <p className="ggg-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export function BrandContact({
  title = 'Let’s talk.',
  description = 'A question about your order? An idea worth sharing? We’d love to hear from you.',
  image,
  children,
  className,
}: EditableProps & { title?: string; description?: string; image?: string; children?: ReactNode }) {
  return (
    <section className={`ggg-contact ggg-container ${className ?? ''}`}>
      <div>
        <p className="ggg-eyebrow">Good conversations start here</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="ggg-contact-form">{children}</div>
      </div>
      <div className="ggg-contact-art">
        <Image
          alt="Pop-art women talking on colorful telephones"
          className="ggg-cover"
          fill
          sizes="(min-width: 900px) 45vw, 100vw"
          src={image || '/ggg/contact-us.webp'}
        />
      </div>
    </section>
  );
}

export function BrandAbout({
  title = 'Different stories.\nShared strength.',
  description = brandDefaults.storyDescription,
  secondParagraph = 'We’re here for the women who challenge expectations, celebrate their individuality, and lift each other up along the way. Confidence is personal. Community makes it stronger.',
  image,
  imageAlt = 'An inclusive community of women illustrated in vibrant pop-art colors',
  buttonText = 'Find your everyday bold',
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  secondParagraph?: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
}) {
  return (
    <section className={`ggg-about ggg-container ${className ?? ''}`}>
      <div className="ggg-about-copy">
        <p className="ggg-eyebrow">Our story / Give Girls Guns</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{secondParagraph}</p>
        <Link className="ggg-button" href="/shop">
          {buttonText}
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="ggg-about-art">
        <Image
          alt={imageAlt}
          className="ggg-cover"
          fill
          sizes="(min-width: 900px) 45vw, 100vw"
          src={image || '/ggg/who-we-are.webp'}
        />
      </div>
    </section>
  );
}
