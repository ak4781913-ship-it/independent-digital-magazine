import { ArrowUpRight } from 'lucide-react';
import { Article, Category, CategorySlug } from '../../types/editorial';

interface ExploreCategoriesProps {
  categories: Category[];
  articles: Article[];
  activeCategory: CategorySlug | 'all';
  onSelectCategory: (slug: CategorySlug) => void;
}

export function ExploreCategories({
  categories,
  articles,
  activeCategory,
  onSelectCategory,
}: ExploreCategoriesProps) {
  return (
    <section
      id="explore-categories"
      aria-labelledby="explore-categories-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-white py-14 sm:py-16 dark:border-slate-800 dark:bg-[#0D1424]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#9A5B25] uppercase dark:text-[#D4A359]">
              Subject Directory
            </p>
            <h2
              id="explore-categories-heading"
              className="mt-1 font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
            >
              Explore Categories
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            Twelve core editorial desks covering technology, capital, human health, independent craft, and practical guides.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 dark:bg-slate-800">
          {categories.map((category) => {
            const count = articles.filter((a) => a.categorySlug === category.slug).length;
            const isSelected = activeCategory === category.slug;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.slug)}
                className={`group flex flex-col justify-between p-6 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F2544] ${
                  isSelected
                    ? 'bg-[#F0F4FA] dark:bg-[#17233B]'
                    : 'bg-white hover:bg-[#F7F9FC] dark:bg-[#0D1424] dark:hover:bg-[#131C30]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">
                      {category.deskCode}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0F2544] dark:group-hover:text-blue-300"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-slate-900 group-hover:text-[#0F2544] dark:text-slate-100 dark:group-hover:text-blue-300">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 text-xs font-medium tabular-nums text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
                  {count} {count === 1 ? 'sample article' : 'sample articles'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
