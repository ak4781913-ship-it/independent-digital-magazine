import { SiteConfig } from '../types/editorial';

/**
 * Central publication branding & navigation configuration.
 * Designed for effortless customization or future WordPress theme integration.
 */
export const siteConfig: SiteConfig = {
  publicationName: 'Independent Digital Magazine',
  shortMark: 'IDM',
  editionLabel: 'International Digital Edition',
  tagline: 'Thoughtful essays, clear analysis, and practical guides for an interconnected world.',
  description:
    'An independent digital magazine publishing original perspectives across technology, business, personal finance, science, wellness, and practical knowledge.',
  // Placeholder domain and email — replace with production values prior to launch
  domain: 'https://example-publication.org',
  contactEmail: 'editorial@example-publication.org',
  copyrightHolder: 'Independent Digital Magazine',
  sampleNotice:
    'Editorial Demonstration: All articles, author profiles, and publication metrics shown in this edition are original sample content created for layout and publishing architecture preview.',
  mainNavigation: [
    { id: 'home', label: 'Home', target: '#top' },
    { id: 'latest', label: 'Latest', target: '#latest-articles' },
    { id: 'categories', label: 'Categories', target: '#explore-categories' },
    { id: 'picks', label: "Editor's Picks", target: '#editors-picks' },
    { id: 'about', label: 'About', target: 'policy:about' },
  ],
  newsletter: {
    eyebrow: 'Weekly Dispatch',
    heading: 'Essays worth your Sunday morning.',
    description:
      'Receive a calm, curated digest of our flagship essays, practical frameworks, and long-form guides—delivered once a week without noise.',
    placeholder: 'Enter your email address',
    ctaLabel: 'Subscribe',
    disclaimer:
      'Frontend demonstration only. No email is transmitted or stored externally in this preview milestone.',
  },
  socialLinks: [
    {
      label: 'X / Twitter',
      href: 'https://example.com/placeholder/x',
      handle: '@independentmag',
      isPlaceholder: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://example.com/placeholder/linkedin',
      handle: 'Independent Digital Magazine',
      isPlaceholder: true,
    },
    {
      label: 'RSS Feed',
      href: 'https://example.com/placeholder/feed.xml',
      handle: '/feed.xml',
      isPlaceholder: true,
    },
    {
      label: 'Instagram',
      href: 'https://example.com/placeholder/instagram',
      handle: '@independentmag',
      isPlaceholder: true,
    },
  ],
};
