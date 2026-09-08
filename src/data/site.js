/**
 * Single source of truth for every piece of copy on the site.
 * Wording comes from the Clearfield copywriting document — edit here, not in
 * the components.
 */

/**
 * Absolute origin the site is served from. Canonical URLs, Open Graph URLs,
 * robots.txt and sitemap.xml are all derived from this one value.
 *
 * TODO: confirm before launch. Nothing in the repo recorded the production
 * domain, so this is inferred from the contact address and is the single line
 * to change if it is wrong — a canonical pointing at the wrong host tells
 * Google the real page lives somewhere else.
 */
export const site = {
  origin: 'https://clearfield.ae',
  name: 'Clearfield',
  title: 'Clearfield | Digital built for business',
  description:
    'Clearfield Digital helps international businesses build or adapt their digital footprint to suit the local market: websites, domains, professional email, visual identity and social setup.',
};

export const contact = {
  email: 'info@clearfield.ae',
  // Digits only, international format, no "+" or spaces — used to build the wa.me link.
  whatsappNumber: '971585300315',
  whatsappDisplay: 'Message us on WhatsApp',
  // The details list shows the number itself — a real number reads as
  // reachable in a way that "chat with our team" does not.
  whatsappDetail: '+971 58 530 0315',
  // Husam's wording: hyphens rather than en dashes, and a slash between the
  // days and the times.
  hours: 'Monday - Friday / 09:00 - 17:30',
  group: 'A company of The Atty Group',
  groupShort: 'The Atty Group',
};

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}`;
export const emailHref = `mailto:${contact.email}`;

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Why Clearfield', href: '#why' },
];

export const hero = {
  chip: 'The digital arm of The Atty Group',
  headingLead: 'Digital built for',
  // One ending, held. The wording itself is still the open question — the
  // positioning brief asks for "we build digital systems", which is a copy
  // decision rather than a motion one.
  headingAccent: 'business.',
  body: 'Clearfield Digital helps international businesses build or adapt their digital footprint to suit the local market. From professional websites and the right domain extensions to professional email, social media presence, visual identity and essential digital assets.',
  primaryCta: 'Talk to Our Team',
  secondaryCta: 'See our work',
  capabilitiesLabel: 'What we do',
  capabilities: [
    'Website Design & Development',
    'Logo & Visual Identity',
    'Domain, Email & Social Setup',
  ],
};

export const about = {
  index: '( 01 )',
  kicker: 'About Clearfield',
  heading: "Digital Expertise, Built for the market you're entering.",
  // Two paragraphs as supplied, rather than one run-on block: the second is the
  // qualifier and reads as an aside, so it carries the muted tone.
  statement: [
    [
      { text: 'Entering a new market often requires more than simply duplicating an existing website. We help translate your business into a ' },
      { text: 'professional local digital presence', tone: 'accent' },
      { text: ', from websites and the right domain extensions to professional email, social media presence and visual identity.' },
    ],
    [
      { text: "Whether you're building your digital footprint from scratch or adapting an existing presence, Clearfield focuses on the practical execution needed to establish a professional presence in the market.", tone: 'muted' },
    ],
  ],
};

export const services = {
  index: '( 02 )',
  kicker: 'Our services',
  // The H2 carries the search terms; the line it replaced now leads the
  // section as copy so the phrasing is not lost.
  heading: 'Website Development & Digital Services',
  lede: 'Everything you need to establish a professional digital footprint in the market.',
  tags: ['Design', 'Build', 'Launch'],
  cta: 'Talk to Our Team',
  items: [
    {
      id: 'web',
      number: '(01)',
      title: 'Website Design & Development',
      lead: 'Create a professional online presence that builds trust from the first visit.',
      body: "Whether you're starting from scratch or adapting an existing website, we design and build professional websites that present your business clearly and credibly in the local market. From focused one-page websites and landing pages to complete corporate websites.",
      tags: ['Website development', 'Landing pages', 'Responsive design', 'Content implementation'],
      // Named links out to the case studies. The screenshots below link to the
      // same pages, but an image link carries no anchor text, and the relation
      // between this service and the work is worth stating in words.
      relatedLead: 'See this work in practice:',
      related: [
        { project: 'lumayra', label: 'Lumayra' },
        { project: 'northvale', label: 'Northvale' },
      ],
      // Real work, not mockups — `project` points at an entry in `projects.items`
      // and the 4:3 screenshot in public/projects/<id>-4x3.webp.
      media: [
        { project: 'lumayra', label: 'Lumayra commercial cleaning website' },
        { project: 'northvale', label: 'Northvale accounting website' },
      ],
    },
    {
      id: 'identity',
      number: '(02)',
      title: 'Logo & Visual Identity',
      lead: 'A clear, professional visual identity for your business and local presence.',
      body: 'Whether you need a new logo or want to adapt an existing visual identity for a new market, we create and apply the essential visual elements needed for a consistent professional presence.',
      tags: [
        'Logo design',
        'Logo adaptation',
        'Visual identity',
        'Business cards',
        'Email signatures',
        'Social profile visuals',
      ],
      // The identity applied to real profiles, which is what "social profile
      // visuals" means in practice. Unlike service (01) these are live pages
      // elsewhere rather than case studies, so they carry `src`/`href` and open
      // in a new tab.
      media: [
        {
          src: '/social/linkedin-atty-4x3.webp',
          href: 'https://www.linkedin.com/company/atty-partners-llc/',
          label: 'Atty & Partners LinkedIn company page',
        },
        {
          src: '/social/instagram-atty-4x3.webp',
          href: 'https://www.instagram.com/attyandpartners/',
          label: 'Atty & Partners Instagram feed',
        },
      ],
    },
    {
      id: 'foundations',
      number: '(03)',
      title: 'Domain, Email & Social Setup',
      lead: 'The practical setup behind a professional local digital footprint.',
      body: "A professional local presence starts with getting the basics right. We help you choose and register the right domain extension, set up professional email, and establish or adapt your social media profiles for the market you're entering.",
      tags: [
        'Domain selection & registration',
        'Professional email setup',
        'Social media profile setup',
        'Profile & cover visuals',
        'Business information setup',
      ],
      // TODO: same as (02) — imagery still to come.
      media: [],
    },
  ],
};

/**
 * Featured work.
 *
 * Each item doubles as the card in the grid and the source for its own detail
 * page at /projects/<id>. Imagery in `public/projects/` is a screenshot of the
 * live site — `<id>-card.webp` is the 4:3.2 crop the grid frame expects,
 * `<id>.webp` is the wider shot the detail page hero uses.
 *
 * `logo` is the mark the client actually runs on that live site, trimmed to its
 * own bounds so nothing but the artwork is left, and shown on the card in the
 * brand's own colours. `height` is the rendered pixel height, tuned per lockup
 * rather than shared, because a stacked mark and a single-line wordmark do not
 * read at the same size. `tile` flags a mark that carries its own background
 * rather than sitting on transparency.
 *
 * `wallLogo` overrides what the client marquee shows, which is a different job:
 * the wall flattens every mark to one ink silhouette, so it needs alpha rather
 * than colour, and it must not repeat a brand. Leave it off to reuse `logo`;
 * set it to null to fall back to the wordmark.
 */
export const projects = {
  index: '( 03 )',
  kicker: 'Featured projects',
  heading: 'Recent Website & Digital Projects',
  // Replaces both the old heading and "Here are a few examples of projects
  // we've delivered." — the two said the same thing at different lengths.
  intro:
    'From corporate websites and landing pages to event platforms and digital assets, our work is built around clear, professional digital execution.',
  cardCta: 'View project',
  items: [
    {
      id: 'dubai-unfiltered',
      name: 'Dubai Ongefilterd',
      type: 'Event Platform',
      url: 'https://dubaiongefilterd.nl/',
      urlLabel: 'dubaiongefilterd.nl',
      // The only mark of the four published on a bed rather than on
      // transparency — its wordmark is cream and gold, which needs the dark
      // ground to be legible at all. `wallLogo` is the same lockup keyed off
      // that ground, because the marquee's brightness(0) would otherwise turn
      // the bed into a solid black block.
      logo: { src: '/logos/dubai-unfiltered.png', height: 56, tile: true },
      wallLogo: { src: '/logos/dubai-unfiltered-mark.png', height: 34 },
      description:
        'Designed and developed the digital event platform for Dubai Ongefilterd, a growing business community connecting entrepreneurs and professionals through events and networking, with integrated registration, online payments and communication tools.',
      delivered: [
        'Event Website',
        'Registration Integration',
        'Stripe & PayPal Integration',
        'CRM Integration',
        'Email Automation',
        'Responsive Design',
      ],
      detail: {
        summary:
          'A dedicated event platform combining the website, registration, payments and attendee journey in one digital experience.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Dubai Ongefilterd is a business event and growing community for entrepreneurs, investors and professionals interested in Dubai, the wider region, international business and entrepreneurship. The platform needed to support both the event experience and the practical journey from registration through payment and confirmation.',
              'Registration, payment, confirmation and pre-event communication needed to work together smoothly, with minimal manual administration for the organising team.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'We built a dedicated event website with registration and payment integrated directly into the platform. Visitors can view the event details, reserve their place and complete payment without leaving the website.',
              'Payments are handled through Stripe, including Apple Pay, Google Pay and card payments. Registrations are synced with the CRM and trigger automated confirmations and reminders, keeping attendee information organised without manual entry.',
            ],
          },
        ],
        highlights: [
          'Dedicated event website with integrated registration',
          'On-site Stripe checkout with Apple Pay, Google Pay and card',
          'Registrations synced to CRM with no manual entry',
          'Automated confirmation and reminder sequences',
        ],
      },
    },
    {
      id: 'lumayra',
      name: 'Lumayra',
      type: 'Corporate Website',
      url: 'https://lumayra.ae/',
      urlLabel: 'lumayra.ae',
      // On the card, the lockup on its own navy bed — gold and white type needs
      // the dark ground to read at all, hence `tile`. The wall is the other
      // job: it flattens every mark to one ink silhouette, so it takes the
      // transparent cut of the same lockup instead.
      logo: { src: '/logos/lumayra.jpg', height: 44, tile: true },
      // 38 to sit level with Northvale: both are two-line lockups, and the
      // finer serif here reads lighter than its height suggests.
      wallLogo: { src: '/logos/lumayra-mark.webp', height: 38 },
      description:
        'Designed the visual identity and developed the website for a Dubai-based commercial cleaning company, presenting its service lines to UAE businesses and routing every enquiry into a single quote request.',
      delivered: [
        'Logo Design',
        'Website Design & Development',
        'Visual Identity',
        'Responsive Design',
        'Content Implementation',
        'Domain & Email Setup',
      ],
      detail: {
        summary:
          'A complete digital presence for a European commercial cleaning company establishing itself in the UAE, including logo, visual identity, website, domain and professional email.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Lumayra Cleaning LLC was establishing its presence in the UAE, bringing more than fifteen years of European operational experience into the local market. The company needed a professional digital identity and website suitable for its new market.',
              "The website needed to clearly present its commercial cleaning services, make it easy for businesses to request a quote, and provide a professional foundation for the company's UAE operations.",
            ],
          },
          {
            title: 'What we built',
            body: [
              "We developed the Lumayra logo and visual identity and applied them across a new UAE website built around the company's commercial cleaning services.",
              "The website presents the different service categories clearly, provides direct access to quote requests and phone contact, and includes a simple three-step explanation of the customer journey. We also set up the domain and professional email to complete the company's local digital presence.",
            ],
          },
        ],
        highlights: [
          'Quote request accessible throughout the website',
          'Three service lines presented through dedicated sections',
          'Simple quote → book → clean process clearly explained',
          'Direct phone contact alongside the quote form',
          'Logo and visual identity developed for the UAE launch',
        ],
      },
    },
    {
      id: 'northvale',
      name: 'Northvale',
      type: 'Brand & Website Launch',
      url: 'https://www.northvale-accounting.ae/',
      urlLabel: 'northvale-accounting.ae',
      // Taller than the old single-line wordmark it replaces: the real mark
      // stacks "ACCOUNTING & TAX" under the name, and at 24px that line closed up.
      logo: { src: '/logos/northvale.png', height: 38 },
      description:
        'Developed the digital presence for a newly established accounting firm, creating a professional website that reflects trust, simplicity, and financial expertise while supporting the launch of a new business.',
      delivered: [
        'Logo Design',
        'Website Design & Development',
        'Visual Identity',
        'Content Implementation',
        'Domain & Email Setup',
      ],
      detail: {
        summary:
          'A complete digital launch for a newly established UAE accounting firm, from logo and visual identity to website, domain and professional email.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Northvale was launching as a new accounting and tax firm in the UAE and needed a professional digital presence from the ground up. With no existing website or established visual identity, the business needed a clear and credible foundation for launch.',
              "The objective was to create a professional presence that clearly communicates Northvale's accounting, VAT and corporate tax services and makes it easy for prospective clients to get in touch.",
            ],
          },
          {
            title: 'What we built',
            body: [
              "We developed Northvale's logo and visual identity and translated these into a clean, professional website structured around its core accounting, VAT and corporate tax services.",
              'The website includes a consultation form directly in the hero, clear service sections, and direct phone and WhatsApp contact options. The domain and professional email setup completed the digital foundation for launch.',
            ],
          },
        ],
        highlights: [
          'Consultation form integrated directly into the homepage hero',
          'Logo and visual identity developed alongside the website',
          'Phone and WhatsApp contact routes integrated alongside the form',
          'Domain and professional email configured for launch',
        ],
      },
    },
  ],
};

/** Lookup used by the project detail route. */
export const projectById = (id) => projects.items.find((item) => item.id === id);

export const projectDetail = {
  backLabel: 'All projects',
  visitLabel: 'Visit live site',
  deliveredLabel: 'What we delivered',
  highlightsLabel: 'Highlights',
  nextLabel: 'Next project',
  ctaHeading: 'Have a project like this in mind?',
  ctaBody:
    "Tell us what you're planning and we'll come back with a clear view of what it takes to build it.",
  ctaLabel: 'Talk to Our Team',
  notFound: {
    heading: 'Project not found',
    body: 'That project does not exist, or the link has changed.',
  },
};

export const why = {
  index: '( 04 )',
  kicker: 'Why Clearfield?',
  heading: 'Why businesses work with Clearfield',
  intro:
    "Practical digital execution, with an understanding of the market you're entering.",
  // `tone` is the colour a card washes in with once it opens. These are
  // reasons to trust the firm, not things to click, so they all sit on the
  // blue side of the palette — orange is held back for actions.
  items: [
    {
      number: '01',
      title: 'Market-aware execution',
      body: "We build and adapt your digital presence to suit the market you're entering.",
      tone: '#024e9c',
    },
    {
      number: '02',
      title: 'Part of The Atty Group',
      body: 'Backed by an international business group and ecosystem with hands-on experience across the UAE and wider Middle East.',
      tone: '#013f80',
    },
    {
      number: '03',
      title: 'Built around your business',
      body: 'We work with what you already have, or build what is missing, without forcing a complete rebrand or rebuild.',
      // The palette's #394f9f, taken down far enough that the light end of the
      // card's gradient still clears 4.5:1 under the white label.
      tone: '#2f4287',
    },
    {
      number: '04',
      title: 'Local digital foundations',
      body: 'From the right domain and professional email to your website and social presence, we make sure the essentials work together.',
      tone: '#05356b',
    },
  ],
};

export const contactSection = {
  index: '( 05 )',
  kicker: 'Contact',
  heading: 'Ready to build your local digital presence?',
  body: 'Whether you need a new website, a local domain, professional email, visual identity or help adapting your existing digital presence, our team can help.',
  cta: 'Get in Touch',
  // Husam asked for this to come out of the contact block; it was running there
  // and again in the footer bar, so only the footer instance is left — with the
  // wording he supplied for it.
  closingLine: 'Building and adapting digital footprints for new markets.',
};

export const footer = {
  tagline: 'For businesses ready to grow online',
  columns: [
    {
      title: 'Navigation',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Projects', href: '#projects' },
        { label: 'Why Clearfield', href: '#why' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Website Design & Development', href: '#services' },
        { label: 'Logo & Visual Identity', href: '#services' },
        { label: 'Domain, Email & Social Setup', href: '#services' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Clearfield. All rights reserved.`,
};
