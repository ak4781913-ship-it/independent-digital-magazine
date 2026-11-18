import { Category } from '../types/editorial';

export const categories: Category[] = [
  {
    id: 'cat-01',
    slug: 'technology-ai',
    name: 'Technology & Artificial Intelligence',
    shortName: 'Technology & AI',
    deskCode: '01',
    description: 'Applied machine intelligence, software architecture, and the tools reshaping human work.',
  },
  {
    id: 'cat-02',
    slug: 'digital-world',
    name: 'Digital World & Internet',
    shortName: 'Digital World',
    deskCode: '02',
    description: 'Open web protocols, digital privacy, online culture, and information infrastructure.',
  },
  {
    id: 'cat-03',
    slug: 'mobile-gadgets',
    name: 'Mobile & Gadgets',
    shortName: 'Mobile & Gadgets',
    deskCode: '03',
    description: 'Hardware craftsmanship, everyday computing devices, and thoughtful product evaluations.',
  },
  {
    id: 'cat-04',
    slug: 'business-entrepreneurship',
    name: 'Business & Entrepreneurship',
    shortName: 'Business',
    deskCode: '04',
    description: 'Independent companies, sustainable operations, leadership, and modern commerce.',
  },
  {
    id: 'cat-05',
    slug: 'personal-finance',
    name: 'Personal Finance',
    shortName: 'Personal Finance',
    deskCode: '05',
    description: 'Long-term wealth stewardship, household budgeting systems, and financial literacy.',
  },
  {
    id: 'cat-06',
    slug: 'health-wellness',
    name: 'Health & Wellness',
    shortName: 'Health & Wellness',
    deskCode: '06',
    description: 'Restorative sleep, preventive habits, nutrition fundamentals, and mental clarity.',
  },
  {
    id: 'cat-07',
    slug: 'lifestyle-productivity',
    name: 'Lifestyle & Productivity',
    shortName: 'Lifestyle',
    deskCode: '07',
    description: 'Deliberate focus, analog-digital balance, home environments, and creative routines.',
  },
  {
    id: 'cat-08',
    slug: 'travel-tourism',
    name: 'Travel & Tourism',
    shortName: 'Travel',
    deskCode: '08',
    description: 'Slow rail journeys, cultural geography, architectural destinations, and field notes.',
  },
  {
    id: 'cat-09',
    slug: 'education-knowledge',
    name: 'Education & Knowledge',
    shortName: 'Education',
    deskCode: '09',
    description: 'Self-directed learning frameworks, reading methodologies, and lifelong study.',
  },
  {
    id: 'cat-10',
    slug: 'online-earning-skills',
    name: 'Online Earning & Digital Skills',
    shortName: 'Digital Skills',
    deskCode: '10',
    description: 'Independent consulting, digital publishing craft, writing, and durable remote skills.',
  },
  {
    id: 'cat-11',
    slug: 'science-innovation',
    name: 'Science & Innovation',
    shortName: 'Science',
    deskCode: '11',
    description: 'Materials research, energy systems, optics, and foundational scientific inquiry.',
  },
  {
    id: 'cat-12',
    slug: 'how-to-guides',
    name: 'How-To & Practical Guides',
    shortName: 'How-To Guides',
    deskCode: '12',
    description: 'Step-by-step manuals, checklists, and evergreen workflows built for immediate application.',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}
