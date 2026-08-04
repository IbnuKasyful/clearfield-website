/**
 * Single source of truth for every piece of copy on the site.
 * Wording comes from the Clearfield copywriting document — edit here, not in
 * the components.
 */

export const contact = {
  // TODO: replace with the real details before launch.
  email: 'hello@clearfield.co',
  // Digits only, international format, no "+" or spaces — used to build the wa.me link.
  whatsappNumber: '00000000000',
  whatsappDisplay: 'Message us on WhatsApp',
  whatsappDetail: 'Chat with our team',
  hours: 'Monday – Friday  09:00 – 17:30',
  group: 'A company of the Atty Group',
  groupShort: 'Atty Group',
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
  chip: 'The digital arm of Atty Group',
  headingLead: 'Digital built for',
  // The first word is the headline as written; the rest cycle in the typing effect.
  headingWords: ['business.', 'growth.', 'credibility.', 'the long term.'],
  body: 'Clearfield helps businesses grow online through website design and development, digital marketing, and ongoing website support. We help businesses build a credible online presence through websites, digital marketing, and ongoing support by creating digital platforms that grow with your business.',
  primaryCta: 'Talk to Our Team',
  secondaryCta: 'See our work',
  capabilitiesLabel: 'What we do',
  capabilities: [
    'Website Design & Development',
    'Digital Marketing',
    'Ongoing Digital Support',
  ],
};

export const about = {
  index: '( 01 )',
  kicker: 'About Clearfield',
  heading: 'Digital expertise, backed by business thinking.',
  statement: [
    { text: 'Clearfield is the digital arm of Atty Group, helping businesses strengthen their online presence through website development and ' },
    { text: 'digital marketing', tone: 'accent' },
    { text: '. We combine business understanding with digital expertise to help companies establish a stronger online presence and support long-term growth.', tone: 'muted' },
  ],
};

