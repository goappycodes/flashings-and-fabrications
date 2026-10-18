# Flashings & Fabrications

Three responsive homepage design directions for the Littlehampton sheet-metal fabricator.

- `dist/light.html`: Precision workshop, with a restrained photographic layout.
- `dist/dark.html`: Trade bold, with a workshop hero, product-profile navigation and architectural project features.
- `dist/bold.html`: Built for the detail, with Montserrat 900 headings, an asymmetric product-photo hero and an editorial service list.
- `dist/index.html`: comparison and review notes.

The original two use Noto Sans. The third adds Montserrat 900 for major headings. All retain explicit service choices, verified local contact details, project examples and demonstration enquiry forms. Desktop containers reach 1,680px on larger screens. Forms validate in the browser and do not send data or files.

## Development

Run `npm run build` with Node.js to regenerate the HTML from `build.mjs`, `build-third.mjs`, `direction-b.mjs` and `direction-c.mjs`. Styles and browser behaviour live in `dist/styles.css`, `dist/type-system.css`, `dist/direction-c.css` and `dist/site.js`.

For a local preview, serve `dist` with any static HTTP server. For example, `python -m http.server 8087 --directory dist`.

The Python `prepare-white-logo.py` utility generates an exact transparent white SVG variant from the original logo. It needs Pillow only to read the source dimensions. The final SVG is already included in `dist/assets`.

## Assets and publication

The workshop image is illustrative AI-generated photography, not a depiction of the real company premises or staff. Replace it with approved workshop photography before launch. Product and project images come from the current company website; source the originals and confirm rights for public launch. See `asset-sources.json` for sources and the workshop image prompt.

`.openai/hosting.json` identifies the private design review site. The confidential discovery brief is not included in this repository.

The supplied GitHub repository is the destination for ongoing source updates. Preserve its history and push changes without force.
