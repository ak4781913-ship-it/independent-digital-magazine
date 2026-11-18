import { ArrowLeft } from 'lucide-react';
import { Article, CategorySlug } from '../../types/editorial';
import { getCategoryBySlug } from '../../data/categories';
import { getAuthorById } from '../../data/authors';
import { EditorialImage } from '../common/EditorialImage';
import { TableOfContents } from './TableOfContents';
import { AuthorCard } from './AuthorCard';
import { ShareBar } from './ShareBar';
import { RelatedArticles } from './RelatedArticles';
import { NewsletterSection } from '../home/NewsletterSection';

interface ArticleReaderProps {
  article: Article;
  allArticles: Article[];
  onBackHome: () => void;
  onOpenArticle: (slug: string) => void;
  onSelectCategory: (slug: CategorySlug) => void;
}

export function ArticleReader({
  article,
  allArticles,
  onBackHome,
  onOpenArticle,
  onSelectCategory,
}: ArticleReaderProps) {
  const category = getCategoryBySlug(article.categorySlug);
  const author = getAuthorById(article.authorId);

  const related = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => {
      const aSame = a.categorySlug === article.categorySlug ? 1 : 0;
      const bSame = b.categorySlug === article.categorySlug ? 1 : 0;
      return bSame - aSame;
    })
    .slice(0, 3);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0A0F1A]">
      <article itemScope itemType="https://schema.org/Article">
        {/* Article Header */}
        <header className="border-b border-slate-200 bg-white py-8 sm:py-12 dark:border-slate-800 dark:bg-[#0D1424]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex min-h-[40px] items-center gap-2 text-xs font-semibold text-slate-600 transition-colors hover:text-[#0F2544] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-400 dark:hover:text-blue-300"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Front Page</span>
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400">
                Sample Editorial Article Layout
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              {category && (
                <button
                  type="button"
                  onClick={() => onSelectCategory(article.categorySlug)}
                  className="font-semibold tracking-wide text-[#0F2544] hover:underline hover:underline-offset-4 dark:text-blue-300"
                >
                  {category.name}
                </button>
              )}
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{article.readingTimeMinutes} min read</span>
            </div>

            <h1
              itemProp="headline"
              className="mt-3 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {article.title}
            </h1>

            <p
              itemProp="description"
              className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {article.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span itemProp="author" className="font-semibold text-slate-800 dark:text-slate-200">
                By {author.name}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Published{' '}
                <time dateTime={article.publishedIso} itemProp="datePublished">
                  {article.publishedAt}
                </time>
              </span>
              {article.updatedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated{' '}
                    <time dateTime={article.updatedIso} itemProp="dateModified">
                      {article.updatedAt}
                    </time>
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Cover Image + Caption */}
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <figure>
            <div className="overflow-hidden border border-slate-200 dark:border-slate-800">
              <EditorialImage
                src={article.coverImage}
                alt={article.coverImageAlt}
                aspectClassName="aspect-[16/9]"
                sizes="(min-width: 1024px) 960px, 100vw"
                priority
              />
            </div>
            <figcaption className="mt-3 font-serif text-xs italic text-slate-500 dark:text-slate-400">
              {article.coverCaption}
            </figcaption>
          </figure>
        </div>

        {/* Reading Body + Sticky ToC Rail */}
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Sidebar Rail (Table of Contents) */}
            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-24">
                <TableOfContents sections={article.sections} />
                <div className="hidden lg:block">
                  <ShareBar title={article.title} slug={article.slug} />
                </div>
              </div>
            </aside>

            {/* Primary Reading Column */}
            <div className="lg:col-span-8">
              <div itemProp="articleBody" className="max-w-prose space-y-8">
                {article.sections.map((section, sectionIdx) => {
                  const HeadingTag = section.level === 3 ? 'h3' : 'h2';
                  return (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                      <HeadingTag
                        className={`font-serif font-semibold text-slate-950 dark:text-white ${
                          section.level === 3
                            ? 'text-xl sm:text-2xl'
                            : 'text-2xl sm:text-[1.75rem]'
                        }`}
                      >
                        {section.heading}
                      </HeadingTag>

                      <div className="mt-4 space-y-5 text-base leading-[1.78] text-slate-700 sm:text-[1.0625rem] dark:text-slate-300">
                        {section.paragraphs.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className={
                              sectionIdx === 0 && pIdx === 0
                                ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#0F2544] dark:first-letter:text-blue-300'
                                : ''
                            }
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {section.pullQuote && (
                        <blockquote className="my-8 border-y border-slate-200 py-6 font-serif text-xl italic leading-relaxed text-slate-800 sm:text-2xl dark:border-slate-800 dark:text-slate-200">
                          &ldquo;{section.pullQuote}&rdquo;
                        </blockquote>
                      )}
                    </section>
                  );
                })}

                {/* Mobile Share Bar */}
                <div className="lg:hidden">
                  <ShareBar title={article.title} slug={article.slug} />
                </div>

                {/* Author Bio */}
                <div className="pt-4">
                  <AuthorCard author={author} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <RelatedArticles
        articles={related}
        onOpenArticle={onOpenArticle}
        onSelectCategory={onSelectCategory}
      />

      <NewsletterSection />
    </div>
  );
}
