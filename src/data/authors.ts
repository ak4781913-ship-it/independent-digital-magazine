import { Author } from '../types/editorial';

/**
 * Sample editorial contributors for demonstration purposes.
 * These are fictional editorial personas illustrating the author profile architecture.
 */
export const authors: Author[] = [
  {
    id: 'author-clara-vance',
    name: 'Clara Vance',
    role: 'Sample Technology Contributor',
    desk: 'Technology & Artificial Intelligence',
    bio: 'Fictional sample profile covering software systems, human-centered interfaces, and digital infrastructure for this editorial layout.',
    initials: 'CV',
  },
  {
    id: 'author-julian-mercer',
    name: 'Julian Mercer',
    role: 'Sample Finance & Business Contributor',
    desk: 'Business & Personal Finance',
    bio: 'Fictional sample profile writing essays on independent businesses, household financial resilience, and quiet operations.',
    initials: 'JM',
  },
  {
    id: 'author-nadia-okafor',
    name: 'Nadia Okafor',
    role: 'Sample Science & Knowledge Contributor',
    desk: 'Science, Innovation & Education',
    bio: 'Fictional sample profile exploring materials science, clear scientific writing, and structured learning habits.',
    initials: 'NO',
  },
  {
    id: 'author-henrik-lindqvist',
    name: 'Henrik Lindqvist',
    role: 'Sample Culture & Travel Contributor',
    desk: 'Travel, Lifestyle & Wellness',
    bio: 'Fictional sample profile focusing on slow travel, restorative architecture, and sustainable daily focus.',
    initials: 'HL',
  },
  {
    id: 'author-elena-rostova',
    name: 'Elena Rostova',
    role: 'Sample Practical Guides Contributor',
    desk: 'Digital Skills & How-To Guides',
    bio: 'Fictional sample profile authoring step-by-step guides on independent publishing, hardware workflows, and digital craft.',
    initials: 'ER',
  },
];

export function getAuthorById(id: string): Author {
  return authors.find((author) => author.id === id) ?? authors[0];
}
