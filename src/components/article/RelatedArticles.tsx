import { Article, CategorySlug } from '../../types/editorial';
import { ArticleCard } from '../home/ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
  onOpenArticle: (slug: string) => void;
  onSelectCategory: (slug: CategorySlug) => void;
}

export function RelatedArticles({
  articles,
  onOpenArticle,
  onSelectCategory,
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="border-t border-slate-200 bg-[#F4F6F9] py-14 dark:border-slate-800 dark:bg-[#080D17]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
          <p className="text-xs font-semibold tracking-wider text-[#9A5B25] uppercase dark:text-[#D4A359]">
            Continue Reading
          </p>
          <h2
            id="related-articles-heading"
            className="mt-1 font-serif text-2xl font-semibold text-slate-900 dark:text-white"
          >
            Related Articles
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpenArticle={onOpenArticle}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
