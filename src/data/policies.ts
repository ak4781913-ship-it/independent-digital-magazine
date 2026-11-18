import { PolicyDocument } from '../types/editorial';

export const policyDocuments: Record<PolicyDocument['id'], PolicyDocument> = {
  about: {
    id: 'about',
    title: 'About This Publication',
    subtitle: 'Editorial Mission & Configurable Publishing Architecture',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Independent Editorial Standards',
        body: [
          'Independent Digital Magazine is a configurable multi-niche digital publishing platform built for long-form essays, reported explainers, and practical evergreen guides.',
          'Our architecture separates presentation from editorial data, allowing future integration with headless publishing workflows or custom WordPress themes without sacrificing reading clarity.',
        ],
      },
      {
        heading: 'Demonstration Content Notice',
        body: [
          'Every article, contributor profile, and category count presented in this initial homepage milestone is sample demonstration material. No real-world news claims, proprietary studies, or external statistics are fabricated here.',
        ],
      },
    ],
  },
  contact: {
    id: 'contact',
    title: 'Contact & Editorial Desk',
    subtitle: 'Reader Inquiries, Corrections & Future Partnerships',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Editorial Correspondence',
        body: [
          'For reader feedback, topic suggestions, or editorial inquiries regarding the configurable publication template, reach our sample editorial desk via the configured contact email in site settings.',
          'In a live production deployment, this section connects directly to a verified contact handler or editorial inbox.',
        ],
      },
      {
        heading: 'Corrections & Reader Trust',
        body: [
          'Transparent corrections and clear update timestamps are built directly into our article header and schema components to ensure lasting credibility with readers and search engines alike.',
        ],
      },
    ],
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'Data Minimalism & Reader Respect',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Local Preview Behavior',
        body: [
          'This frontend prototype operates entirely in your browser. Theme preferences (light or dark appearance) are stored locally in browser storage and are never transmitted to any external server.',
          'The newsletter subscription form is a frontend-only demonstration and does not collect, store, or transmit submitted email addresses.',
        ],
      },
      {
        heading: 'Future Monetization & Analytics Readiness',
        body: [
          'When deployed in future production phases, explicit cookie consent, analytics disclosures, and advertising transparency notices will be updated here prior to activation.',
        ],
      },
    ],
  },
  terms: {
    id: 'terms',
    title: 'Terms of Use',
    subtitle: 'Guidelines for Accessing This Digital Edition',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Informational Purpose',
        body: [
          'All sample essays, financial frameworks, wellness reflections, and practical guides displayed on this platform are provided strictly for general informational and demonstration purposes.',
          'Nothing on this platform constitutes personalized medical, legal, tax, or investment advice.',
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'Layout design, typographic configuration, and sample copy are provided as part of this independent digital publication prototype.',
        ],
      },
    ],
  },
  'editorial-policy': {
    id: 'editorial-policy',
    title: 'Editorial Policy',
    subtitle: 'Clarity, Independence & Original Craft',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Originality & Verification',
        body: [
          'Published journalism and evergreen guides must prioritize reader utility over click-driven sensationalism. Every article layout includes clear bylines, publication dates, update history, and structured headings.',
        ],
      },
      {
        heading: 'Affiliate & Sponsorship Disclosure Readiness',
        body: [
          'Although advertising and affiliate links are out of scope for this initial milestone, our editorial policy mandates unambiguous labeling whenever commercial recommendations or sponsored placements are introduced in future phases.',
        ],
      },
    ],
  },
  disclaimer: {
    id: 'disclaimer',
    title: 'Disclaimer',
    subtitle: 'Sample Content & Professional Advice Notice',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Sample Demonstration Disclaimer',
        body: [
          'All articles, author biographies, trending rankings, and weekly popularity indicators visible in this build are illustrative sample data designed to validate typography, layout hierarchy, and responsive performance.',
        ],
      },
      {
        heading: 'No Professional Advice',
        body: [
          'Readers should consult qualified professionals before making financial, health, or business decisions based on general editorial articles.',
        ],
      },
    ],
  },
};
