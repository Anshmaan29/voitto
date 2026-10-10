# Voitto Ventures frontend

A complete responsive redesign of Voitto Ventures, using the property's existing website content and media. Built with React 19, TypeScript, Vite, Tailwind CSS 4 and Motion 12. The interface includes a cinematic video hero, four property galleries, a scroll-driven photo stack, Rajasthan experiences, dining, founder information, guest stories, group enquiries, FAQs and policies.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. To create and inspect the production build:

```sh
npm run build
npm run preview
```

Deploy `dist/` to a static host. No API keys, database, booking service or backend are required. `scripts/static-pages.mjs` preserves `/privacy-policy/`, `/terms-and-conditions/` and the old `/home-1/` path. Configure the production host to redirect the versions without a trailing slash to their corresponding directories if it does not do so automatically.

## Content and media

- Editable content: `src/data/content.ts`.
- Policy text: `src/data/privacy-policy.json` and `src/data/terms-and-conditions.json`.
- Styling and responsive rules: `src/styles.css`.
- Reusable UI components: `src/components/ui/`, following the shadcn folder convention and `@/` aliases.
- Original asset provenance and property mapping: `CONTENT-MAP.json`.
- Optimized images, original video files and self-hosted fonts: `public/`.

All 13 original property gallery photographs and five original property gallery videos are retained in their corresponding property galleries. The original homepage video remains the hero. Dining and destination imagery comes from the original homepage. The founder uses the original founder image with a CSS portrait crop. Image crops and WebP resizing do not change property assignments. No stock property images have been added. The separate collected content archive contains unused and unpublished originals; those are not automatically presented as property photography.

The original WhatsApp short link `https://wa.link/s29inj` is preserved for general enquiries. Its verified redirect is to `919269833333`. Property enquiries and the form compose messages to that same number. The visitor chooses whether to send the message in WhatsApp. The frontend does not submit enquiries to a database or confirm a reservation. A fallback draft link is displayed if a browser blocks the new tab.

## Motion

The supplied animation examples were adapted into `scroll-expansion-hero.tsx`, `container-scroll-animation.tsx`, `text-scroll-animation.tsx` and `liquid-glass-button.tsx`. `scroll-memory-stack.tsx` adds a scroll-driven 3D property photo arrangement. The implementation follows the official [Motion AI Kit guidance](https://motion.dev/docs/ai-kit-install) and uses `motion/react`. Motion MCP and paid Motion+ components are not dependencies.

The original examples' wheel interception and forced scroll position were removed. Native scrolling, keyboard navigation and visible focus remain available. A root `MotionConfig` respects the visitor's reduced-motion preference; decorative CSS movement is disabled under the same preference. The hero includes a pause control, pauses outside the viewport or in a hidden tab, and avoids automatic playback when reduced motion or data-saving mode is active. Gallery videos load only when selected and have native controls.

## Before changing the live domain

Review the frontend, current amenities, policy wording and the final production hostname. Existing policies contained several inconsistent business names; those names have been normalized to Voitto Ventures, while the substantive policy wording is retained. The original source archive is available for comparison. The policy's references to the old form and possible cookies should be reviewed for the final hosting setup. Add a canonical hostname and absolute Open Graph image URL when the production domain is approved. Preserve existing email DNS records.

See `WIX-MIGRATION.md` for verified Wix Studio integration options. This React project cannot be imported wholesale as an editable Wix Studio site. External static hosting preserves the complete animation design; a native Wix Studio rebuild is a separate route. The current Wix website and its domain are unchanged. Replacing them requires the owner's explicit permission.

Self-hosted Italiana and DM Sans fonts include their SIL Open Font License files in `public/fonts/`.
