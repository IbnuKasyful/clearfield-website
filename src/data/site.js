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
      media: [
        { label: 'Website mockup', ratio: '4 / 3' },
        { label: 'UI detail', ratio: '4 / 3' },
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

export const projects = {
  index: '( 03 )',
  kicker: 'Featured projects',
  heading:
    'Every business has different goals. Some need a professional corporate website. Others need an event platform, a registration system, or digital tools that support day-to-day operations.',
  intro: "Here are a few examples of projects we've delivered.",
  items: [
    {
      id: 'atty-partners',
      name: 'Atty & Partners',
      type: 'Corporate Website',
      description:
        'Designed and developed a professional corporate website for an international business advisory firm, focused on communicating complex services with clarity, building credibility, and creating a seamless user experience for businesses expanding into the Middle East.',
      delivered: [
        'Website Strategy',
        'UX & UI Design',
        'Website Development',
        'Content Implementation',
        'Performance Optimisation',
      ],
    },
    {
      id: 'northvale',
      name: 'Northvale',
      type: 'Brand & Website Launch',
      description:
        'Developed the digital presence for a newly established accounting firm, creating a professional website that reflects trust, simplicity, and financial expertise while supporting the launch of a new business.',
      delivered: [
        'Website Strategy',
        'Website Design & Development',
        'Brand Implementation',
        'Content Integration',
      ],
    },
    {
      id: 'dubai-unfiltered',
      name: 'Dubai Unfiltered',
      type: 'Event Platform',
      description:
        'Designed and developed a dedicated event platform to support registrations, attendee management, CRM integration, automated communications, and post-event engagement for a business networking event.',
      delivered: [
        'Landing Pages',
        'Registration System',
        'CRM Integration',
        'Email Automation',
        'Event Management Workflow',
      ],
    },
    {
      id: 'handelsmissie-dubai',
      name: 'Handelsmissie Dubai',
      type: 'Trade Mission Platform',
      description:
        'Built a dedicated platform to support a business trade mission, integrating participant registration, CRM workflows, ticketing, automated communications, and operational processes into a single digital experience.',
      delivered: [
        'Website Design & Development',
        'Registration & Ticketing',
        'CRM Integration',
        'Marketing Automation',
        'Business Workflow Integration',
      ],
    },
  ],
};

export const why = {
  index: '( 04 )',
  kicker: 'Why Clearfield?',
  heading: 'Why businesses work with Clearfield',
  intro:
    'We combine business understanding with digital expertise, and we stay involved long after launch.',
  items: [
    {
      number: '01',
      title: 'Business-first thinking',
      body: 'We understand commercial objectives before recommending digital solutions.',
      fill: 25,
    },
    {
      number: '02',
      title: 'Part of Atty Group',
      body: 'Backed by a wider business ecosystem with expertise beyond digital.',
      fill: 50,
    },
    {
      number: '03',
      title: 'Long-term partnership',
      body: 'We continue supporting your website and digital presence after launch.',
      fill: 75,
    },
    {
      number: '04',
      title: 'Practical solutions',
      body: 'Clear advice, reliable delivery, and websites that are easy to manage.',
      fill: 92,
      accent: true,
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
