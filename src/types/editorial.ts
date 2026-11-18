export type CategorySlug =
  | 'technology-ai'
  | 'digital-world'
  | 'mobile-gadgets'
  | 'business-entrepreneurship'
  | 'personal-finance'
  | 'health-wellness'
  | 'lifestyle-productivity'
  | 'travel-tourism'
  | 'education-knowledge'
  | 'online-earning-skills'
  | 'science-innovation'
  | 'how-to-guides';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  shortName: string;
  deskCode: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  desk: string;
  bio: string;
  initials: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  level?: 2 | 3;
  paragraphs: string[];
  pullQuote?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: CategorySlug;
  authorId: string;
  publishedAt: string;
  publishedIso: string;
  updatedAt?: string;
  updatedIso?: string;
  readingTimeMinutes: number;
  coverImage: string;
  coverImageAlt: string;
  coverCaption: string;
  featuredHero?: boolean;
  trendingRank?: number;
  editorsPick?: boolean;
  popularRank?: number;
  tags: string[];
  isSampleContent: true;
  sections: ArticleSection[];
}

export interface NavItem {
  id: string;
  label: string;
  target: string;
}

export interface PolicyDocument {
  id: 'about' | 'contact' | 'privacy' | 'terms' | 'editorial-policy' | 'disclaimer';
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: {
    heading: string;
    body: string[];
  }[];
}

export interface SiteConfig {
  publicationName: string;
  shortMark: string;
  editionLabel: string;
  tagline: string;
  description: string;
  domain: string;
  contactEmail: string;
  copyrightHolder: string;
  sampleNotice: string;
  mainNavigation: NavItem[];
  newsletter: {
    eyebrow: string;
    heading: string;
    description: string;
    placeholder: string;
    ctaLabel: string;
    disclaimer: string;
  };
  socialLinks: {
    label: string;
    href: string;
    handle: string;
    isPlaceholder: boolean;
  }[];
}
