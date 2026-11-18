import { Category, CategorySlug, Article } from '../../types/editorial';
import { ArticleCard } from './ArticleCard';

interface LatestArticlesProps {
  articles: Article[];
  visibleCount: number;
  totalFilteredCount: number;
  activeCategory: CategorySlug | 'all';
  activeCategoryObj?: Category;
  onResetCategory: () => void;
  onLoadMore: () => void;
  onOpenArticle: (slug: string) => void;
  onSelectCategory: (slug: CategorySlug) => void;
}

export function LatestArticles({
  articles,
  visibleCount,
  totalFilteredCount,
  activeCategory,
  activeCategoryObj,
  onResetCategory,
  onLoadMore,
  onOpenArticle,
  onSelectCategory,
}: LatestArticlesProps) {
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleArticles.length < totalFilteredCount;
  const HeadingTag = activeCategory === 'all' ? 'h2' : 'h1';

  return (
    <section
      id="latest-articles"
      aria-labelledby="latest-articles-heading"
      className="scroll-mt-20 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#9A5B25] uppercase dark:text-[#D4A359]">
              {activeCategory === 'all' ? 'Editorial Feed' : 'Category Archive'}
            </p>
            <HeadingTag
              id="latest-articles-heading"
              className="mt-1 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
            >
              {activeCategoryObj ? activeCategoryObj.name : 'Latest Articles'}
            </HeadingTag>
            {activeCategoryObj && (
              <p className="mt-1.5 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                {activeCategoryObj.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
              Showing {visibleArticles.length} of {totalFilteredCount}
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={onResetCategory}
                className="border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
              >
                View All Categories
              </button>
            )}
          </div>
        </div>

        {visibleArticles.length === 0 ? (
          <div className="mt-10 border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-[#111827]">
            <p className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
              No articles published in this category yet.
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Return to the full archive to explore other sample dispatches.
            </p>
            <button
              type="button"
              onClick={onResetCategory}
              className="mt-5 bg-[#0F2544] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#173660] dark:bg-blue-600"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visibleArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpenArticle={onOpenArticle}
                onSelectCategory={onSelectCategory}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={onLoadMore}
              className="min-h-[44px] border border-[#0F2544] bg-transparent px-8 py-3 text-sm font-semibold text-[#0F2544] transition-colors duration-150 hover:bg-[#0F2544] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
            >
              Load More Articles ({totalFilteredCount - visibleArticles.length} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
