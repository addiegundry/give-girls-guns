'use client';

import { Box, ImageOff, Package, Tag } from 'lucide-react';
import { type ReactNode, useId, useState } from 'react';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { PriceLabel } from '@/vibes/soul/primitives/price-label';
import { RangeDayLineup } from '@/vibes/soul/sections/ggg-storefront/range-day-lineup';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import type { CatalogProductDetails, ProductSpecification } from '~/lib/product-details';

import { type ProductDetailProps, ProductDetailSkeleton } from './index';
import { ProductDetailForm } from './product-detail-form';
import { ProductGallery } from './product-gallery';
import { type Field } from './schema';

export interface PdpDesign {
  headline?: string;
  badge?: string;
  cartLabel?: string;
  detailHeading?: string;
  detailCopy?: string;
  detailsLabel?: string;
  specificationsLabel?: string;
  shippingLabel?: string;
  shippingContent?: ReactNode;
  shippingCopy?: string;
  shippingLinkLabel?: string;
  expandDescription?: boolean;
  showHighlights?: boolean;
  showBanner?: boolean;
  bannerTitle?: string;
  bannerSeal?: string;
  bannerBackground?: string;
  showRelated?: boolean;
  relatedTitle?: string;
  relatedButtonText?: string;
  extraContent?: ReactNode;
}

const emptyDetails: CatalogProductDetails = { specifications: [], highlights: [] };

