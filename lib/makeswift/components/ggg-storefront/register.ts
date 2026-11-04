import {
  Checkbox,
  Combobox,
  Group,
  List,
  Image,
  Slot,
  Style,
  TextArea,
  TextInput,
  Link,
} from '@makeswift/runtime/controls';

import {
  BrandAbout,
  BrandFooter,
  BrandHeader,
  BrandHero,
  BrandMarquee,
  BrandNewsletter,
  RangeDayFeature,
  BrandPageIntro,
  BrandStory,
  BrandValues,
  brandDefaults,
} from '@/vibes/soul/sections/ggg-storefront';
import { runtime } from '~/lib/makeswift/runtime';

import {
  BrandExtraSections,
  MSApparelCollection,
  MSBrandContact,
  MSRangeDayLineup,
} from './client';
import { searchProducts } from '../../utils/search-products';

const style = () => Style();
const text = (label: string, defaultValue: string) => TextInput({ label, defaultValue });
const paragraph = (label: string, defaultValue: string) => TextArea({ label, defaultValue });

runtime.registerComponent(BrandHeader, {
  type: 'ggg-header',
  label: '3G / Header',
  props: {
    className: style(),
    brand: text('Brand name', 'Give Girls Guns'),
    logo: Image({ label: 'Logo (uses brand artwork by default)' }),
    logoLink: Link({ label: 'Logo destination (defaults to home)' }),
    cropLogo: Checkbox({ label: 'Crop original logo canvas', defaultValue: true }),
    shopLabel: text('Shop label', 'Shop the Collection'),
    storyLabel: text('Story label', 'About'),
    contactLabel: text('Contact label', 'Contact'),
    shopLink: Link({ label: 'Collection destination (defaults to shop)' }),
    storyLink: Link({ label: 'About destination (defaults to our story)' }),
    contactLink: Link({ label: 'Contact destination (defaults to contact page)' }),
    additionalLinks: List({
      label: 'Additional navigation links',
      type: Group({
        label: 'Navigation link',
        props: {
          label: text('Label', 'Link'),
          link: Link({ label: 'Destination' }),
        },
      }),
      getItemLabel: (item) => item?.label || 'Navigation link',
    }),
    searchLabel: text('Search heading', 'Search the collection'),
    searchPlaceholder: text('Search placeholder', 'What are you looking for?'),
  },
});

runtime.registerComponent(BrandHero, {
  type: 'ggg-hero',
  label: '3G / Landing hero',
  props: {
    className: style(),
    title: paragraph('Heading', brandDefaults.heroTitle),
    description: paragraph('Description', brandDefaults.heroDescription),
    image: Image({ label: 'Hero artwork (uses supplied artwork by default)' }),
    imageAlt: text(
      'Image description',
      'Specialty Cartridge ammunition displayed on lavender podiums',
    ),
    buttonText: text('Primary button', 'Shop Ammo'),
    buttonLink: Link({ label: 'Primary destination (defaults to shop)' }),
    mobileImage: Image({ label: 'Mobile hero artwork (optional)' }),
    showSeal: Checkbox({ label: 'Show brand seal', defaultValue: true }),
    sealImage: Image({ label: 'Brand seal (uses supplied seal by default)' }),
    showCorners: Checkbox({ label: 'Show decorative corners', defaultValue: true }),
    topCornerImage: Image({ label: 'Upper-left corner artwork' }),
    bottomCornerImage: Image({ label: 'Lower-right corner artwork' }),
  },
});

runtime.registerComponent(BrandMarquee, {
  type: 'ggg-marquee',
  label: '3G / Statement strip',
  props: {
    className: style(),
    text: text('First statement', brandDefaults.bannerFirst),
    secondText: text('Second statement', brandDefaults.bannerSecond),
    thirdText: text('Third statement', brandDefaults.bannerThird),
    fourthText: text('Fourth statement', brandDefaults.bannerFourth),
  },
});

