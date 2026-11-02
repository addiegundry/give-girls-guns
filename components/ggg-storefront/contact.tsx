import { DynamicForm } from '@/vibes/soul/form/dynamic-form';
import { Field } from '@/vibes/soul/form/dynamic-form/schema';
import { submitContactForm } from '~/app/[locale]/(default)/webpages/[id]/contact/_actions/submit-contact-form';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { Link } from '~/components/link';
import { getRecaptchaSiteKey } from '~/lib/recaptcha';

const ContactDetailsQuery = graphql(`
  query GGGContactDetails {
    site {
      settings {
        contact {
          email
          phone
        }
      }
      content {
        pages(first: 50) {
          edges {
            node {
              __typename
              ... on ContactPage {
                entityId
              }
            }
          }
        }
      }
    }
  }
`);

export async function StoreContactForm({ success }: { success: boolean }) {
  if (success) {
    return (
      <div role="status">
        <h2>Message received.</h2>
        <p>Thanks for reaching out. We’ll be in touch.</p>
        <Link className="ggg-text-link" href="/shop">
          Explore the apparel collection →
        </Link>
      </div>
    );
  }

  const { data } = await client.fetch({
    document: ContactDetailsQuery,
    fetchOptions: { next: { revalidate } },
  });
  const contact = data.site.settings?.contact;
  const page = data.site.content.pages.edges
    ?.map(({ node }) => node)
    .find((node) => node.__typename === 'ContactPage');

  if (page?.__typename !== 'ContactPage') {
    return (
      <div className="ggg-contact-details">
        <h2>A direct line to the team.</h2>
        <p>For product questions and order support, contact the store directly.</p>
        {contact?.email && (
          <a className="ggg-contact-channel" href={`mailto:${contact.email}`}>
            <span>Email the team</span>
            <strong>{contact.email}</strong>
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {contact?.phone && (
          <a className="ggg-contact-channel" href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>
            <span>Give us a call</span>
            <strong>{contact.phone}</strong>
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {!contact?.email && !contact?.phone && (
          <p>Contact information will be available here soon.</p>
        )}
        <p className="ggg-contact-order-note">
          Have an order question? Include your order number so the team can help.
        </p>
      </div>
    );
  }

  const fields: Field[] = [
    { id: 'fullname', name: 'fullname', type: 'text', label: 'Your name', required: true },
    { id: 'email', name: 'email', type: 'email', label: 'Email address', required: true },
    {
      id: 'comments',
      name: 'comments',
      type: 'textarea',
      label: 'How can we help?',
      required: true,
    },
    {
      id: 'pageId',
      name: 'pageId',
      type: 'hidden',
      label: 'Page ID',
      defaultValue: String(page.entityId),
    },
    {
      id: 'pagePath',
      name: 'pagePath',
      type: 'hidden',
      label: 'Page path',
      defaultValue: '/get-in-touch',
    },
  ];

  return (
    <DynamicForm
      action={submitContactForm}
      fields={fields}
      recaptchaSiteKey={await getRecaptchaSiteKey()}
      submitLabel="Send message"
    />
  );
}
