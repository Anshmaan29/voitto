# Frontend validation

Validated on 11 October 2026 using a production Vite build and Chrome browser checks.

- TypeScript compilation and production build passed.
- Layout widths of 375, 390, 768, 1024 and 1470 pixels were inspected; no horizontal document overflow was found.
- Mobile navigation opens with a focus-trapped dialog and closes when a section is chosen.
- All four property galleries open, expose their own photo/video controls and produce property-specific WhatsApp enquiry links.
- Escape closes the gallery and restores focus to its opener.
- Gallery video source paths were verified against each property's association.
- The 13 property photographs and five property gallery videos were checked against the captured Wix gallery mapping. Original video hashes match the collected originals. WebP images were decoded successfully.
- General WhatsApp links retain `wa.link/s29inj`; its redirect was verified as `919269833333`.
- A group enquiry with a selected property, occasion, guest count and notes produced the correct encoded WhatsApp draft and fallback link. No WhatsApp message was sent.
- The hero uses the original video, provides a pause control and has a still-image fallback.
- All four property cards use their own original main video as a muted preview, with a matching poster and a 44-pixel play/pause control. Playback and pause/resume were verified in Chrome; off-screen previews remain paused.
- Each property gallery opens with its main video in position 1, with native playback controls. All four initial source paths and item counts were verified after reordering; all photographs and Akshay Garh's second video remain available.
- The updated preview controls and video-first gallery were checked at 390 pixels without horizontal overflow, and Escape still restores focus to the gallery opener.
- Reduced-motion behavior is implemented through MotionConfig and CSS. Automatic hero playback also checks reduced motion and data-saving preference.
- Self-hosted fonts and their licenses are included; no font service is required at runtime.

The live Wix website and domain were not changed. Final domain connection, final hostname metadata and the owner's content/policy approval remain launch steps. This frontend does not provide a reservation backend, live inventory or payment processing.
