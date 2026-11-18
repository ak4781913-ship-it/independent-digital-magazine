import { Author } from '../../types/editorial';

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <aside
      aria-label="About the author"
      className="border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#0F2544] font-serif text-sm font-semibold text-white dark:bg-blue-600"
        >
          {author.initials}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {author.role} · {author.desk}
          </p>
          <h3 className="mt-0.5 font-serif text-lg font-semibold text-slate-900 dark:text-white">
            {author.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {author.bio}
          </p>
        </div>
      </div>
    </aside>
  );
}
