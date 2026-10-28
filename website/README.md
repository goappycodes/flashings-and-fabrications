# Flashings & Fabrications website

The new FFS website, built with Next.js 16. Only the homepage is in this round. Links to future pages are clickable placeholders that stay on the homepage: see `src/components/PlaceholderLink.tsx`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

Set the project's **Root Directory** to `website` and the framework preset to **Next.js**. No environment variables are needed. The older homepage concepts at the repository root (`dist/`, `vercel.json`) are not used by this app.

## Content

- `src/content/site.ts` holds all company details, products, projects and machinery copy.
- Photos tagged as placeholders (Unsplash) and the hero video (Pexels) are illustrative. Replace them with FFS photography before launch.
- `CONTENT-NOTES.md` lists facts still to confirm with FFS.
- Search indexing is switched off (`robots: noindex` in `src/app/layout.tsx`) until launch on the live domain.
