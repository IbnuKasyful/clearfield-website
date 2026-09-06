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
      name: 'Dubai Unfiltered',
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
        'Email Integration',
        'Responsive Design',
      ],
      detail: {
        summary:
          'A single-purpose event platform that takes a visitor from landing page to paid, confirmed seat without leaving the site.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Dubai Ongefilterd is an evening event for entrepreneurs, investors, and professionals looking at opportunities in Dubai and the wider region. It is pitched, as the name promises, as the honest version of the story. It runs to a fixed date, a fixed venue, and a limited number of seats.',
              'Events like this fail on logistics rather than interest. Registration, payment, confirmation, and the run-up communication all have to work without manual chasing, and the whole funnel has to hold up during the short window when attention is highest.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'The platform is deliberately narrow. One page, one decision: the date, venue, and time are visible immediately, the proposition is stated in a line, and reserving a seat is never more than one click away, either from the fixed header or from the page itself.',
              'Payment is handled on-site through Stripe with Apple Pay, Google Pay, and card accepted, so no one is bounced to a third-party ticketing host mid-decision. Behind the form, registrations flow into CRM and trigger automated confirmation and reminder sequences, giving the organisers an attendee list that stays current without manual entry.',
            ],
          },
        ],
        highlights: [
          'Single-decision landing page built around one conversion',
          'On-site Stripe checkout with Apple Pay, Google Pay, and card',
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
          'A brand and a service site for a commercial cleaning company establishing itself in the UAE, built around one action: request a quote.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Lumayra Cleaning LLC brings over fifteen years of European operational experience to the UAE, and sells to businesses rather than households. Commercial cleaning is bought on reliability and on a price quoted against a specific site, which makes the website the first step of a quote rather than a shop.',
              'The service range needed separating as well. Floor maintenance, specialist cleaning, and regular hygiene cleaning are bought by different people for different reasons; presented as one list they read as an undifferentiated cleaning offer.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'Every route through the page ends in the same place. "Get Your Quote Now" sits in the hero, "Get Quote" is pinned in the header, and the phone number runs live beside it for anyone who would rather call than type.',
              'The three service lines are broken out as their own destinations rather than bullet points, and a three-step explainer (free quote, book, clean) sets expectations before the enquiry instead of after it. The navy and gold identity we built for the brand holds its own against the bright blues the sector defaults to.',
            ],
          },
        ],
        highlights: [
          'One conversion goal, reachable from anywhere on the page',
          'Three service lines separated into their own routes',
          'Free quote → book → clean explainer set before the enquiry',
          'Phone contact running alongside the quote form',
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
          'The launch presence for a new UAE accounting firm, built to convert regulatory pressure into booked consultations.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Northvale launched into a market with a clear and urgent trigger: the introduction of UAE Corporate Tax in 2023 left businesses facing new tax, accounting, and reporting obligations many were not set up for. The firm needed a digital presence from a standing start: no existing traffic, no established brand recognition, no reputation to trade on.',
              'For a new practice, the website is the credibility test. It had to look like the work of an established firm on day one while making it obvious what Northvale does and how to start a conversation.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'We led with the trigger rather than the firm. The homepage opens on the problem visitors are searching for, UAE Corporate Tax, VAT, and accounting compliance, and only then explains how Northvale addresses it through structured accounting, VAT compliance, financial reporting, and corporate tax support.',
              'The consultation form sits in the hero rather than at the end of a scroll, capturing name, email, country, and the specific service required so enquiries arrive qualified. Service pillars are broken out as distinct routes into the site, and direct phone and WhatsApp contact run alongside the form for visitors who would rather just call.',
            ],
          },
        ],
        highlights: [
          'Lead capture placed in the hero, qualified by service and country',
          'Positioning anchored to the 2023 UAE Corporate Tax trigger',
          'Brand implementation delivered alongside the build',
          'Phone and WhatsApp contact routes running parallel to the form',
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
