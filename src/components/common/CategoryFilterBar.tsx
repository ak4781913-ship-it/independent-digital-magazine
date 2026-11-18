import { useEffect, useRef } from 'react';
import { Category, CategorySlug } from '../../types/editorial';

interface CategoryFilterBarProps {
  categories: Category[];
  activeCategory: CategorySlug | 'all';
  onSelectCategory: (slug: CategorySlug | 'all') => void;
}

export function CategoryFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterBarProps) {
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  return (
    <nav
      aria-label="Category Navigation"
      className="border-b border-slate-200/90 bg-white/90 dark:border-slate-800/90 dark:bg-[#0D1424]/95"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="no-scrollbar flex items-center gap-5 overflow-x-auto py-0.5 sm:gap-6">
          <button
            ref={activeCategory === 'all' ? activeTabRef : null}
            type="button"
            onClick={() => onSelectCategory('all')}
            aria-current={activeCategory === 'all' ? 'page' : undefined}
            className={`relative shrink-0 whitespace-nowrap py-3 text-xs font-medium tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:focus-visible:ring-blue-400 ${
              activeCategory === 'all'
                ? 'text-[#0F2544] dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            All Stories
            {activeCategory === 'all' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0F2544] dark:bg-blue-400"
              />
            )}
          </button>

          {categories.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <button
                key={category.id}
                ref={isActive ? activeTabRef : null}
                type="button"
                onClick={() => onSelectCategory(category.slug)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative shrink-0 whitespace-nowrap py-3 text-xs font-medium tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:focus-visible:ring-blue-400 ${
                  isActive
                    ? 'text-[#0F2544] dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {category.shortName}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0F2544] dark:bg-blue-400"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
