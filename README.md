<a href="https://catalyst.dev" target="_blank" rel="noopener norerrer">
  <img src="https://storage.googleapis.com/bigcommerce-developers/images/catalyst_readme_banner.png" alt="Catalyst for Composable Commerce Image Banner" title="Catalyst">
</a>

<br />
<br />

<div align="center">

[![MIT License](https://img.shields.io/github/license/bigcommerce/catalyst)](LICENSE.md)
[![Lighthouse Report](https://github.com/bigcommerce/catalyst/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/bigcommerce/catalyst/actions/workflows/lighthouse.yml) [![Lint, Typecheck, gql.tada](https://github.com/bigcommerce/catalyst/actions/workflows/basic.yml/badge.svg)](https://github.com/bigcommerce/catalyst/actions/workflows/basic.yml)

</div>

**Catalyst** is the composable, fully customizable headless commerce framework for
[BigCommerce](https://www.bigcommerce.com/). Catalyst is built with [Next.js](https://nextjs.org/), uses
our [React](https://react.dev/) storefront components, and is backed by the
[GraphQL Storefront API](https://developer.bigcommerce.com/docs/storefront/graphql).

By choosing Catalyst, you'll have a fully-functional storefront within a few seconds, and spend zero time on wiring
up APIs or building SEO, Accessibility, and Performance-optimized ecommerce components you've probably written many
times before. You can instead go straight to work building your brand and making this your own.

## Demo

- [Catalyst Demo](https://catalyst-demo.site)

![-----------------------------------------------------](https://storage.googleapis.com/bigcommerce-developers/images/catalyst_readme_hr.png)

<p align="center">
 <a href="https://www.catalyst.dev">🚀 catalyst.dev</a> •
 <a href="https://developer.bigcommerce.com/community">🤗 BigCommerce Developer Community</a> •
 <a href="https://github.com/bigcommerce/catalyst/discussions">💬 GitHub Discussions</a> •
 <a href="/docs">💡 Docs in this repo</a>
</p>

![-----------------------------------------------------](https://storage.googleapis.com/bigcommerce-developers/images/catalyst_readme_hr.png)

## Deploy via One-Click Catalyst App

The easiest way to deploy your Catalyst Storefront is to use the [One-Click Catalyst App](http://login.bigcommerce.com/deep-links/app/53284) available in the BigCommerce App Marketplace.

Check out the [Catalyst.dev One-Click Catalyst Documentation](https://www.catalyst.dev/docs/getting-started) for more details.

## Getting Started

**Requirements:**

- A [BigCommerce account](https://www.bigcommerce.com/start-your-trial)
- Node.js version 24
- Corepack-enabled `pnpm`

  ```bash
  corepack enable pnpm
  ```

1. Install the latest version of Catalyst:

   ```bash
   pnpm create @bigcommerce/catalyst@latest
   ```

2. Run the local development server:

   ```bash
   pnpm run dev
   ```

Learn more about Catalyst at [catalyst.dev](https://catalyst.dev).

## GraphQL Schema and Types

Catalyst types its GraphQL documents with [gql.tada](https://gql-tada.0no.co/), which needs a local
copy of your store's GraphQL Storefront API schema. Two files at the project root hold it:

| File                       | What it is                                                        |
| -------------------------- | ----------------------------------------------------------------- |
| `bigcommerce.graphql`      | Your channel's Storefront API schema, in SDL.                     |
| `bigcommerce-graphql.d.ts` | The gql.tada introspection type that `client/graphql.ts` imports. |

Both are build-time and editor-time artifacts. Nothing reads them while your storefront serves a
request — they exist so `tsc`, ESLint, and your editor can check every query and mutation against
the real schema.

### Generating them

```bash
pnpm run generate
```

(`npm run generate` if your project uses npm — the `generate` script in `package.json` is the same
either way.)

The script reads `BIGCOMMERCE_STORE_HASH`, `BIGCOMMERCE_CHANNEL_ID`, and
`BIGCOMMERCE_STOREFRONT_TOKEN` from `.env.local`, downloads the schema for that channel, and writes
both files. `pnpm run dev`, `pnpm run build`, and `pnpm run deploy` each run `generate` first, so the
usual development loop keeps them current on its own. Run it directly after switching channels or
when you want to pick up a Storefront API schema change mid-session.

### Commit both files

**Commit `bigcommerce.graphql` and `bigcommerce-graphql.d.ts` to your repository.** They are
deliberately absent from `.gitignore`:

- `pnpm run lint` and `pnpm run typecheck` fail without `bigcommerce-graphql.d.ts`, because
  `client/graphql.ts` imports it. Committing it lets CI check a pull request with no store
  credentials at all.
- A fresh clone gets GraphQL autocomplete and validation immediately, before anything is run.
- Schema changes land in your diffs, so a field your storefront depends on going away is something
  you see in review rather than at deploy time.

They show up as untracked the first time you run `pnpm run dev`, because `catalyst create` makes its
initial commit before the first `generate`. Add them:

```bash
git add bigcommerce.graphql bigcommerce-graphql.d.ts
git commit -m "Add generated GraphQL schema and types"
```

### Local versus CI regeneration

`build` and `deploy` regenerate the schema before Next.js compiles, so a deployment always uses
whatever is live on the channel at that moment; the committed copies are never what ships. Your
build environment therefore needs the same three variables `generate` does — the ones already
required for the build itself.

A CI job that only lints, typechecks, or runs unit tests needs no credentials, because it uses the
committed files. If you would rather have CI verify that they are current, run `pnpm run generate`
there and fail the job when `git diff --exit-code` reports a change.

## Give Girls Guns storefront

The storefront uses the supplied artwork in `public/ggg` and a lavender, teal, and purple theme. The homepage, `/shop`, `/our-story`, and `/get-in-touch` use registered Makeswift sections. The launch apparel collection is ordered **449, 448, 396** in `lib/ggg-storefront.ts`. Names, images, prices, product options, and purchasing continue to use the BigCommerce catalog and Catalyst product/cart flows. The supplied products are Atlanta Arms apparel; the site does not rename them as Give Girls Guns merchandise.

### Editing in Makeswift

Run `pnpm run dev` and connect the existing Makeswift site's Host URL to the development server (or to a deployment containing these changes). Open the relevant URL in the visual builder. In its Elements panel, select the sections labeled **3G · …** to edit copy, artwork, image descriptions, and supported links. Missing artwork selections use the supplied artwork automatically. Empty button destinations use the site's apparel/story routes.

The new components also appear under **3G** in the component tray. Each page has an **Add … sections** slot: enable visual editing on that slot, then drag registered sections into it. The initial core section order is maintained in the page files; the slots allow additional sections without code changes. These pages render embedded component snapshots rather than the former Makeswift homepage page snapshot. Previously published homepage layouts are not deleted, but are no longer rendered at `/`.

Header/announcement, newsletter, footer, and values use shared component snapshot IDs, so editing one instance updates it everywhere. The homepage collection and shop collection have separate headings. Publish the component changes through Makeswift; deploying the code alone does not publish editor changes. Product data stays editable in BigCommerce rather than being copied into Makeswift.

The newsletter uses Catalyst's existing BigCommerce subscription action. Contact details come from the channel's store settings. When the channel has a BigCommerce **Contact Page**, the contact route automatically uses the existing validated contact form and reCAPTCHA integration. Until then, it displays working email and phone links; no message is submitted by those links. The Instagram link is hidden until a real profile URL is entered in the footer controls.

### Local validation

Use `pnpm exec next typegen` and `pnpm run typecheck` for route/type checks. Preview `/`, `/shop`, `/our-story`, and `/get-in-touch` at desktop and mobile sizes. Verify the three product links, sizing, bag navigation, newsletter validation, and the mobile menu. The `ggg/` artwork directory is excluded from the storefront routing proxy so images are served as static assets.

## Catalyst resources

- [Catalyst Documentation](https://catalyst.dev/docs/)
- [GraphQL Storefront API Playground](https://developer.bigcommerce.com/graphql-storefront/playground)
- [GraphQL Storefront API Explorer](https://developer.bigcommerce.com/graphql-storefront/explorer)
- [BigCommerce DevDocs](https://developer.bigcommerce.com/docs/build)
