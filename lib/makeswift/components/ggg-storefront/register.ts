import {
  Checkbox,
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
  BrandPageIntro,
  BrandStory,
  BrandValues,
  brandDefaults,
} from '@/vibes/soul/sections/ggg-storefront';
import { runtime } from '~/lib/makeswift/runtime';

import { BrandExtraSections, MSApparelCollection, MSBrandContact } from './client';

const style = () => Style();
const text = (label: string, defaultValue: string) => TextInput({ label, defaultValue });
const paragraph = (label: string, defaultValue: string) => TextArea({ label, defaultValue });

runtime.registerComponent(BrandHeader, {
  type: 'ggg-header',
  label: '3G / Header',
  props: {
    className: style(),
    brand: text('Brand name', 'Give Girls Guns'),
    announcement: text(
      'Announcement',
      'A little attitude. A lot of confidence. Welcome to the club.',
    ),
    shopLabel: text('Shop label', 'Shop apparel'),
    storyLabel: text('Story label', 'Our story'),
    contactLabel: text('Contact label', 'Get in touch'),
  },
});

runtime.registerComponent(BrandHero, {
  type: 'ggg-hero',
  label: '3G / Illustrated hero',
  props: {
    className: style(),
    eyebrow: text('Eyebrow', 'For women who take up space'),
    title: paragraph('Heading', brandDefaults.heroTitle),
    description: paragraph('Description', brandDefaults.heroDescription),
    image: Image({ label: 'Hero artwork (uses supplied artwork by default)' }),
    imageAlt: text('Image description', 'A colorful illustrated lineup of confident women'),
    buttonText: text('Primary button', 'Find your everyday bold'),
    buttonLink: Link({ label: 'Primary destination (defaults to apparel)' }),
    secondaryText: text('Secondary button', 'Meet the community'),
    secondaryLink: Link({ label: 'Secondary destination (defaults to our story)' }),
  },
});

runtime.registerComponent(BrandMarquee, {
  type: 'ggg-marquee',
  label: '3G / Statement strip',
  props: { className: style(), text: text('Statement', 'Confidence looks good on everyone') },
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

runtime.registerComponent(BrandNewsletter, {
  type: 'ggg-newsletter',
  label: '3G / Newsletter signup',
  props: {
    className: style(),
    title: text('Heading', 'You’re our kind of people.'),
    description: paragraph(
      'Description',
      'New arrivals, fresh ideas, and a little community in your inbox. Be part of what’s next.',
    ),
    eyebrow: text('Eyebrow', 'Good company. Great inbox.'),
    privacyText: text('Privacy note', 'Only the good stuff. Unsubscribe whenever you like.'),
  },
});

runtime.registerComponent(BrandFooter, {
  type: 'ggg-footer',
  label: '3G / Footer',
  props: {
    className: style(),
    brand: text('Brand name', 'Give Girls Guns'),
    tagline: text('Tagline', 'For the bold. For the individual. For each other.'),
    artNote: text('Artwork note', 'Original spirit. AI-assisted illustrations.'),
    instagramUrl: text('Instagram profile URL (leave blank to hide)', ''),
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
