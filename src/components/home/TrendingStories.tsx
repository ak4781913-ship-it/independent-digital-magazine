import { Article } from '../../types/editorial';
import { getCategoryBySlug } from '../../data/categories';
import { EditorialImage } from '../common/EditorialImage';

interface TrendingStoriesProps {
  articles: Article[];
  onOpenArticle: (slug: string) => void;
}

export function TrendingStories({ articles, onOpenArticle }: TrendingStoriesProps) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="trending-heading"
      className="border-b border-slate-200 bg-[#FAFAFA] py-14 sm:py-16 dark:border-slate-800 dark:bg-[#0A0F1A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#9A5B25] uppercase dark:text-[#D4A359]">
              Editorial Ranking
            </p>
            <h2
              id="trending-heading"
              className="mt-1 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
            >
              Trending Stories
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Most Read Dispatches
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {articles.map((article, index) => {
            const category = getCategoryBySlug(article.categorySlug);
            const rankNumber = String(article.trendingRank ?? index + 1).padStart(2, '0');

            return (
              <article
                key={article.id}
                className="group flex flex-col justify-between border-b border-slate-200 pb-6 sm:border-b-0 sm:pb-0 dark:border-slate-800"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenArticle(article.slug)}
                    aria-label={`Read trending story ${rankNumber}: ${article.title}`}
                    className="block w-full overflow-hidden border border-slate-200/80 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:border-slate-800"
                  >
                    <EditorialImage
                      src={article.coverImage}
                      alt={article.coverImageAlt}
                      aspectClassName="aspect-[4/3]"
                      sizes="(min-width: 1024px) 240px, (min-width: 640px) 46vw, 100vw"
                    />
                  </button>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-mono text-xl font-medium tabular-nums text-[#9A5B25] dark:text-[#D4A359]">
                      {rankNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-[#0F2544] dark:text-blue-300">
                          {category?.shortName}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{article.readingTimeMinutes} min</span>
                      </div>
                      <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-[#0F2544] dark:text-slate-100 dark:group-hover:text-blue-300">
                        <button
                          type="button"
                          onClick={() => onOpenArticle(article.slug)}
                          className="text-left focus-visible:outline-none focus-visible:underline"
                        >
                          {article.title}
                        </button>
                      </h3>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
