import { Article } from '../../types/editorial';
import { getCategoryBySlug } from '../../data/categories';
import { getAuthorById } from '../../data/authors';
import { EditorialImage } from '../common/EditorialImage';

interface ArticleCardProps {
  article: Article;
  onOpenArticle: (slug: string) => void;
  onSelectCategory?: (slug: Article['categorySlug']) => void;
  variant?: 'default' | 'featured';
}

export function ArticleCard({
  article,
  onOpenArticle,
  onSelectCategory,
  variant = 'default',
}: ArticleCardProps) {
  const category = getCategoryBySlug(article.categorySlug);
  const author = getAuthorById(article.authorId);

  return (
    <article
      itemScope
      itemType="https://schema.org/Article"
      className={`group flex h-full flex-col border border-slate-200/90 bg-white transition-colors duration-150 hover:border-slate-300 dark:border-slate-800/90 dark:bg-[#111827] dark:hover:border-slate-700 ${
        variant === 'featured' ? 'lg:flex-row' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onOpenArticle(article.slug)}
        aria-label={`Read ${article.title}`}
        className={`block shrink-0 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F2544] dark:focus-visible:ring-blue-400 ${
          variant === 'featured' ? 'w-full lg:w-1/2' : 'w-full'
        }`}
      >
        <EditorialImage
          src={article.coverImage}
          alt={article.coverImageAlt}
          aspectClassName={variant === 'featured' ? 'aspect-[4/3] lg:h-full lg:aspect-auto' : 'aspect-[4/3]'}
          sizes={
            variant === 'featured'
              ? '(min-width: 1024px) 320px, 100vw'
              : '(min-width: 1024px) 380px, (min-width: 768px) 46vw, 100vw'
          }
        />
      </button>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Unboxed zero-pill metadata line */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            {onSelectCategory && category ? (
              <button
                type="button"
                onClick={() => onSelectCategory(article.categorySlug)}
                className="font-semibold tracking-wide text-[#0F2544] transition-colors hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-blue-300"
              >
                {category.shortName}
              </button>
            ) : (
              <span className="font-semibold tracking-wide text-[#0F2544] dark:text-blue-300">
                {category?.shortName}
              </span>
            )}
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedIso} itemProp="datePublished">
              {article.publishedAt}
            </time>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readingTimeMinutes} min read</span>
          </div>

          <h3
            itemProp="headline"
            className={`mt-2.5 font-serif font-semibold leading-snug text-slate-900 transition-colors group-hover:text-[#0F2544] dark:text-slate-100 dark:group-hover:text-blue-300 ${
              variant === 'featured' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
            }`}
          >
            <button
              type="button"
              onClick={() => onOpenArticle(article.slug)}
              className="text-left focus-visible:outline-none focus-visible:underline"
            >
              {article.title}
            </button>
          </h3>

          <p
            itemProp="description"
            className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs dark:border-slate-800/80">
          <span
            itemProp="author"
            className="font-medium text-slate-700 dark:text-slate-300"
          >
            {author.name}
          </span>
          <button
            type="button"
            onClick={() => onOpenArticle(article.slug)}
            className="font-semibold text-[#0F2544] transition-colors hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-blue-300"
          >
            Read Essay
          </button>
        </div>
      </div>
    </article>
  );
}