runtime.registerComponent(MSRangeDayLineup, {
  type: 'ggg-lineup',
  label: '3G / Range-day lineup',
  props: {
    className: style(),
    title: paragraph('Heading', 'Meet your range-day lineup.'),
    description: paragraph('Subtitle', 'Three calibers. One bold brand.'),
    buttonText: text('Product button label', 'View Ammo'),
    selectedProducts: List({
      label: 'Product cards (empty uses the three launch calibers)',
      type: Group({
        label: 'Product card',
        props: {
          displayName: text('Display heading (blank uses catalog name)', ''),
          entityId: Combobox({
            label: 'BigCommerce product',
            async getOptions(query) {
              const products = await searchProducts(query);

              return products.map((product) => ({
                id: product.entityId.toString(),
                label: product.name,
                value: product.entityId.toString(),
              }));
            },
          }),
        },
      }),
      getItemLabel: (item) => item?.displayName || 'Product card',
    }),
  },
});

runtime.registerComponent(MSApparelCollection, {
  type: 'ggg-apparel',
  label: '3G / Apparel collection',
  props: {
    className: style(),
    title: text('Heading', 'Small collection. Big energy.'),
    description: paragraph('Description', 'The everyday rotation, with a little more personality.'),
    eyebrow: text('Eyebrow', 'The apparel edit'),
    showAllLink: Checkbox({ label: 'Show collection link', defaultValue: true }),
  },
});

runtime.registerComponent(BrandStory, {
  type: 'ggg-story',
  label: '3G / Community story',
  props: {
    className: style(),
    title: paragraph('Heading', brandDefaults.storyTitle),
    description: paragraph('Story', brandDefaults.storyDescription),
    eyebrow: text('Eyebrow', 'Built on boldness. Rooted in community.'),
    image: Image({ label: 'Community artwork' }),
    imageAlt: text('Image description', 'Pop-art illustration of a diverse community of women'),
    buttonText: text('Button text', 'This is our story'),
    buttonLink: Link({ label: 'Destination (defaults to our story)' }),
  },
});

runtime.registerComponent(BrandValues, {
  type: 'ggg-values',
  label: '3G / Three values',
  props: {
    className: style(),
    firstTitle: text('First heading', 'Your own kind of bold'),
    firstDescription: paragraph(
      'First description',
      'No one-size-fits-all idea of who you should be. Come as you are.',
    ),
    secondTitle: text('Second heading', 'Better together'),
    secondDescription: paragraph(
      'Second description',
      'Different backgrounds. Shared confidence. A place to belong.',
    ),
    thirdTitle: text('Third heading', 'More than the everyday'),
    thirdDescription: paragraph(
      'Third description',
      'Wear what speaks to you. Make the ordinary feel a little more yours.',
    ),
  },
});

runtime.registerComponent(RangeDayFeature, {
  type: 'ggg-range-day',
  label: '3G / Make it a range day',
  props: {
    className: style(),
    title: paragraph('Heading', 'Make it a\nrange day.'),
    description: paragraph('Description', 'Find your caliber. Plan your next trip.'),
    buttonText: text('Link label', 'Explore the Collection'),
    buttonLink: Link({ label: 'Destination (defaults to shop)' }),
    image: Image({ label: 'Editorial image (uses supplied artwork by default)' }),
    imageAlt: text(
      'Image description',
      'Woman wearing purple hearing protection and safety glasses at an outdoor shooting range',
    ),
    showPattern: Checkbox({ label: 'Show monogram pattern', defaultValue: true }),
    patternImage: Image({ label: 'Monogram edge artwork (optional)' }),
  },
});

runtime.registerComponent(BrandNewsletter, {
  type: 'ggg-newsletter',
  label: '3G / Newsletter signup',
  props: {
    className: style(),
    title: text('Heading', 'Stay in the loop.'),
    description: paragraph('Description (optional)', ''),
    placeholder: text('Email placeholder', 'Enter your email'),
    buttonText: text('Submit label', 'Sign Up'),
    privacyText: text('Privacy note (optional)', ''),
  },
});

