import { ArrowRight } from 'lucide-react';
import { Article } from '../../types/editorial';
import { getCategoryBySlug } from '../../data/categories';
import { getAuthorById } from '../../data/authors';
import { EditorialImage } from '../common/EditorialImage';

interface HeroSectionProps {
  article: Article;
  onOpenArticle: (slug: string) => void;
  onSelectCategory: (slug: Article['categorySlug']) => void;
}

export function HeroSection({
  article,
  onOpenArticle,
  onSelectCategory,
}: HeroSectionProps) {
  const category = getCategoryBySlug(article.categorySlug);
  const author = getAuthorById(article.authorId);

  return (
    <section
      aria-labelledby="hero-story-heading"
      className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0D1424]"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Featured Editorial Image */}
          <div className="lg:col-span-7">
            <button
              type="button"
              onClick={() => onOpenArticle(article.slug)}
              aria-label={`Read featured article: ${article.title}`}
              className="group block h-full w-full overflow-hidden border border-slate-200/80 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:border-slate-800 dark:focus-visible:ring-blue-400"
            >
              <EditorialImage
                src={article.coverImage}
                alt={article.coverImageAlt}
                aspectClassName="aspect-[16/9] lg:h-full lg:min-h-[420px]"
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                priority
              />
            </button>
          </div>

          {/* Lead Story Content */}
          <div className="flex flex-col justify-between py-1 lg:col-span-5">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold tracking-wide text-[#9A5B25] dark:text-[#D4A359]">
                  Cover Story
                </span>
                <span aria-hidden="true">/</span>
                {category && (
                  <button
                    type="button"
                    onClick={() => onSelectCategory(article.categorySlug)}
                    className="font-semibold tracking-wide text-[#0F2544] transition-colors hover:underline hover:underline-offset-4 dark:text-blue-300"
                  >
                    {category.name}
                  </button>
                )}
              </div>

              <h1
                id="hero-story-heading"
                className="mt-4 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-[2.65rem] dark:text-white"
              >
                {article.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  By {author.name}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedIso}>{article.publishedAt}</time>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{article.readingTimeMinutes} min read</span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenArticle(article.slug)}
                  className="inline-flex min-h-[44px] items-center gap-2.5 bg-[#0F2544] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#173660] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-offset-[#0D1424]"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Sample Editorial Feature
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
