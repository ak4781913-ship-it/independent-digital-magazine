import { Article } from '../types/editorial';

const IMG_HERO_AI = '/src/assets/images/hero_ai_architecture_1795011169168.jpg';
const IMG_DIGITAL = '/src/assets/images/editorial_digital_networks_1795011169638.jpg';
const IMG_MOBILE = '/src/assets/images/editorial_mobile_hardware_1795011169472.jpg';
const IMG_FINANCE = '/src/assets/images/editorial_finance_markets_1795011169059.jpg';
const IMG_WELLNESS = '/src/assets/images/editorial_wellness_mind_1795011170114.jpg';
const IMG_TRAVEL = '/src/assets/images/editorial_travel_horizon_1795011170638.jpg';
const IMG_SCIENCE = '/src/assets/images/editorial_science_lab_1795011171256.jpg';
const IMG_CREATOR = '/src/assets/images/editorial_remote_craft_1795011172810.jpg';

/**
 * Sample article catalog covering all 12 publication categories.
 * Structured to map cleanly to WordPress posts, custom taxonomies, and Schema.org fields.
 */
export const articles: Article[] = [
  {
    id: 'art-01',
    slug: 'quiet-architecture-of-human-centered-ai',
    title: 'The Quiet Architecture of Human-Centered Intelligence',
    excerpt:
      'Why the next era of software design trades spectacle for calm, transparent interfaces that amplify human judgment rather than competing for attention.',
    categorySlug: 'technology-ai',
    authorId: 'author-clara-vance',
    publishedAt: 'Nov 16, 2026',
    publishedIso: '2026-11-16T09:00:00Z',
    updatedAt: 'Nov 17, 2026',
    updatedIso: '2026-11-17T14:30:00Z',
    readingTimeMinutes: 8,
    coverImage: IMG_HERO_AI,
    coverImageAlt: 'Contemporary architectural reading library bathed in daylight with timber reading tables',
    coverCaption: 'Fig. 1 — Architectural calm and clear spatial hierarchy mirror how thoughtful digital tools preserve human focus.',
    featuredHero: true,
    trendingRank: 1,
    editorsPick: true,
    popularRank: 1,
    tags: ['Software Design', 'Applied AI', 'Human Judgment'],
    isSampleContent: true,
    sections: [
      {
        id: 'calm-utility',
        heading: 'From Spectacle to Calm Utility',
        level: 2,
        paragraphs: [
          'Every wave of general-purpose computing begins in spectacle. Early tools announce themselves loudly through novelty, dense control panels, and constant prompts for attention. Over time, however, the software that endures is almost always the software that recedes into the background of serious work.',
          'Across research studios and independent product teams, a quieter design philosophy is emerging. Instead of wrapping every workflow in conversational sidebars, designers are embedding machine assistance directly into predictable, inspectable steps where the reader or practitioner remains firmly in command.',
        ],
        pullQuote: 'Durable tools do not compete with the thinker; they clear space around the work itself.',
      },
      {
        id: 'transparency-as-interface',
        heading: 'Designing for Inspectable Decisions',
        level: 2,
        paragraphs: [
          'Trust in automated systems rarely comes from polish alone. It grows when an interface makes its reasoning legible: showing what inputs were considered, what assumptions remain open, and how a person can override or refine an output in a single deliberate motion.',
          'When software honors clear typography, explicit boundaries, and reversible actions, adoption deepens naturally without coercive notifications.',
        ],
      },
      {
        id: 'editorial-workflow-lessons',
        heading: 'What Publishers Can Learn from Quiet Tools',
        level: 3,
        paragraphs: [
          'Digital publications face a similar tension. Readers arrive seeking clarity, context, and intellectual respect—not flashing banners or fragmented feeds. Applying architectural discipline to digital prose remains the simplest competitive advantage on the open web.',
        ],
      },
    ],
  },
  {
    id: 'art-02',
    slug: 'designing-resilient-personal-financial-buffers',
    title: 'Designing a Resilient Personal Financial Buffer for Uncertain Cycles',
    excerpt:
      'A practical structural approach to liquidity tiers, fixed-cost discipline, and calm decision-making when household income fluctuates.',
    categorySlug: 'personal-finance',
    authorId: 'author-julian-mercer',
    publishedAt: 'Nov 15, 2026',
    publishedIso: '2026-11-15T08:00:00Z',
    readingTimeMinutes: 7,
    coverImage: IMG_FINANCE,
    coverImageAlt: 'Sunlit walnut study desk with linen notebook, brass compass, and architectural shadows',
    coverCaption: 'Fig. 1 — Measured planning begins on paper before translating commitments into automated monthly systems.',
    trendingRank: 2,
    editorsPick: true,
    popularRank: 2,
    tags: ['Liquidity', 'Household Planning', 'Sample Framework'],
    isSampleContent: true,
    sections: [
      {
        id: 'three-tiers',
        heading: 'Separating Immediate Liquidity from Long-Term Capital',
        level: 2,
        paragraphs: [
          'Most household stress does not stem from a lack of spreadsheets; it arises when short-term obligations and long-term ambitions share the same pool of money. Separating funds by time horizon removes ambiguity before pressure arrives.',
          'An operating checking buffer covers predictable monthly bills, while an isolated cash reserve protects against irregular income gaps or unexpected repairs without forcing premature asset sales.',
        ],
        pullQuote: 'Financial peace is often a function of clear separation rather than complex optimization.',
      },
      {
        id: 'fixed-cost-ratio',
        heading: 'Auditing Fixed Commitments Twice a Year',
        level: 2,
        paragraphs: [
          'Recurring obligations quietly expand during periods of comfort. Conducting a calm semiannual review of subscriptions, housing overhead, and insurance deductibles preserves flexibility long before any downturn requires abrupt cuts.',
        ],
      },
    ],
  },
  {
    id: 'art-03',
    slug: 'slow-rail-routes-and-the-return-of-unhurried-travel',
    title: 'Slow Rail Corridors and the Return of Unhurried Travel',
    excerpt:
      'Why cross-regional trains invite deeper observation of landscape, local architecture, and regional rhythm than compressed air itineraries.',
    categorySlug: 'travel-tourism',
    authorId: 'author-henrik-lindqvist',
    publishedAt: 'Nov 14, 2026',
    publishedIso: '2026-11-14T10:15:00Z',
    readingTimeMinutes: 6,
    coverImage: IMG_TRAVEL,
    coverImageAlt: 'Coastal cliffside passenger train curving above a calm northern sea at dawn',
    coverCaption: 'Fig. 1 — Morning light along coastal rail lines restores a continuous sense of geographic transition.',
    trendingRank: 3,
    popularRank: 4,
    tags: ['Rail Journeys', 'Slow Travel', 'Field Notes'],
    isSampleContent: true,
    sections: [
      {
        id: 'geography-of-transition',
        heading: 'Experiencing Distance as Continuous Landscape',
        level: 2,
        paragraphs: [
          'Air travel compresses geography into departure lounges and arrival gates, erasing the gradual shifts in geology, vernacular building styles, and dialect that connect neighboring regions. Rail travel restores those transitions in real time.',
          'Watching timber architecture give way to coastal stone over three unhurried hours anchors a traveler inside a place before stepping onto the platform.',
        ],
      },
      {
        id: 'packing-for-rail',
        heading: 'Practical Habits for Multi-Stop Rail Itineraries',
        level: 2,
        paragraphs: [
          'Choosing station-adjacent lodgings, packing a single soft carry-on bag, and leaving generous transfer buffers transforms transit days from errands into the centerpiece of the trip.',
        ],
      },
    ],
  },
  {
    id: 'art-04',
    slug: 'open-web-protocols-and-independent-publishing',
    title: 'Open Web Protocols and the Renewal of Independent Publishing',
    excerpt:
      'How RSS feeds, clean HTML semantics, and portable content archives protect writers and readers from algorithmic volatility.',
    categorySlug: 'digital-world',
    authorId: 'author-clara-vance',
    publishedAt: 'Nov 13, 2026',
    publishedIso: '2026-11-13T11:00:00Z',
    readingTimeMinutes: 6,
    coverImage: IMG_DIGITAL,
    coverImageAlt: 'Modern architectural server and data archive corridor with brushed steel and glass panels',
    coverCaption: 'Fig. 1 — Durable information infrastructure relies on open standards that outlast individual platforms.',
    trendingRank: 4,
    popularRank: 5,
    tags: ['Open Web', 'RSS', 'Digital Sovereignty'],
    isSampleContent: true,
    sections: [
      {
        id: 'beyond-borrowed-feeds',
        heading: 'Publishing Beyond Borrowed Distribution',
        level: 2,
        paragraphs: [
          'For more than a decade, publishers treated social feeds as reliable storefronts, only to discover that feed priorities shift without notice. Independent publications that anchor their archives on open, standard-compliant web domains retain direct relationships with their readership.',
        ],
      },
      {
        id: 'portable-markup',
        heading: 'Why Semantic HTML Remains Future-Proof',
        level: 2,
        paragraphs: [
          'Clean document structure—clear heading levels, descriptive alt attributes, and portable structured metadata—ensures articles remain legible across browsers, feed readers, search engines, and future CMS migrations.',
        ],
      },
    ],
  },
  {
    id: 'art-05',
    slug: 'tactile-hardware-and-repairable-mobile-devices',
    title: 'Tactile Hardware and the Case for Longer-Lasting Devices',
    excerpt:
      'Examining modular components, matte finishes, and deliberate ergonomics in everyday smartphones and desk accessories.',
    categorySlug: 'mobile-gadgets',
    authorId: 'author-elena-rostova',
    publishedAt: 'Nov 12, 2026',
    publishedIso: '2026-11-12T07:45:00Z',
    readingTimeMinutes: 5,
    coverImage: IMG_MOBILE,
    coverImageAlt: 'Matte titanium smartphone and precision aluminum rotary dial on dark slate surface',
    coverCaption: 'Fig. 1 — Precision-machined surfaces age gracefully when designed around serviceability rather than annual churn.',
    trendingRank: 5,
    popularRank: 3,
    tags: ['Industrial Design', 'Repairability', 'Hardware'],
    isSampleContent: true,
    sections: [
      {
        id: 'materials-that-age',
        heading: 'Choosing Finishes Built for Five-Year Ownership',
        level: 2,
        paragraphs: [
          'High-gloss coatings look pristine in display cases and weathered within months of pocket carry. Bead-blasted metals, replaceable batteries, and standardized fasteners invite people to keep reliable tools in service for years.',
        ],
      },
      {
        id: 'software-longevity',
        heading: 'Pairing Physical Durability with Quiet Software',
        level: 2,
        paragraphs: [
          'Hardware longevity only fulfills its promise when matched with predictable security updates and uncluttered operating system defaults.',
        ],
      },
    ],
  },
  {
    id: 'art-06',
    slug: 'optical-materials-and-next-generation-photonics',
    title: 'Precision Optics and the Quiet Frontier of Photonic Computing',
    excerpt:
      'A foundational explainer on how light-guided waveguides and specialty glass lenses reduce energy losses in high-throughput systems.',
    categorySlug: 'science-innovation',
    authorId: 'author-nadia-okafor',
    publishedAt: 'Nov 11, 2026',
    publishedIso: '2026-11-11T13:20:00Z',
    readingTimeMinutes: 8,
    coverImage: IMG_SCIENCE,
    coverImageAlt: 'Optical glass lenses and prisms refracting clean light beams on a dark laboratory table',
    coverCaption: 'Fig. 1 — Benchtop optical assemblies illustrate how refraction and low-loss waveguides guide coherent light.',
    editorsPick: true,
    tags: ['Optics', 'Materials Science', 'Explainer'],
    isSampleContent: true,
    sections: [
      {
        id: 'light-over-copper',
        heading: 'Why Photons Complement Electronic Circuits',
        level: 2,
        paragraphs: [
          'Moving electrical signals across dense copper traces generates heat as data rates climb. Optical interconnects transport information using light pulses instead, dramatically lowering resistive losses over medium and long links.',
        ],
      },
      {
        id: 'fabrication-challenges',
        heading: 'Engineering Tolerances at Sub-Micron Scale',
        level: 2,
        paragraphs: [
          'Aligning glass fibers with microscopic waveguides requires extraordinary mechanical stability, driving innovation across metrology, adhesives, and cleanroom packaging.',
        ],
      },
    ],
  },
  {
    id: 'art-07',
    slug: 'restorative-daylight-and-cognitive-stamina',
    title: 'Restorative Daylight, Acoustic Calm, and Daily Cognitive Stamina',
    excerpt:
      'How natural morning light exposure, quiet acoustic spaces, and consistent sleep anchors support sustained mental clarity.',
    categorySlug: 'health-wellness',
    authorId: 'author-henrik-lindqvist',
    publishedAt: 'Nov 10, 2026',
    publishedIso: '2026-11-10T09:30:00Z',
    readingTimeMinutes: 6,
    coverImage: IMG_WELLNESS,
    coverImageAlt: 'Tranquil glass-roofed stone courtyard with olive trees and person reading by natural light',
    coverCaption: 'Fig. 1 — Morning daylight and uncluttered acoustic surroundings reinforce steady circadian alignment.',
    editorsPick: true,
    tags: ['Circadian Rhythm', 'Focus', 'Preventive Habits'],
    isSampleContent: true,
    sections: [
      {
        id: 'environmental-cues',
        heading: 'Treating Environment as Quiet Health Infrastructure',
        level: 2,
        paragraphs: [
          'Wellbeing routines frequently emphasize willpower while overlooking physical surroundings. Stepping into outdoor daylight shortly after waking and dimming harsh overhead illumination in the evening creates reliable biological cues with minimal friction.',
        ],
      },
      {
        id: 'unhurried-recovery',
        heading: 'Protecting Screen-Free Transition Windows',
        level: 2,
        paragraphs: [
          'Twenty minutes of analog reading or quiet walking between concentrated work and sleep allows nervous systems to settle naturally.',
        ],
      },
    ],
  },
  {
    id: 'art-08',
    slug: 'building-a-sustainable-one-person-editorial-studio',
    title: 'Building a Sustainable Independent Publishing and Consulting Practice',
    excerpt:
      'Lessons on pricing clarity, evergreen asset libraries, and avoiding burnout while cultivating durable digital skills.',
    categorySlug: 'online-earning-skills',
    authorId: 'author-elena-rostova',
    publishedAt: 'Nov 09, 2026',
    publishedIso: '2026-11-09T15:00:00Z',
    readingTimeMinutes: 7,
    coverImage: IMG_CREATOR,
    coverImageAlt: 'Oak creator desk with ceramic coffee cup, architectural sketchbook, and stylus by bright window',
    coverCaption: 'Fig. 1 — Independent practitioners thrive when deep craft time is shielded from constant administrative churn.',
    popularRank: 6,
    tags: ['Digital Craft', 'Independent Work', 'Publishing'],
    isSampleContent: true,
    sections: [
      {
        id: 'craft-before-scale',
        heading: 'Depth Over Constant Output',
        level: 2,
        paragraphs: [
          'Many aspiring independent creators burn out chasing daily algorithmic volume. Focusing on thoroughly researched evergreen guides and reliable client deliverables builds compounding trust over months and years.',
        ],
      },
      {
        id: 'clear-scope',
        heading: 'Documenting Workflows as Reusable Assets',
        level: 2,
        paragraphs: [
          'Every repeated client explanation can evolve into a structured template, checklist, or educational handbook that serves a broader audience.',
        ],
      },
    ],
  },
  {
    id: 'art-09',
    slug: 'small-teams-and-the-economics-of-patient-companies',
    title: 'Small Teams and the Quiet Economics of Patient Companies',
    excerpt:
      'Why profitable, conservatively capitalized businesses often outlast hyper-growth rivals by focusing on retention and craft.',
    categorySlug: 'business-entrepreneurship',
    authorId: 'author-julian-mercer',
    publishedAt: 'Nov 08, 2026',
    publishedIso: '2026-11-08T10:00:00Z',
    readingTimeMinutes: 7,
    coverImage: IMG_FINANCE,
    coverImageAlt: 'Architectural walnut desk overlooking a city skyline with organized project blueprints',
    coverCaption: 'Fig. 1 — Patient operators measure progress through customer longevity and steady margin discipline.',
    tags: ['Entrepreneurship', 'Operations', 'Strategy'],
    isSampleContent: true,
    sections: [
      {
        id: 'capital-efficiency',
        heading: 'The Strategic Advantage of Low Overhead',
        level: 2,
        paragraphs: [
          'Companies that match hiring pace to verified customer demand preserve optionality. When market conditions tighten, lean teams can refine product quality rather than scrambling for emergency financing.',
        ],
      },
      {
        id: 'measured-growth',
        heading: 'Serving a Well-Defined Audience Deeply',
        level: 2,
        paragraphs: [
          'Clear positioning lowers acquisition friction and allows product roadmaps to stay coherent over multiple years.',
        ],
      },
    ],
  },
  {
    id: 'art-10',
    slug: 'analog-notebooks-and-deep-reading-rituals',
    title: 'Analog Notebooks and the Craft of Deep Attention',
    excerpt:
      'Integrating paper capture with digital archives so daily productivity feels intentional rather than reactive.',
    categorySlug: 'lifestyle-productivity',
    authorId: 'author-henrik-lindqvist',
    publishedAt: 'Nov 07, 2026',
    publishedIso: '2026-11-07T08:30:00Z',
    readingTimeMinutes: 5,
    coverImage: IMG_CREATOR,
    coverImageAlt: 'Open sketchbook with architectural drawings and pen beside stoneware mug on wooden table',
    coverCaption: 'Fig. 1 — Paper scratchpads slow thought just enough to separate urgent noise from meaningful priorities.',
    tags: ['Deep Work', 'Minimalism', 'Habits'],
    isSampleContent: true,
    sections: [
      {
        id: 'paper-filter',
        heading: 'Using Paper as a Morning Priority Filter',
        level: 2,
        paragraphs: [
          'Writing three clear objectives on a physical page before opening email prevents other people’s emergencies from dictating the first two hours of the day.',
        ],
      },
    ],
  },
  {
    id: 'art-11',
    slug: 'spaced-synthesis-a-framework-for-lifelong-learning',
    title: 'Spaced Synthesis: Retaining Complex Subjects Without Burnout',
    excerpt:
      'Moving beyond passive highlighting toward active summarization, conceptual mapping, and periodic review.',
    categorySlug: 'education-knowledge',
    authorId: 'author-nadia-okafor',
    publishedAt: 'Nov 06, 2026',
    publishedIso: '2026-11-06T12:00:00Z',
    readingTimeMinutes: 6,
    coverImage: IMG_HERO_AI,
    coverImageAlt: 'Quiet university-grade reading room with person writing notes in open books',
    coverCaption: 'Fig. 1 — Active synthesis transforms fleeting reading sessions into durable mental models.',
    tags: ['Learning', 'Note-Taking', 'Study Habits'],
    isSampleContent: true,
    sections: [
      {
        id: 'beyond-highlighting',
        heading: 'Why Passive Highlighting Fades Quickly',
        level: 2,
        paragraphs: [
          'Underlining passages feels productive in the moment, yet creates an illusion of mastery. Closing the book and explaining the core argument in three plain sentences reveals immediately what still needs clarification.',
        ],
      },
    ],
  },
  {
    id: 'art-12',
    slug: 'practical-guide-to-editorial-seo-architecture',
    title: 'How to Structure Evergreen Articles for Readers and Search Engines',
    excerpt:
      'A step-by-step editorial checklist covering heading hierarchy, descriptive alt text, internal linking, and clean URL slugs.',
    categorySlug: 'how-to-guides',
    authorId: 'author-elena-rostova',
    publishedAt: 'Nov 05, 2026',
    publishedIso: '2026-11-05T14:00:00Z',
    readingTimeMinutes: 9,
    coverImage: IMG_DIGITAL,
    coverImageAlt: 'Symmetrical glass and steel archival corridor representing structured information systems',
    coverCaption: 'Fig. 1 — Well-organized document hierarchy serves human skimmers and automated crawlers equally.',
    tags: ['SEO Basics', 'Editorial Checklist', 'Publishing Guide'],
    isSampleContent: true,
    sections: [
      {
        id: 'heading-discipline',
        heading: 'Step 1: Enforce One H1 and Logical H2–H3 Nesting',
        level: 2,
        paragraphs: [
          'Reserve the primary H1 strictly for the article headline. Divide major thematic shifts into H2 sections and supporting details into H3 subsections so a clean Table of Contents generates automatically.',
        ],
      },
      {
        id: 'slugs-and-metadata',
        heading: 'Step 2: Craft Readable Slugs and Honest Descriptions',
        level: 2,
        paragraphs: [
          'Keep URL slugs concise, hyphenated, and timeless—omitting temporary years unless the piece is explicitly an annual edition. Write meta descriptions that accurately summarize what a reader will gain in 140–160 characters.',
        ],
      },
    ],
  },
  {
    id: 'art-13',
    slug: 'evaluating-personal-cloud-backups-three-two-one-rule',
    title: 'How to Build a Calm 3-2-1 Backup Routine for Family Photos and Documents',
    excerpt:
      'An accessible walkthrough for keeping three copies across two media types and one off-site archive without technical complexity.',
    categorySlug: 'how-to-guides',
    authorId: 'author-clara-vance',
    publishedAt: 'Nov 03, 2026',
    publishedIso: '2026-11-03T09:15:00Z',
    readingTimeMinutes: 6,
    coverImage: IMG_MOBILE,
    coverImageAlt: 'Precision matte smartphone and storage dial resting on dark stone',
    coverCaption: 'Fig. 1 — Automated local and off-site redundancy prevents single-device loss from becoming permanent.',
    tags: ['Backups', 'Practical Guide', 'Digital Hygiene'],
    isSampleContent: true,
    sections: [
      {
        id: 'three-two-one',
        heading: 'Understanding the Three-Copy Principle',
        level: 2,
        paragraphs: [
          'Synchronization is not a backup: if a file is accidentally deleted on one synced device, it vanishes everywhere. Maintain a primary working copy, a local external drive snapshot, and an encrypted off-site archive.',
        ],
      },
    ],
  },
  {
    id: 'art-14',
    slug: 'zero-based-monthly-cash-flow-reset',
    title: 'A 45-Minute Monthly Cash-Flow Reset for Busy Households',
    excerpt:
      'Replace guilt-driven budgeting apps with a calm end-of-month reconciliation ritual that aligns spending with real priorities.',
    categorySlug: 'personal-finance',
    authorId: 'author-julian-mercer',
    publishedAt: 'Nov 01, 2026',
    publishedIso: '2026-11-01T11:00:00Z',
    readingTimeMinutes: 5,
    coverImage: IMG_FINANCE,
    coverImageAlt: 'Organized linen ledger and brass pen on sunlit wooden desk',
    coverCaption: 'Fig. 1 — A brief monthly review replaces daily micro-tracking with clear high-level awareness.',
    tags: ['Cash Flow', 'Monthly Ritual', 'Personal Finance'],
    isSampleContent: true,
    sections: [
      {
        id: 'monthly-review',
        heading: 'Reviewing Three Numbers Once a Month',
        level: 2,
        paragraphs: [
          'Tracking net inflows, essential fixed commitments, and intentional savings transfers takes less than an hour per month and reveals trends far more clearly than categorizing every coffee receipt.',
        ],
      },
    ],
  },
  {
    id: 'art-15',
    slug: 'designing-ergonomic-walking-meetings-and-desk-breaks',
    title: 'Micro-Mobility Breaks: Undoing Eight Hours of Desk Posture',
    excerpt:
      'Simple five-minute movement resets between focused work blocks that restore thoracic mobility and afternoon energy.',
    categorySlug: 'health-wellness',
    authorId: 'author-henrik-lindqvist',
    publishedAt: 'Oct 29, 2026',
    publishedIso: '2026-10-29T08:00:00Z',
    readingTimeMinutes: 5,
    coverImage: IMG_WELLNESS,
    coverImageAlt: 'Peaceful limestone courtyard with natural greenery and daylight',
    coverCaption: 'Fig. 1 — Brief movement breaks outdoors reset visual focus and posture simultaneously.',
    tags: ['Mobility', 'Desk Ergonomics', 'Energy'],
    isSampleContent: true,
    sections: [
      {
        id: 'movement-snacks',
        heading: 'Why Frequency Beats Intensity During Workdays',
        level: 2,
        paragraphs: [
          'A single evening workout rarely offsets eight uninterrupted hours in a chair. Standing to take phone calls, stretching hip flexors at midday, and looking at distant horizons every hour keep joints supple and eyes relaxed.',
        ],
      },
    ],
  },
];
