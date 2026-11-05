'use client';

import { ArrowRight, Menu, ShoppingBag, X } from 'lucide-react';
import { ReactNode, useEffect, useId, useRef, useState } from 'react';

import { PriceLabel } from '@/vibes/soul/primitives/price-label';
import { Product } from '@/vibes/soul/primitives/product-card';
import { CartCountBadge } from '~/components/ggg-storefront/cart-count';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { useRouter } from '~/i18n/routing';

export const brandDefaults = {
  heroTitle: "We're Not\nEmpowered.\nWe're Locked\n& Loaded",
  heroDescription: 'Meet the Give Girls Guns ammo lineup.',
  bannerFirst: 'FIND YOUR CALIBER',
  bannerSecond: 'MAKE IT A RANGE DAY',
  bannerThird: 'CONFIDENCE IN EVERY ROUND',
  bannerFourth: 'GIVE GIRLS GUNS',
  storyTitle: 'More than a look.\nA whole movement.',
  storyDescription:
    'Give Girls Guns is a community built on confidence, individuality, and showing up for one another. We believe women deserve to take up space, write their own stories, and feel at home being themselves.',
};

type EditableProps = { className?: string };
type EditableLink = { href: string; target?: string };
type NavigationItem = { label?: string; link?: EditableLink };

function linkDestination(link: EditableLink | undefined, fallback: string) {
  const href = link?.href?.trim();

  return href && href !== '#' ? href : fallback;
}

