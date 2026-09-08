# Clearfield

Marketing site for Clearfield — the digital arm of Atty Group. Single-page React
build of the approved design: premium serif/sans typography, generous white
space, a dark services panel, and scroll-driven motion.

## Stack

- React 18 + Vite
- React Router for the project detail pages
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
  App.jsx              routes, persistent chrome (nav, cursor, footer)
  main.jsx             entry point, BrowserRouter
  index.css            design tokens + all component styles
  data/site.js         every piece of copy on the site, including project detail content
  lib/motion.js        gsap setup, reduced-motion helpers, reveal/magnetic/typewriter hooks
  pages/
    Home.jsx           the one-page site, in section order
    ProjectDetail.jsx  a single project write-up at /projects/<id>
  components/
    Preloader.jsx      opening curtain
    ScrollProgress.jsx top progress hairline
    CustomCursor.jsx   ring + dot pointer (fine pointers only)
    RouteScroll.jsx    scroll reset + ScrollTrigger refresh on route change
    SectionLink.jsx    #anchor link that also works from a project page
    Nav.jsx            header, mobile menu
    Hero.jsx           headline, typing effect, capabilities
    ShowcaseRunner.jsx looping rows of project shots, each linking to its page
    About.jsx          positioning statement
    Services.jsx       dark accordion panel
    Projects.jsx       featured project grid, cards link to detail pages
    WhyClearfield.jsx  four reasons with growing bars
    ClientMarquee.jsx  scrolling name strip
    Contact.jsx        closing CTA and contact details
    Footer.jsx         wordmark, links, back-to-top
    Placeholder.jsx    labelled stand-in for artwork
    NodeMark.jsx       four-node logo mark, linked and animatable
    Wordmark.jsx       "Clearfield" with the coral dot, optionally plus the mark
    Reveal.jsx         scroll-into-view wrapper
```

## Routing and deployment

Two routes: `/` and `/projects/<id>`. Because the detail routes are nested,
`vite.config.js` uses `base: '/'` and **the site must be served from the domain
root** — a subdirectory deploy would break asset paths.

Being a client-side SPA, the host has to serve `index.html` for any path that is
not a real file, otherwise refreshing `/projects/atty-partners` returns a 404.
Both fallbacks ship in `public/` and are copied into `dist/` on build:

- `.htaccess` — Apache / LiteSpeed (Hostinger)
- `_redirects` — Netlify / Cloudflare Pages

On nginx the equivalent is `try_files $uri $uri/ /index.html;`.

## Project imagery

`public/projects/` holds three crops of a screenshot of each live client site.
Every variant is **captured at the aspect ratio of the frame it fills**, so the
downscale never has to crop the sides off a site and the layout stays legible:

| File | Size | Capture at | Used by |
| --- | --- | --- | --- |
| `<id>.webp` | 1600×1000 (16:10) | 1440×900 | detail page hero |
| `<id>-card.webp` | 1200×1075 (1.116) | 1440×1290 | featured project grid |
| `<id>-4x3.webp` | 1000×750 (4:3) | 1440×1080 | hero runner, services media |

The odd 1.116 is deliberate: `.project-card__media` is `aspect-ratio: 4/3.2`, and
`.project-card__media-inner` overhangs it by 6% top and bottom for the parallax
drift, so the box the image actually fills is `1.25 / 1.12`.

Export as WebP at quality 80–82. When capturing, dismiss cookie banners and chat
widgets first — several of these sites run Chaty, whose visible bubble is
`position: relative` inside a fixed container, so it has to be matched by class
name rather than by position.

## Editing copy

All wording lives in `src/data/site.js` and comes from the Clearfield
copywriting document. Edit it there — the components read from it and hold no
copy of their own.

## Before launch

- **Contact details** — `contact.email` and `contact.whatsappNumber` in
  `src/data/site.js` are placeholders. `whatsappNumber` must be digits only in
  international format (no `+` or spaces); it builds the `wa.me` link.
- **Imagery** — the hero runner, services media, featured project cards, and
  detail pages all use real screenshots from `public/projects/`. `Placeholder.jsx`
  is retained for any artwork still to come; the wrappers it sits in already
  carry the aspect ratio, border radius, and overflow clipping.

## Accessibility and motion

Every animation is skipped when the visitor has `prefers-reduced-motion: reduce`
set: the preloader does not render, the typing effect settles on the headline as
written, the custom cursor is not created, and the marquees stop. The services
accordion is keyboard operable and collapsed panels are marked `inert`.
