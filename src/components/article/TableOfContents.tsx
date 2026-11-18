import { ArticleSection } from '../../types/editorial';

interface TableOfContentsProps {
  sections: ArticleSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111827]"
    >
      <h2 className="font-sans text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-slate-100">
        In This Article
      </h2>
      <ol className="mt-3.5 space-y-2.5 text-sm">
        {sections.map((section, idx) => (
          <li key={section.id} className={section.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${section.id}`}
              className="group flex items-baseline gap-2.5 text-slate-600 transition-colors hover:text-[#0F2544] focus-visible:outline-none focus-visible:underline dark:text-slate-400 dark:hover:text-blue-300"
            >
              <span className="font-mono text-[11px] tabular-nums text-slate-400 group-hover:text-[#0F2544] dark:text-slate-500 dark:group-hover:text-blue-300">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="leading-snug">{section.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
