'use client';

import { useId } from 'react';

import { Product } from '@/vibes/soul/primitives/product-card';
import { Image } from '~/components/image';
import { Link } from '~/components/link';

export interface RangeDayLineupProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  loading?: boolean;
  products: Array<Product & { displayName?: string }>;
}

export function RangeDayLineup({
  className,
  title = 'Meet your range-day lineup.',
  description = 'Three calibers. One bold brand.',
  buttonText = 'View Ammo',
  loading = false,
  products,
}: RangeDayLineupProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={`ggg-lineup ${className ?? ''}`}
      id="collection"
    >
      <div className="ggg-lineup-inner">
        <div className="ggg-lineup-heading">
          <h2 id={headingId}>{title}</h2>
          <p>{description}</p>
        </div>
        {loading ? (
          <div aria-busy="true" aria-label="Loading ammunition lineup" className="ggg-lineup-grid">
            {[1, 2, 3].map((id) => (
              <div aria-hidden="true" className="ggg-lineup-skeleton" key={id} />
            ))}
          </div>
        ) : products.length ? (
          <div className="ggg-lineup-grid">
            {products.map((product) => (
              <article className="ggg-lineup-card" key={product.id}>
                <Link
                  aria-label={`View ${product.title}`}
                  className="ggg-lineup-image"
                  href={product.href}
                >
                  {product.image ? (
                    <Image
                      alt={product.image.alt || product.title}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 900px) 44vw, 30vw"
                      src={product.image.src}
                    />
                  ) : (
                    <span>Image unavailable</span>
                  )}
                </Link>
                <div className="ggg-lineup-card-copy">
                  <h3>
                    <Link href={product.href}>{product.displayName || product.title}</Link>
                  </h3>
                  <Link
                    aria-label={`${buttonText}: ${product.title}`}
                    className="ggg-lineup-button"
                    href={product.href}
                  >
                    {buttonText}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="ggg-lineup-empty" role="status">
            <p>We couldn’t load the lineup. Please refresh the page to try again.</p>
            <Link className="ggg-lineup-button" href="/shop">
              Explore the collection
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
