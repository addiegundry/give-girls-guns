import {
  Checkbox,
  Image,
  Group,
  List,
  Select,
  Slot,
  TextArea,
  TextInput,
} from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { DescriptionSource, MakeswiftProductDetail } from './client';

export const COMPONENT_TYPE = 'catalyst-makeswift-product-detail-description';

const description = Group({
  label: 'Description',
  props: {
    source: Select({
      label: 'Source',
      options: [
        { label: 'Catalog (plain text)', value: DescriptionSource.CatalogPlainText },
        { label: 'Catalog (rich text)', value: DescriptionSource.CatalogRichText },
        { label: 'Custom', value: DescriptionSource.Custom },
      ],
      defaultValue: DescriptionSource.CatalogRichText,
    }),
    slot: Slot(),
  },
});

runtime.registerComponent(MakeswiftProductDetail, {
  type: COMPONENT_TYPE,
  label: 'MakeswiftProductDetail (private)',
  hidden: true,
  props: {
    design: Group({
      label: 'Product page design',
      props: {
        headline: TextArea({
          label: 'Headline (blank uses catalog caliber or title)',
          defaultValue: '',
        }),
        badge: TextInput({ label: 'Collection badge (blank uses catalog)', defaultValue: '' }),
        cartLabel: TextInput({ label: 'Add to bag label', defaultValue: 'Add to Bag' }),
        detailHeading: TextArea({
          label: 'Details heading (blank uses catalog)',
          defaultValue: '',
        }),
        detailCopy: TextArea({
          label: 'Details introduction',
          defaultValue: 'Check product specifications and purchase requirements before ordering.',
        }),
        detailsLabel: TextInput({ label: 'Details tab label', defaultValue: 'Details' }),
        specificationsLabel: TextInput({
          label: 'Specifications tab label',
          defaultValue: 'Specifications',
        }),
        shippingLabel: TextInput({
          label: 'Shipping tab label',
          defaultValue: 'Shipping & Returns',
        }),
        shippingLinkLabel: TextInput({
          label: 'Shipping link label',
          defaultValue: 'Shipping & purchase requirements',
        }),
        shippingCopy: TextArea({
          label: 'Shipping introduction',
          defaultValue:
            'Questions about shipping, returns, or purchase requirements? Contact us before ordering.',
        }),
        shippingContent: Slot({ unstable_placeholder: { builderOnly: true } }),
        expandDescription: Checkbox({
          label: 'Expand full description by default',
          defaultValue: false,
        }),
        showHighlights: Checkbox({ label: 'Show catalog fact cards', defaultValue: true }),
        showBanner: Checkbox({ label: 'Show brand banner', defaultValue: true }),
        bannerTitle: TextInput({
          label: 'Brand banner heading',
          defaultValue: 'Make it a range day.',
        }),
        bannerSeal: Image({ label: 'Brand banner seal (optional)' }),
        bannerBackground: Image({ label: 'Brand banner background (optional)' }),
        showRelated: Checkbox({ label: 'Show related products', defaultValue: true }),
        relatedTitle: TextInput({
          label: 'Related products heading',
          defaultValue: 'Complete your lineup.',
        }),
        relatedButtonText: TextInput({
          label: 'Related product button label',
          defaultValue: 'View Ammo',
        }),
        extraContent: Slot({ unstable_placeholder: { builderOnly: true } }),
      },
    }),
    summaryText: TextArea({
      label: 'Summary',
    }),
    description,
    accordions: List({
      label: 'Product info',
      type: Group({
        label: 'Product info section',
        props: {
          title: TextInput({ label: 'Title', defaultValue: 'Section' }),
          content: Slot(),
        },
      }),
      getItemLabel: (section) => section?.title || 'Section',
    }),
  },
});
