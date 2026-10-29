# Muse Makeup Studio — Delivery Outcomes

## Editorial landing page
- [x] Full-screen hero section uses the supplied reference photo as the primary visual and preserves the dark editorial charcoal, moss, cream, and warm-skin palette.
- [x] Hero written content is replaced with Muse Makeup Studio copy while keeping the reference-inspired navigation, editorial numbering, image treatment, and composition.

## Scroll behavior and motion
- [x] Hero typography is linked to scroll position so it moves upward and fades away as the visitor scrolls down.
- [x] Following sections and cards reveal upward with coordinated entry animation as they enter the viewport.
- [x] The page respects `prefers-reduced-motion` and keeps the motion lightweight and performant.

## Studio content and responsive behavior
- [x] Editorial studio introduction, selected looks, animated service cards, booking CTA, and contact details are included in a single-page flow.
- [x] Layout adapts for desktop and mobile, with readable contrast, accessible navigation labels, descriptive image alt text, and keyboard-friendly anchors.

## Premium mobile refinement
- [x] Mobile navigation opens as a full-screen editorial menu with accessible labels, close state, body-scroll lock, and keyboard-safe closed links.
- [x] Hero typography reveals line-by-line on load, while section headlines reveal line-by-line as they enter the viewport.
- [x] 390px and 360px layouts keep the hero image, headline, CTA actions, and scroll cue legible without horizontal overflow.

## Preview runtime
- [x] Vite HMR websocket is disabled for the managed Preview proxy, which serves HTTP through the 8328 ingress but does not forward the dev websocket; the site remains available through normal HTTP Preview and static builds.