export const services = {
  index: '( 02 )',
  kicker: 'Our services',
  heading: 'Three services. One digital partner.',
  tags: ['Design', 'Build', 'Grow'],
  cta: 'Talk to Our Team',
  items: [
    {
      id: 'web',
      number: '(01)',
      title: 'Website Design & Development',
      lead: 'Create a professional online presence that builds trust from the first visit.',
      body: 'Your website is often the first place people learn about your business. We design and develop websites that are fast, secure, easy to update, and built to help you connect with your customers.',
      tags: ['Website strategy', 'UX & UI design', 'Website development', 'Content implementation', 'Performance optimisation'],
      // Real work, not mockups — `project` points at an entry in `projects.items`
      // and the 4:3 screenshot in public/projects/<id>-4x3.webp.
      media: [
        { project: 'atty-partners', label: 'Atty & Partners corporate website' },
        { project: 'northvale', label: 'Northvale accounting website' },
      ],
    },
    {
      id: 'marketing',
      number: '(02)',
      title: 'Digital Marketing',
      lead: 'Digital marketing that helps you reach the right audience.',
      body: 'We help businesses grow their online presence through search marketing, email marketing, and digital campaigns that support real business goals.',
      tags: ['Search marketing', 'Email marketing', 'Digital campaigns', 'Marketing automation'],
      media: [],
    },
    {
      id: 'support',
      number: '(03)',
      title: 'Ongoing Digital Support',
      lead: 'Keep your website secure, up to date, and performing at its best.',
      body: 'Your website needs regular care to stay secure and perform at its best. We provide ongoing maintenance, updates, performance improvements, and technical support so your website continues to support your business.',
      tags: ['Maintenance & updates', 'Security', 'Performance improvements', 'Technical support'],
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
 * own bounds so nothing but the artwork is left. The marquee flattens it to a
 * silhouette, so only the alpha channel matters. `height` is the rendered pixel
 * height, tuned per lockup rather than shared, because a stacked mark and a
 * single-line wordmark do not read at the same size. A project with no `logo`
 * has no mark of its own published and falls back to a wordmark.
 */
export const projects = {
  index: '( 03 )',
  kicker: 'Featured projects',
  heading:
    'Every business has different goals. Some need a professional corporate website. Others need an event platform, a registration system, or digital tools that support day-to-day operations.',
  intro: "Here are a few examples of projects we've delivered.",
  cardCta: 'View project',
  items: [
    {
      id: 'atty-partners',
      name: 'Atty & Partners',
      type: 'Corporate Website',
      url: 'https://atty.ae/',
      urlLabel: 'atty.ae',
      logo: { src: '/logos/atty-partners.png', height: 46 },
      description:
        'Designed and developed a professional corporate website for an international business advisory firm, focused on communicating complex services with clarity, building credibility, and creating a seamless user experience for businesses expanding into the Middle East.',
      delivered: [
        'Website Strategy',
        'UX & UI Design',
        'Website Development',
        'Content Implementation',
        'Performance Optimisation',
      ],
      detail: {
        summary:
          'A credibility-first corporate site for an advisory firm whose clients value discretion, regional insight, and practical execution.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Atty & Partners advises international companies, family offices, and growth-stage businesses establishing or expanding their presence in the GCC. Work of that kind is bought on trust long before it is bought on price, so the website had to carry the weight of the firm rather than simply list what it does.',
              'The challenge was clarity. Market entry, strategic partnerships, licensing, structuring, and regional representation are layered services with real overlap. Presented carelessly they read as an undifferentiated block of consultancy language.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'We structured the site around how prospective clients actually arrive: they want to understand the firm, understand whether their situation fits, and then make contact. Expertise is separated into distinct areas, an About section establishes standing, and a dedicated Our Clients section names the kinds of organisations the firm works with.',
              'A resources layer — case studies, articles, and market insights — gives the firm somewhere to demonstrate regional knowledge rather than assert it. The visual language stays restrained: a deep editorial palette, a serif display face for headlines, and photography that grounds the firm in the region it operates in.',
            ],
          },
        ],
        highlights: [
          'Expertise architecture that separates overlapping advisory services',
          'Resources hub for case studies, articles, and market insight',
          'Editorial design language built for credibility over decoration',
          'Direct enquiry routes, including WhatsApp, on every page',
        ],
      },
    },
    {
      id: 'northvale',
      name: 'Northvale',
      type: 'Brand & Website Launch',
      url: 'https://www.northvale-accounting.ae/',
      urlLabel: 'northvale-accounting.ae',
      logo: { src: '/logos/northvale.png', height: 24 },
      description:
        'Developed the digital presence for a newly established accounting firm, creating a professional website that reflects trust, simplicity, and financial expertise while supporting the launch of a new business.',
      delivered: [
        'Website Strategy',
        'Website Design & Development',
        'Brand Implementation',
        'Content Integration',
      ],
      detail: {
        summary:
          'The launch presence for a new UAE accounting firm, built to convert regulatory pressure into booked consultations.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Northvale launched into a market with a clear and urgent trigger: the introduction of UAE Corporate Tax in 2023 left businesses facing new tax, accounting, and reporting obligations many were not set up for. The firm needed a digital presence from a standing start — no existing traffic, no established brand recognition, no reputation to trade on.',
              'For a new practice, the website is the credibility test. It had to look like the work of an established firm on day one while making it obvious what Northvale does and how to start a conversation.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'We led with the trigger rather than the firm. The homepage opens on UAE Corporate Tax, VAT, and accounting compliance — the problem visitors are searching for — and only then explains how Northvale addresses it through structured accounting, VAT compliance, financial reporting, and corporate tax support.',
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
    {
      id: 'dubai-unfiltered',
      name: 'Dubai Unfiltered',
      type: 'Event Platform',
      url: 'https://dubaiongefilterd.nl/',
      urlLabel: 'dubaiongefilterd.nl',
      logo: { src: '/logos/dubai-unfiltered.png', height: 42 },
      description:
        'Designed and developed a dedicated event platform to support registrations, attendee management, CRM integration, automated communications, and post-event engagement for a business networking event.',
      delivered: [
        'Landing Pages',
        'Registration System',
        'CRM Integration',
        'Email Automation',
        'Event Management Workflow',
      ],
      detail: {
        summary:
          'A single-purpose event platform that takes a visitor from landing page to paid, confirmed seat without leaving the site.',
        sections: [
          {
            title: 'The brief',
            body: [
              'Dubai Ongefilterd is an evening event for entrepreneurs, investors, and professionals looking at opportunities in Dubai and the wider region — pitched, as the name promises, as the honest version of the story. It runs to a fixed date, a fixed venue, and a limited number of seats.',
              'Events like this fail on logistics rather than interest. Registration, payment, confirmation, and the run-up communication all have to work without manual chasing, and the whole funnel has to hold up during the short window when attention is highest.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'The platform is deliberately narrow. One page, one decision: the date, venue, and time are visible immediately, the proposition is stated in a line, and reserving a seat is never more than one click away — from the fixed header or from the page itself.',
              'Payment is handled on-site through Stripe with Apple Pay, Google Pay, and card accepted, so no one is bounced to a third-party ticketing host mid-decision. Behind the form, registrations flow into CRM and trigger automated confirmation and reminder sequences, giving the organisers an attendee list that stays current without manual entry.',
            ],
          },
        ],
        highlights: [
          'Single-decision landing page built around one conversion',
          'On-site Stripe checkout — Apple Pay, Google Pay, and card',
          'Registrations synced to CRM with no manual entry',
          'Automated confirmation and reminder sequences',
        ],
      },
    },
    {
      id: 'handelsmissie-dubai',
      name: 'Handelsmissie Dubai',
      type: 'Trade Mission Platform',
      url: 'https://www.handelsmissiedubai.nl/',
      urlLabel: 'handelsmissiedubai.nl',
      description:
        'Built a dedicated platform to support a business trade mission, integrating participant registration, CRM workflows, ticketing, automated communications, and operational processes into a single digital experience.',
      delivered: [
        'Website Design & Development',
        'Registration & Ticketing',
        'CRM Integration',
        'Marketing Automation',
        'Business Workflow Integration',
      ],
      detail: {
        summary:
          'A high-consideration platform selling ten places on a four-day trade mission, where the decision needs evidence before it needs a checkout.',
        sections: [
          {
            title: 'The brief',
            body: [
              'A four-day trade mission to Dubai and the Gulf region, sold to Dutch business owners weighing expansion into the Middle East. Ten places, a fixed departure date, and a price point that puts it firmly in considered-purchase territory.',
              'That changes the job of the site. Nobody commits to a mission of this size on impulse, so the platform had to answer the obvious objections — who else is going, what actually happens on each day, what do I get for the fee — while still creating real urgency around a genuinely limited number of seats.',
            ],
          },
          {
            title: 'What we built',
            body: [
              'Scarcity and timing are made explicit and honest: a live countdown to departure, the seat count stated plainly, and a time-limited reduced rate surfaced to visitors who have not yet booked. None of it is invented — the constraints are real, so the site simply stops hiding them.',
              'The evidence sits directly underneath. Participant testimonials from previous missions run near the top of the page, followed by a full day-by-day programme and an FAQ that handles the practical questions before they become emails. Registration and ticketing run through the site into CRM, with automated communications carrying participants from booking through to departure.',
            ],
          },
        ],
        highlights: [
          'Live countdown and honest seat-availability signalling',
          'Named participant testimonials from previous missions',
          'Day-by-day programme and FAQ that pre-empt enquiries',
          'Registration, ticketing, and CRM joined into one workflow',
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
    'We combine business understanding with digital expertise, and we stay involved long after launch.',
  // `tone` is the colour a card washes in with once it opens.
  items: [
    {
      number: '01',
      title: 'Business-first thinking',
      body: 'We understand commercial objectives before recommending digital solutions.',
      tone: '#1e4f9e',
    },
    {
      number: '02',
      title: 'Part of Atty Group',
      body: 'Backed by a wider business ecosystem with expertise beyond digital.',
      tone: '#17407f',
    },
    {
      number: '03',
      title: 'Long-term partnership',
      body: 'We continue supporting your website and digital presence after launch.',
      tone: '#2a5fb0',
    },
    {
      number: '04',
      title: 'Practical solutions',
      body: 'Clear advice, reliable delivery, and websites that are easy to manage.',
      tone: '#f4590c',
    },
  ],
};

export const contactSection = {
  index: '( 05 )',
  kicker: 'Contact',
  heading: 'Ready to strengthen your digital presence?',
  body: "Whether you need a new website, support with digital marketing, or ongoing website management, we're here to help.",
  cta: 'Get in Touch',
  closingLine:
    'Professional website development and digital marketing that support your business growth.',
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
        { label: 'Digital Marketing', href: '#services' },
        { label: 'Ongoing Digital Support', href: '#services' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Clearfield. All rights reserved.`,
};