runtime.registerComponent(BrandFooter, {
  type: 'ggg-footer',
  label: '3G / Footer',
  props: {
    className: style(),
    brand: text('Brand name', 'Give Girls Guns'),
    logo: Image({ label: 'Logo (uses brand artwork by default)' }),
    logoLink: Link({ label: 'Logo destination (defaults to home)' }),
    cropLogo: Checkbox({ label: 'Crop original logo canvas', defaultValue: true }),
    shopLabel: text('Shop label', 'Shop'),
    storyLabel: text('About label', 'About'),
    contactLabel: text('Contact label', 'Contact'),
    privacyLabel: text('Privacy label', 'Privacy'),
    shopLink: Link({ label: 'Shop destination' }),
    storyLink: Link({ label: 'About destination' }),
    contactLink: Link({ label: 'Contact destination' }),
    privacyLink: Link({ label: 'Privacy destination (defaults to store privacy policy)' }),
    additionalLinks: List({
      label: 'Additional footer links',
      type: Group({
        label: 'Footer link',
        props: { label: text('Label', 'Link'), link: Link({ label: 'Destination' }) },
      }),
      getItemLabel: (item) => item?.label || 'Footer link',
    }),
    instagramUrl: text(
      'Instagram URL (blank hides icon)',
      'https://www.instagram.com/Atlanta_Arms/',
    ),
    showCorner: Checkbox({ label: 'Show decorative corner', defaultValue: true }),
    cornerImage: Image({ label: 'Corner artwork (optional)' }),
  },
});

runtime.registerComponent(BrandPageIntro, {
  type: 'ggg-page-intro',
  label: '3G / Page introduction',
  props: {
    className: style(),
    title: text('Heading', 'Wear your confidence.'),
    description: paragraph(
      'Description',
      'A considered edit of everyday apparel. Three pieces. All you.',
    ),
    eyebrow: text('Eyebrow', 'The collection'),
  },
});

runtime.registerComponent(MSBrandContact, {
  type: 'ggg-contact',
  label: '3G / Contact introduction',
  props: {
    className: style(),
    title: text('Heading', 'Let’s talk.'),
    description: paragraph(
      'Description',
      'A question about your order? An idea worth sharing? We’d love to hear from you.',
    ),
    image: Image({ label: 'Contact artwork' }),
  },
});

runtime.registerComponent(BrandExtraSections, {
  type: 'ggg-extra',
  label: '3G / Additional sections',
  props: { className: style(), children: Slot() },
});

runtime.registerComponent(BrandAbout, {
  type: 'ggg-about',
  label: '3G / About the community',
  props: {
    className: style(),
    title: paragraph('Heading', 'Different stories.\nShared strength.'),
    description: paragraph('Introduction', brandDefaults.storyDescription),
    secondParagraph: paragraph(
      'Our purpose',
      'We’re here for the women who challenge expectations, celebrate their individuality, and lift each other up along the way. Confidence is personal. Community makes it stronger.',
    ),
    image: Image({ label: 'Community artwork' }),
    imageAlt: text(
      'Image description',
      'An inclusive community of women illustrated in vibrant pop-art colors',
    ),
    buttonText: text('Shop button', 'Find your everyday bold'),
  },
});

runtime.registerComponent(MSApparelCollection, {
  type: 'ggg-shop-apparel',
  label: '3G / Shop apparel grid',
  props: {
    className: style(),
    title: text('Heading', 'The everyday rotation.'),
    description: paragraph(
      'Description',
      'Choose a piece to explore the details and available options.',
    ),
    eyebrow: text('Eyebrow', 'Three pieces. All you.'),
    showAllLink: Checkbox({ label: 'Show collection link', defaultValue: false }),
  },
});
