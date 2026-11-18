import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { Article } from '../../types/editorial';
import { getCategoryBySlug } from '../../data/categories';
import { getAuthorById } from '../../data/authors';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onOpenArticle: (slug: string) => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  articles,
  onOpenArticle,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setQuery('');

      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 40);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
          return;
        }
        if (event.key === 'Tab' && dialogRef.current) {
          const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = previousOverflow;
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return articles.slice(0, 6);
    }
    return articles.filter((article) => {
      const category = getCategoryBySlug(article.categorySlug);
      const author = getAuthorById(article.authorId);
      const haystack = [
        article.title,
        article.excerpt,
        category?.name ?? '',
        author.name,
        ...article.tags,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [articles, query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-label"
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-4 pt-16 backdrop-blur-xs sm:pt-24"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#111827]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <Search className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true" />
          <label id="search-dialog-label" htmlFor="search-archive-input" className="sr-only">
            Search publication archive
          </label>
          <input
            id="search-archive-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search essays, categories, topics, or authors..."
            className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-400 dark:hover:text-white dark:focus-visible:ring-blue-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
            <span aria-live="polite">
              {query.trim()
                ? `${results.length} ${results.length === 1 ? 'story' : 'stories'} matching "${query.trim()}"`
                : 'Recent & Featured Dispatches'}
            </span>
            <span className="hidden sm:inline">Press Esc to close</span>
          </div>

          {results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                No sample articles matched your query.
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Try searching for technology, finance, travel, science, or practical guides.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
              {results.map((article) => {
                const category = getCategoryBySlug(article.categorySlug);
                const author = getAuthorById(article.authorId);
                return (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenArticle(article.slug);
                        onClose();
                      }}
                      className="group flex w-full items-start justify-between gap-4 py-3.5 text-left transition-colors hover:bg-slate-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:hover:bg-slate-800/40 dark:focus-visible:ring-blue-400"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-[#0F2544] dark:text-blue-300">
                            {category?.shortName}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{author.name}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{article.readingTimeMinutes} min read</span>
                        </div>
                        <h3 className="mt-1 font-serif text-base font-semibold text-slate-900 group-hover:text-[#0F2544] dark:text-slate-100 dark:group-hover:text-blue-300">
                          {article.title}
                        </h3>
                      </div>
                      <ArrowRight
                        className="mt-2 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#0F2544] dark:group-hover:text-blue-300"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
