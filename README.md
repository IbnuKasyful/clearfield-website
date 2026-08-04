# Clearfield

Marketing site for Clearfield — the digital arm of Atty Group. Single-page React
build of the approved design: premium serif/sans typography, generous white
space, a dark services panel, and scroll-driven motion.

## Stack

- React 18 + Vite
- GSAP (with ScrollTrigger) for scroll and entrance animation
- Plain CSS with custom properties — no UI framework

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Project structure

```
src/
  App.jsx              page composition, section order
  index.css            design tokens + all component styles
  data/site.js         every piece of copy on the page
  lib/motion.js        gsap setup, reduced-motion helpers, reveal/magnetic/typewriter hooks
  components/
    Preloader.jsx      opening curtain
    ScrollProgress.jsx top progress hairline
    CustomCursor.jsx   ring + dot pointer (fine pointers only)
    Nav.jsx            header, mobile menu
    Hero.jsx           headline, typing effect, capabilities
    ShowcaseRunner.jsx looping mockup rows
    About.jsx          positioning statement
    Services.jsx       dark accordion panel
    Projects.jsx       featured project grid
    WhyClearfield.jsx  four reasons with growing bars
    ClientMarquee.jsx  scrolling name strip
    Contact.jsx        closing CTA and contact details
    Footer.jsx         wordmark, links, back-to-top
    Placeholder.jsx    labelled stand-in for artwork
    PixelMark.jsx      three-step pixel logo mark
    Reveal.jsx         scroll-into-view wrapper
```

## Editing copy

All wording lives in `src/data/site.js` and comes from the Clearfield
copywriting document. Edit it there — the components read from it and hold no
copy of their own.

## Before launch

- **Contact details** — `contact.email` and `contact.whatsappNumber` in
  `src/data/site.js` are placeholders. `whatsappNumber` must be digits only in
  international format (no `+` or spaces); it builds the `wa.me` link.
- **Imagery** — every image is currently a labelled `<Placeholder>` block.
  Replace each one with an `<img>`; the surrounding wrapper already carries the
  aspect ratio, border radius, and overflow clipping.

## Accessibility and motion

Every animation is skipped when the visitor has `prefers-reduced-motion: reduce`
set: the preloader does not render, the typing effect settles on the headline as
written, the custom cursor is not created, and the marquees stop. The services
accordion is keyboard operable and collapsed panels are marked `inert`.
