import { Article, CategorySlug } from '../../types/editorial';
import { ArticleCard } from './ArticleCard';

interface EditorsPicksProps {
  articles: Article[];
  onOpenArticle: (slug: string) => void;
  onSelectCategory: (slug: CategorySlug) => void;
}

export function EditorsPicks({
  articles,
  onOpenArticle,
  onSelectCategory,
}: EditorsPicksProps) {
  if (articles.length === 0) return null;

  return (
    <section
      id="editors-picks"
      aria-labelledby="editors-picks-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-[#F4F6F9] py-14 sm:py-16 dark:border-slate-800 dark:bg-[#080D17]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#9A5B25] uppercase dark:text-[#D4A359]">
              Curated Reading
            </p>
            <h2
              id="editors-picks-heading"
              className="mt-1 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
            >
              Editor&rsquo;s Picks
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            Long-form essays and foundational explainers selected by the editorial desk for enduring relevance.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpenArticle={onOpenArticle}
              onSelectCategory={onSelectCategory}
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
