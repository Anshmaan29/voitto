# Voitto Ventures — Wix migration options

Checked against official Wix documentation on 11 October 2026. The current Wix website and domain have not been changed. Publishing or switching the live domain requires the owner's explicit permission.

The delivered frontend is a React, TypeScript and Vite website. Wix currently does not support importing an entire site built outside Wix, so its source folder or production build cannot become an editable Wix Studio site through a normal import. [Wix: importing a site created outside Wix](https://support.wix.com/en/article/request-importing-a-site-created-outside-of-wix).

## Available routes

| Route | What it involves | Fit for this redesign |
| --- | --- | --- |
| External hosting with the existing domain | Publish the compiled frontend to a static website host, then point the existing domain to it. | Recommended for retaining the exact React design and animation behavior. |
| Native Wix Studio rebuild | Recreate the approved pages using Wix Studio sections and elements; adapt advanced interactions through custom elements. | Appropriate if visual editing in Wix Studio is essential; this is a separate implementation step. |
| Wix custom element integration | Package selected React components as web components and add their JavaScript source to Wix Studio. | Practical for selected interactive sections, with additional integration and published-site validation. |
| Embed the externally hosted frontend | Add an HTTPS Embed Site element to a Wix page. | Useful for a preview or a limited embedded section; a full website iframe needs separate navigation, sizing, media and accessibility checks. |

These fit assessments are implementation recommendations based on the documented integration methods.

Wix Studio supports custom HTML tags using compatible ES6 JavaScript frameworks, sourced from a Velo file or a hosted JavaScript URL. The component's styling and required functionality must be included appropriately in its JavaScript bundle. A connected domain and a site without Wix ads are required. Editor and preview rendering can differ from the published site. [Wix Studio: adding a custom element](https://support.wix.com/en/article/studio-editor-adding-a-custom-element).

Wix Studio also supports embedding an external HTTPS URL. Its HTML element runs within a sandboxed iframe, which adds restrictions and requires careful sizing. Autoplay and outgoing links should be tested in that actual environment. [Wix Studio: adding an HTML iframe](https://support.wix.com/en/article/studio-editor-adding-an-html-iframe-element).

Wix's newer Editor React Components feature is specific to Wix Harmony; it is not a general React project import into Wix Studio. Custom elements remain available across Wix Studio, Wix Editor and Harmony. [Wix: custom elements versus Editor React Components](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/site-extensions/custom-elements-vs-editor-react-components).

## Recommended launch after approval

1. Approve the finished frontend and review it on a preview URL.
2. Confirm the domain registrar and DNS manager, then select a hosting service compatible with that setup.
3. Prepare HTTPS, the production hostname, old-page redirects and final contact/WhatsApp checks. Preserve existing email DNS records.
4. Ask for explicit permission to publish the approved version and switch the live domain.
5. Apply the host's required domain records, verify the root and www addresses, and retain the prior DNS values for rollback.

If the domain was purchased from Wix, it can stay registered there while the website is hosted elsewhere. Wix documents updating A and CNAME records for this purpose. Wix-purchased domains cannot change name servers, so choose a host that supports pointing; propagation may take up to 48 hours. If the domain was purchased elsewhere, changes belong at the actual DNS manager. [Wix: connecting a Wix domain to an external site](https://support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site), [Wix: external domain connection methods](https://support.wix.com/en/article/connecting-a-domain-purchased-elsewhere).

No backend is required for the current frontend and WhatsApp contact flow. Wix bookings, customer records and other business systems would require a separate integration if later requested.
