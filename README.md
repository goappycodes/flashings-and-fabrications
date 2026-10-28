# Flashings & Fabrications

Two responsive homepage design directions for the Littlehampton sheet-metal fabricator.

- `dist/dark.html`: Trade bold, with a workshop hero, product-profile navigation and architectural project features.
- `dist/bold.html`: Built for the detail, with Montserrat 900 headings, an asymmetric product-photo hero and an editorial service list.
- `dist/index.html`: comparison and review notes.

Trade bold uses Noto Sans. Built for the detail uses Montserrat 900 for major headings. Both retain explicit service choices, verified local contact details, project examples and demonstration enquiry forms. Desktop containers reach 1,680px on larger screens. Forms validate in the browser and do not send data or files.

Each homepage hero crossfades between three images, with a pause control and a static opening image for reduced-motion preferences. The bold direction uses larger square product images and three service cards per row on wide desktops, reducing to two and then one on smaller screens.

## Development

Run `npm run build` with Node.js to regenerate the HTML from `build.mjs`, `build-third.mjs`, `direction-b.mjs` and `direction-c.mjs`. Styles and browser behaviour live in `dist/styles.css`, `dist/type-system.css`, `dist/direction-c.css` and `dist/site.js`.

For a local preview, serve `dist` with any static HTTP server. For example, `python -m http.server 8087 --directory dist`.

## Deploy on Vercel

The Vercel project now deploys the new website in `website/` (Root Directory `website`, framework Next.js). The `vercel.json` here and in `website/` both set the Next.js install and build commands; keep them in sync. The concepts in this folder are kept for reference and are no longer deployed. To preview them locally, run `npm run build` here and serve `dist`.

## Assets and publication

The workshop image is illustrative AI-generated photography, not a depiction of the real company premises or staff. Replace it with approved workshop photography before launch. Product and project images come from the current company website; source the originals and confirm rights for public launch. See `asset-sources.json` for sources and the workshop image prompt.

`.openai/hosting.json` identifies the private design review site. The confidential discovery brief is not included in this repository.

The supplied GitHub repository is the destination for ongoing source updates. Preserve its history and push changes without force.