export function BrandHeader({
  brand = 'Give Girls Guns',
  shopLabel = 'Shop the Collection',
  storyLabel = 'About',
  contactLabel = 'Contact',
  shopLink,
  storyLink,
  contactLink,
  additionalLinks = [],
  logo,
  logoLink,
  cropLogo = true,
  searchLabel = 'Search the collection',
  searchPlaceholder = 'What are you looking for?',
  className,
}: EditableProps & {
  brand?: string;
  shopLabel?: string;
  storyLabel?: string;
  contactLabel?: string;
  shopLink?: EditableLink;
  storyLink?: EditableLink;
  contactLink?: EditableLink;
  additionalLinks?: NavigationItem[];
  logo?: string;
  logoLink?: EditableLink;
  cropLogo?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuId = useId();
  const searchId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const links = [
    { href: linkDestination(shopLink, '/shop'), target: shopLink?.target, label: shopLabel },
    {
      href: linkDestination(storyLink, '/our-story'),
      target: storyLink?.target,
      label: storyLabel,
    },
    {
      href: linkDestination(contactLink, '/get-in-touch'),
      target: contactLink?.target,
      label: contactLabel,
    },
    ...additionalLinks.map(({ label, link }) => ({
      href: linkDestination(link, '/shop'),
      target: link?.target,
      label,
    })),
  ];

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  return (
    <header
      className={`ggg-landing-header ${className ?? ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          if (searchOpen) searchButton.current?.focus();
          else if (open) menuButton.current?.focus();
          setSearchOpen(false);
          setOpen(false);
        }
      }}
    >
      <a className="ggg-skip" href="#main-content">
        Skip to content
      </a>
      <div className="ggg-landing-nav">
        <Link
          aria-label={`${brand} home`}
          className={`ggg-landing-logo ${cropLogo ? 'ggg-landing-logo-cropped' : ''}`}
          href={linkDestination(logoLink, '/')}
          onClick={() => {
            setOpen(false);
            setSearchOpen(false);
          }}
          target={logoLink?.target}
        >
          <Image
            alt=""
            height={1000}
            sizes="(max-width: 700px) 125px, 15vw"
            preload
            src={logo || '/ggg/landing/logo-main.png'}
            width={1000}
          />
        </Link>
        <nav aria-label="Main navigation" className="ggg-landing-desktop-nav">
          {links.map(({ href, target, label }) => (
            <Link href={href} key={`${href}-${label}`} target={target}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="ggg-landing-nav-actions">
          <button
            aria-controls={searchId}
            aria-expanded={searchOpen}
            aria-label={searchOpen ? 'Close search' : 'Search products'}
            className="ggg-landing-icon"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setOpen(false);
            }}
            ref={searchButton}
            type="button"
          >
            {searchOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Image alt="" height={30} src="/ggg/landing/icon-search.svg" width={30} />
            )}
          </button>
          <Link
            aria-describedby="ggg-cart-count"
            aria-label="Shopping bag"
            className="ggg-landing-icon ggg-bag-link"
            href="/cart"
            onClick={() => {
              setOpen(false);
              setSearchOpen(false);
            }}
          >
            <Image alt="" height={30} src="/ggg/landing/icon-bag.svg" width={30} />
            <CartCountBadge />
          </Link>
          <button
            aria-controls={menuId}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="ggg-landing-icon ggg-landing-menu-toggle"
            onClick={() => {
              setOpen(!open);
              setSearchOpen(false);
            }}
            ref={menuButton}
            type="button"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        aria-label="Mobile navigation"
        className="ggg-landing-mobile-nav"
        hidden={!open}
        id={menuId}
      >
        {links.map(({ href, target, label }) => (
          <Link href={href} key={`${href}-${label}`} onClick={() => setOpen(false)} target={target}>
            {label}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        ))}
      </nav>
      <div className="ggg-landing-search" hidden={!searchOpen} id={searchId}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const term = searchInput.current?.value.trim();

            if (term) {
              setSearchOpen(false);
              router.push(`/search?term=${encodeURIComponent(term)}`);
            }
          }}
          role="search"
        >
          <label htmlFor={`${searchId}-input`}>{searchLabel}</label>
          <div className="ggg-landing-search-field">
            <input
              id={`${searchId}-input`}
              name="term"
              placeholder={searchPlaceholder}
              ref={searchInput}
              required
              type="search"
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </header>
  );
}

export function BrandHero({
  title = brandDefaults.heroTitle,
  description = brandDefaults.heroDescription,
  image,
  imageAlt = 'Specialty Cartridge ammunition displayed on lavender podiums',
  buttonText = 'Shop Ammo',
  buttonLink,
  mobileImage,
  sealImage,
  topCornerImage,
  bottomCornerImage,
  showSeal = true,
  showCorners = true,
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: EditableLink;
  mobileImage?: string;
  sealImage?: string;
  topCornerImage?: string;
  bottomCornerImage?: string;
  showSeal?: boolean;
  showCorners?: boolean;
}) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={`ggg-landing-hero ${className ?? ''}`}>
      <div className={`ggg-landing-hero-art ${mobileImage ? 'ggg-landing-has-mobile-art' : ''}`}>
        {mobileImage && (
          <Image
            alt={imageAlt}
            className="ggg-landing-mobile-art"
            fill
            sizes="100vw"
            src={mobileImage}
          />
        )}
        <Image
          className="ggg-landing-desktop-art"
          alt={imageAlt}
          fill
          preload
          sizes="(max-width: 700px) 160vw, 100vw"
          src={image || '/ggg/landing/hero-background.png'}
        />
        {showSeal && (
          <Image
            alt=""
            aria-hidden="true"
            className="ggg-landing-hero-seal"
            height={1200}
            sizes="(max-width: 700px) 110px, 18vw"
            src={sealImage || '/ggg/landing/seal-purple-with-shadow.png'}
            width={1200}
          />
        )}
      </div>
      {showCorners && (
        <Image
          alt=""
          aria-hidden="true"
          className="ggg-landing-hero-corner ggg-landing-hero-corner-top"
          height={160}
          src={topCornerImage || '/ggg/landing/hero-corner-top-left.svg'}
          width={400}
        />
      )}
      <div className="ggg-landing-hero-copy">
        <h1 id={headingId}>{title}</h1>
        <p>{description}</p>
        <Link
          className="ggg-landing-hero-button"
          href={buttonLink?.href && buttonLink.href !== '#' ? buttonLink.href : '/shop'}
          target={buttonLink?.target}
        >
          {buttonText}
        </Link>
      </div>
      {showCorners && (
        <Image
          alt=""
          aria-hidden="true"
          className="ggg-landing-hero-corner ggg-landing-hero-corner-bottom"
          height={160}
          src={bottomCornerImage || '/ggg/landing/hero-corner-bottom-right.svg'}
          width={400}
        />
      )}
    </section>
  );
}

export function BrandMarquee({
  text = brandDefaults.bannerFirst,
  secondText = brandDefaults.bannerSecond,
  thirdText = brandDefaults.bannerThird,
  fourthText = brandDefaults.bannerFourth,
  className,
}: EditableProps & {
  text?: string;
  secondText?: string;
  thirdText?: string;
  fourthText?: string;
}) {
  const statements = [
    { id: 'first', text },
    { id: 'second', text: secondText },
    { id: 'third', text: thirdText },
    { id: 'fourth', text: fourthText },
  ];

  return (
    <div
      aria-label="Give Girls Guns statements"
      className={`ggg-marquee ${className ?? ''}`}
      role="region"
      tabIndex={0}
    >
      <ul>
        {statements.map((statement, index) => (
          <li key={statement.id}>
            {index > 0 && (
              <Image
                alt=""
                aria-hidden="true"
                height={20}
                src="/ggg/landing/divider-flower-pink.svg"
                width={20}
              />
            )}
            <span>{statement.text}</span>
          </li>
        ))}
      </ul>
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

export { BrandNewsletter, BrandFooter, RangeDayFeature } from './landing-closing';

export function BrandComingSoon({
  title = 'Coming soon.',
  description = 'Ammo basics are on the way. In the meantime, explore the collection.',
  buttonText = 'Shop Ammo',
  buttonLink,
  className,
}: EditableProps & {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: EditableLink;
}) {
  return (
    <section className={`ggg-coming-soon ${className ?? ''}`}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link
        className="ggg-landing-hero-button"
        href={linkDestination(buttonLink, '/shop')}
        target={buttonLink?.target}
      >
        {buttonText}
      </Link>
    </section>
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
