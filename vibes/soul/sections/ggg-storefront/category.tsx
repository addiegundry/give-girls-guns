'use client';

import { ArrowRight } from 'lucide-react';
import { createContext, type ReactNode, useContext, useId } from 'react';

import type { Product } from '@/vibes/soul/primitives/product-card';
import { Compare } from '@/vibes/soul/primitives/product-card/compare';
import { PriceLabel } from '@/vibes/soul/primitives/price-label';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { catalogProductDetails } from '~/lib/product-details';

type Destination = { href: string; target?: string };
type Breadcrumb = { label: string; href: string };

const CategoryContext = createContext<{ title: string; breadcrumbs: Breadcrumb[] } | null>(null);

export function CategoryContentProvider({
  title,
  breadcrumbs,
  children,
}: {
  title: string;
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
}) {
  return (
    <CategoryContext.Provider value={{ title, breadcrumbs }}>{children}</CategoryContext.Provider>
  );
}

export function CategoryHero({
  title,
  subtitle = 'Get to know the lineup, one box at a time.',
  sealImage,
  backgroundImage,
  patternImage,
  showSeal = true,
  showPattern = true,
  className,
}: {
  title?: string;
  subtitle?: string;
  sealImage?: string;
  backgroundImage?: string;
  patternImage?: string;
  showSeal?: boolean;
  showPattern?: boolean;
  className?: string;
}) {
  const context = useContext(CategoryContext);
  const heading = title || context?.title || 'Shop Ammo';
  const breadcrumbs = context?.breadcrumbs.length
    ? context.breadcrumbs
    : [{ label: heading, href: '/shop' }];
  const headingId = useId();

  return (
    <div className={`ggg-category-intro ${className ?? ''}`}>
      <nav aria-label="Breadcrumb" className="ggg-category-breadcrumbs">
        <Link href="/">Home</Link>
        {breadcrumbs.map((crumb, index) => (
          <span className="ggg-category-crumb" key={`${crumb.href}-${index}`}>
            <span aria-hidden="true">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span aria-current="page">{title || crumb.label}</span>
            ) : (
              <Link href={crumb.href}>{crumb.label}</Link>
            )}
          </span>
        ))}
      </nav>
      <section
        aria-labelledby={headingId}
        className={`ggg-category-hero ${showSeal ? 'ggg-category-hero-with-seal' : ''}`}
        style={
          backgroundImage
            ? { backgroundImage: `url(${JSON.stringify(backgroundImage)})` }
            : undefined
        }
      >
        <Image
          alt=""
          aria-hidden="true"
          className="ggg-category-hero-corner"
          height={160}
          src="/ggg/landing/hero-corner-top-left.svg"
          width={400}
        />
        {showSeal && (
          <Image
            alt=""
            aria-hidden="true"
            className="ggg-category-hero-seal"
            height={1200}
            sizes="200px"
            src={sealImage || '/ggg/landing/seal-purple-with-shadow.png'}
            width={1200}
          />
        )}
        {showPattern && (
          <div className="ggg-category-hero-pattern">
            <Image
              alt=""
              aria-hidden="true"
              fill
              sizes="40vw"
              src={patternImage || '/ggg/landing/editorial-pattern-edge.png'}
            />
          </div>
        )}
        <div className="ggg-category-hero-copy">
          <h1 id={headingId}>{heading}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
    </div>
  );
}

export function CategoryCard({
  product,
  buttonText = 'View Details',
  showPrices = false,
  showCompare = false,
  compareLabel,
  compareParamName,
}: {
  product: Product;
  buttonText?: string;
  showPrices?: boolean;
  showCompare?: boolean;
  compareLabel?: string;
  compareParamName?: string;
}) {
  const details = catalogProductDetails({ name: product.title, customFields: [] });
  const subtitle = details.highlights
    .filter(({ name }) => name === 'Caliber' || name === 'Bullet')
    .map(({ value }) => value)
    .join(' · ');

  return (
    <article className="ggg-category-card">
      <Link
        aria-label={`View ${product.title}`}
        className="ggg-category-card-image"
        href={product.href}
      >
        {product.image ? (
          <Image
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 32vw"
            src={product.image.src}
          />
        ) : (
          <span>Product image coming soon</span>
        )}
      </Link>
      <div className="ggg-category-card-copy">
        <h2>
          <Link href={product.href}>{product.title}</Link>
        </h2>
        {subtitle && <p className="ggg-category-card-subtitle">{subtitle}</p>}
        {showPrices && product.price && <PriceLabel price={product.price} />}
        {showCompare && (
          <Compare label={compareLabel} paramName={compareParamName} product={product} />
        )}
        <Link
          aria-label={`${buttonText}: ${product.title}`}
          className="ggg-category-card-button"
          href={product.href}
        >
          {buttonText}
        </Link>
      </div>
    </article>
  );
}

export function CategoryProductGrid({
  products,
  buttonText,
  showPrices,
  loading = false,
}: {
  products: Product[];
  buttonText?: string;
  showPrices?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="ggg-category-shop-products">
      {loading ? (
        <div aria-busy="true" aria-label="Loading products" className="ggg-category-card-grid">
          {[1, 2, 3].map((id) => (
            <div aria-hidden="true" className="ggg-category-card-skeleton" key={id} />
          ))}
        </div>
      ) : (
        <>
          <p aria-live="polite" className="ggg-category-count">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
          {products.length ? (
            <div className="ggg-category-card-grid">
              {products.map((product) => (
                <CategoryCard
                  buttonText={buttonText}
                  key={product.id}
                  product={product}
                  showPrices={showPrices}
                />
              ))}
            </div>
          ) : (
            <div className="ggg-category-empty">
              <h2>No products to show yet.</h2>
              <p>Please check back soon or contact us for help finding what you need.</p>
              <Link href="/get-in-touch">Contact us</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function CategoryBasicsBanner({
  title = 'New to ammo?',
  description = 'Get familiar with the terms you’ll see on every box.',
  buttonText = 'Learn the Basics',
  buttonLink,
  sealImage,
  backgroundImage,
  showSeal = true,
  className,
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: Destination;
  sealImage?: string;
  backgroundImage?: string;
  showSeal?: boolean;
  className?: string;
}) {
  const headingId = useId();
  const href = buttonLink?.href?.trim();

  return (
    <section
      aria-labelledby={headingId}
      className={`ggg-category-basics ${className ?? ''}`}
      style={
        backgroundImage ? { backgroundImage: `url(${JSON.stringify(backgroundImage)})` } : undefined
      }
    >
      {showSeal && (
        <Image
          alt=""
          aria-hidden="true"
          className="ggg-category-basics-seal"
          height={1200}
          sizes="200px"
          src={sealImage || '/ggg/landing/seal-purple-with-shadow.png'}
          width={1200}
        />
      )}
      <div className="ggg-category-basics-copy">
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
      </div>
      <Link href={href && href !== '#' ? href : '/coming-soon'} target={buttonLink?.target}>
        {buttonText}
        <ArrowRight aria-hidden="true" size={30} strokeWidth={1.5} />
      </Link>
      <Image
        alt=""
        aria-hidden="true"
        className="ggg-category-basics-corner"
        height={160}
        src="/ggg/landing/hero-corner-bottom-right.svg"
        width={400}
      />
    </section>
  );
}