function Specifications({ rows }: { rows: ProductSpecification[] }) {
  return rows.length ? (
    <dl className="ggg-pdp-specifications">
      {rows.map(({ name, value }, index) => (
        <div key={`${name}-${index}`}>
          <dt>{name}:</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  ) : (
    <p className="ggg-pdp-information-note">Contact us for more information about this product.</p>
  );
}

function ProductInformation({
  title,
  description,
  details,
  accordions,
  design,
  id,
  activeTab,
  setActiveTab,
}: {
  title: string;
  description?: ReactNode;
  details: CatalogProductDetails;
  accordions?: Array<{ title: string; content: ReactNode }>;
  design: PdpDesign;
  id: string;
  activeTab: number;
  setActiveTab: (index: number) => void;
}) {
  const tabs = [
    design.detailsLabel || 'Details',
    design.specificationsLabel || 'Specifications',
    design.shippingLabel || 'Shipping & Returns',
  ];
  const extraSections = accordions?.filter(
    (section) => section.title.toLowerCase() !== 'specifications',
  );

  return (
    <div className="ggg-pdp-information" id={`${id}-information`}>
      <div aria-label="Product information" className="ggg-pdp-tabs" role="tablist">
        {tabs.map((label, index) => (
          <button
            aria-controls={`${id}-panel-${index}`}
            aria-selected={activeTab === index}
            id={`${id}-tab-${index}`}
            key={index}
            onClick={() => setActiveTab(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
              else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = tabs.length - 1;
              else return;
              event.preventDefault();
              setActiveTab(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
            role="tab"
            tabIndex={activeTab === index ? 0 : -1}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      {tabs.map((_, index) => (
        <div
          aria-labelledby={`${id}-tab-${index}`}
          className="ggg-pdp-tab-panel"
          hidden={activeTab !== index}
          id={`${id}-panel-${index}`}
          key={index}
          role="tabpanel"
          tabIndex={0}
        >
          {index === 0 && (
            <div className="ggg-pdp-details-grid">
              <div>
                <h2>
                  {design.detailHeading ||
                    (details.caliber
                      ? `Meet your next box of ${details.collection ? `${details.collection} ` : ''}${details.caliber}.`
                      : `Meet ${title}.`)}
                </h2>
                <p>
                  {design.detailCopy ||
                    'Check product specifications and purchase requirements before ordering.'}
                </p>
                {description && (
                  <details className="ggg-pdp-description" open={design.expandDescription}>
                    <summary>Read the full product description</summary>
                    <div className="prose max-w-none">{description}</div>
                  </details>
                )}
              </div>
              <Specifications rows={details.specifications} />
            </div>
          )}
          {index === 1 && (
            <div>
              <Specifications rows={details.specifications} />
              {extraSections?.map((section, sectionIndex) => (
                <details className="ggg-pdp-extra-information" key={sectionIndex}>
                  <summary>{section.title}</summary>
                  <div className="prose max-w-none">{section.content}</div>
                </details>
              ))}
            </div>
          )}
          {index === 2 && (
            <div className="ggg-pdp-shipping prose max-w-none">
              <h3>Shipping & purchase requirements</h3>
              <p>
                {design.shippingCopy ||
                  'Questions about shipping, returns, or purchase requirements? Contact us before ordering.'}
              </p>
              {design.shippingContent}
              <Link href="/get-in-touch">Contact us</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function BrandedProductDetail({
  design = {},
  ...props
}: ProductDetailProps<Field> & { design?: PdpDesign }) {
  const id = useId();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="ggg-pdp">
      <Stream fallback={<ProductDetailSkeleton />} value={props.product}>
        {(product) =>
          product && (
            <Stream
              fallback={<ProductDetailSkeleton />}
              value={Streamable.all([
                product.images,
                product.price,
                props.fields,
                product.catalogDetails,
                product.description,
                product.accordions,
              ])}
            >
              {([images, price, fields, catalogDetails, description, accordions]) => {
                const details = catalogDetails || emptyDetails;
                const badge = design.badge || details.collection || product.subtitle;
                const styledFields = fields.map<Field>((field) => {
                  if (
                    (field.type === 'select' || field.type === 'button-radio-group') &&
                    field.options.length <= 6
                  )
                    return { ...field, type: 'radio-group' };
                  return field;
                });

                return (
                  <>
                    <section aria-labelledby={`${id}-title`} className="ggg-pdp-product">
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="ggg-pdp-top-corner"
                        height={160}
                        src="/ggg/landing/hero-corner-top-left.svg"
                        width={400}
                      />
                      <nav aria-label="Breadcrumb" className="ggg-pdp-breadcrumbs">
                        <Link href="/">Home</Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/shop">{details.caliber ? 'Ammo' : 'Shop'}</Link>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">{product.title}</span>
                      </nav>
                      <div className="ggg-pdp-product-grid">
                        <div
                          className={`ggg-pdp-gallery ${images.images.length < 2 && !images.pageInfo?.hasNextPage ? 'ggg-pdp-single-image' : ''}`}
                        >
                          {images.images.length ? (
                            <ProductGallery
                              aspectRatio="5:4"
                              images={images.images.map((image) => ({
                                ...image,
                                alt: image.alt || product.title,
                              }))}
                              key={images.images[0]?.src}
                              loadMoreAction={props.loadMoreImagesAction}
                              pageInfo={images.pageInfo}
                              productId={Number(product.id)}
                              thumbnailLabel={props.thumbnailLabel}
                            />
                          ) : (
                            <div className="ggg-pdp-missing-image">
                              <ImageOff aria-hidden="true" size={48} />
                              <span>Product image coming soon</span>
                            </div>
                          )}
                        </div>
                        <div className="ggg-pdp-purchase">
                          {badge && <span className="ggg-pdp-badge">{badge}</span>}
                          <h1 id={`${id}-title`}>
                            {design.headline ||
                              (details.caliber
                                ? `${details.caliber}. Range-day ready.`
                                : product.title)}
                          </h1>
                          {details.caliber && (
                            <p className="ggg-pdp-product-name">{product.title}</p>
                          )}
                          <Stream fallback={null} value={product.summary}>
                            {(summary) =>
                              summary ? <p className="ggg-pdp-summary">{summary}</p> : null
                            }
                          </Stream>
                          <div className="ggg-pdp-price">
                            {price ? (
                              <PriceLabel price={price} />
                            ) : (
                              <p>Select options for pricing</p>
                            )}
                          </div>
                          {props.promotionCallouts && (
                            <Stream fallback={null} value={props.promotionCallouts}>
                              {(callouts) =>
                                callouts.map((callout) => (
                                  <p className="ggg-pdp-promotion" key={callout.id}>
                                    {callout.text}
                                  </p>
                                ))
                              }
                            </Stream>
                          )}
                          <div className="ggg-pdp-form">
                            <Stream
                              fallback={<p>Loading purchase options…</p>}
                              value={Streamable.all([
                                props.ctaLabel,
                                props.ctaDisabled,
                                product.minQuantity,
                                product.maxQuantity,
                                product.stockDisplayData,
                                product.backorderDisplayData,
                              ])}
                            >
                              {([
                                ctaLabel,
                                ctaDisabled,
                                minQuantity,
                                maxQuantity,
                                stockDisplayData,
                                backorderDisplayData,
                              ]) => (
                                <ProductDetailForm
                                  action={props.action}
                                  backorderDisplayData={backorderDisplayData ?? undefined}
                                  ctaDisabled={ctaDisabled ?? false}
                                  ctaLabel={
                                    !ctaDisabled &&
                                    (!ctaLabel || ctaLabel.toLowerCase() === 'add to cart')
                                      ? design.cartLabel || 'Add to Bag'
                                      : ctaLabel || undefined
                                  }
                                  decrementLabel={props.decrementLabel}
                                  emptySelectPlaceholder={props.emptySelectPlaceholder}
                                  fields={styledFields}
                                  incrementLabel={props.incrementLabel}
                                  maxQuantity={maxQuantity ?? undefined}
                                  minQuantity={minQuantity ?? undefined}
                                  prefetch={props.prefetch}
                                  productId={product.id}
                                  quantityLabel={props.quantityLabel}
                                  stockDisplayData={stockDisplayData ?? undefined}
                                />
                              )}
                            </Stream>
                          </div>
                          {props.additionalActions && (
                            <div className="ggg-pdp-save">{props.additionalActions}</div>
                          )}
                          <button
                            className="ggg-pdp-shipping-link"
                            onClick={() => {
                              setActiveTab(2);
                              document
                                .getElementById(`${id}-information`)
                                ?.scrollIntoView({ block: 'start' });
                              document
                                .getElementById(`${id}-tab-2`)
                                ?.focus({ preventScroll: true });
                            }}
                            type="button"
                          >
                            {design.shippingLinkLabel || 'Shipping & purchase requirements'}
                          </button>
                          {product.showRating && Boolean(product.numberOfReviews) && (
                            <Link
                              className="ggg-pdp-reviews-link"
                              href="#reviews"
                              onClick={() => {
                                const reviews = document.getElementById('reviews');
                                if (reviews instanceof HTMLDetailsElement) reviews.open = true;
                              }}
                            >
                              Read {product.numberOfReviews} reviews
                            </Link>
                          )}
                        </div>
                      </div>
                      {design.showHighlights !== false && details.highlights.length > 0 && (
                        <div className="ggg-pdp-highlights">
                          {details.highlights.map((fact, index) => {
                            const Icon = [Tag, Package, Box][index] || Tag;
                            return (
                              <div key={fact.name}>
                                <Icon aria-hidden="true" size={32} strokeWidth={1.5} />
                                <span>
                                  <small>{fact.name}</small>
                                  {fact.value}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <ProductInformation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        accordions={accordions}
                        description={description}
                        design={design}
                        details={details}
                        id={id}
                        title={product.title}
                      />
                      {design.extraContent}
                    </section>
                    {design.showBanner !== false && (
                      <div
                        className="ggg-pdp-brand-banner"
                        style={
                          design.bannerBackground
                            ? { backgroundImage: `url(${JSON.stringify(design.bannerBackground)})` }
                            : undefined
                        }
                      >
                        <Image
                          alt=""
                          aria-hidden="true"
                          className="ggg-pdp-banner-corner-top"
                          height={160}
                          src="/ggg/landing/hero-corner-top-left.svg"
                          width={400}
                        />
                        <Image
                          alt=""
                          aria-hidden="true"
                          className="ggg-pdp-banner-seal"
                          height={1200}
                          sizes="180px"
                          src={design.bannerSeal || '/ggg/landing/seal-purple-with-shadow.png'}
                          width={1200}
                        />
                        <p>{design.bannerTitle || 'Make it a range day.'}</p>
                        <Image
                          alt=""
                          aria-hidden="true"
                          className="ggg-pdp-banner-corner-bottom"
                          height={160}
                          src="/ggg/landing/hero-corner-bottom-right.svg"
                          width={400}
                        />
                      </div>
                    )}
                    {design.showRelated !== false && props.relatedProducts && (
                      <Stream fallback={null} value={props.relatedProducts}>
                        {(related) =>
                          related.length > 0 && (
                            <div className="ggg-pdp-related">
                              <RangeDayLineup
                                buttonText={design.relatedButtonText || 'View Ammo'}
                                description=""
                                products={related
                                  .filter((item) => item.id !== product.id)
                                  .slice(0, 2)}
                                title={design.relatedTitle || 'Complete your lineup.'}
                              />
                              <Image
                                alt=""
                                aria-hidden="true"
                                className="ggg-pdp-related-pattern"
                                height={2400}
                                sizes="15vw"
                                src="/ggg/landing/editorial-pattern-edge.png"
                                width={1200}
                              />
                            </div>
                          )
                        }
                      </Stream>
                    )}
                  </>
                );
              }}
            </Stream>
          )
        }
      </Stream>
    </div>
  );
}
