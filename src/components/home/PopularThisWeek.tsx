import { ArrowRight } from 'lucide-react';
import { Article } from '../../types/editorial';
import { getCategoryBySlug } from '../../data/categories';
import { getAuthorById } from '../../data/authors';

interface PopularThisWeekProps {
  articles: Article[];
  onOpenArticle: (slug: string) => void;
}

export function PopularThisWeek({ articles, onOpenArticle }: PopularThisWeekProps) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="popular-week-heading"
      className="border-t border-slate-200 bg-white py-14 sm:py-16 dark:border-slate-800 dark:bg-[#0D1424]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Framing Column */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wider text-[#9A5B25] uppercase dark:text-[#D4A359]">
              Weekly Index
            </p>
            <h2
              id="popular-week-heading"
              className="mt-2 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
            >
              Popular This Week
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The essays, financial frameworks, and practical guides attracting the longest reading sessions across our sample catalog this week.
            </p>
            <div className="mt-6 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Rankings below represent illustrative editorial placement for this frontend prototype rather than live traffic telemetry.
            </div>
          </div>

          {/* Right Ranked Editorial List */}
          <div className="lg:col-span-8">
            <ol className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {articles.map((article, index) => {
                const category = getCategoryBySlug(article.categorySlug);
                const author = getAuthorById(article.authorId);
                const rank = String(article.popularRank ?? index + 1).padStart(2, '0');

                return (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => onOpenArticle(article.slug)}
                      className="group flex w-full items-start gap-5 py-5 text-left transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F2544] sm:items-center sm:px-3 dark:hover:bg-slate-800/30"
                    >
                      <span className="w-8 shrink-0 font-mono text-xl font-medium tabular-nums text-slate-500 transition-colors group-hover:text-[#0F2544] dark:text-slate-400 dark:group-hover:text-blue-300">
                        {rank}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-[#0F2544] dark:text-blue-300">
                            {category?.name}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{author.name}</span>
                        </div>
                        <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-[#0F2544] dark:text-slate-100 dark:group-hover:text-blue-300">
                          {article.title}
                        </h3>
                      </div>

                      <div className="flex shrink-0 items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="hidden tabular-nums sm:inline">
                          {article.readingTimeMinutes} min read
                        </span>
                        <ArrowRight
                          className="h-4 w-4 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#0F2544] dark:group-hover:text-blue-300"
                          aria-hidden="true"
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
