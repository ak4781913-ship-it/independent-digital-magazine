import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Theme } from '../../hooks/useTheme';
import { Category, CategorySlug, PolicyDocument } from '../../types/editorial';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onNavigateHome: () => void;
  onNavigateSection: (target: string) => void;
  onOpenPolicy: (policyId: PolicyDocument['id']) => void;
  categories: Category[];
  activeCategory: CategorySlug | 'all';
  onSelectCategory: (slug: CategorySlug | 'all') => void;
}

export function Header({
  theme,
  onToggleTheme,
  onOpenSearch,
  onNavigateHome,
  onNavigateSection,
  onOpenPolicy,
  categories,
  activeCategory,
  onSelectCategory,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      wasOpenRef.current = true;
      const timer = window.setTimeout(() => {
        firstMobileLinkRef.current?.focus();
      }, 20);
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    if (target.startsWith('policy:')) {
      const policyId = target.replace('policy:', '') as PolicyDocument['id'];
      onOpenPolicy(policyId);
      return;
    }
    onNavigateSection(target);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-[#0A0F1A]/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-8 sm:px-6 lg:px-8">
        {/* Zone 1: Configurable Brand Mark & Name (single line, no attached subtext) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onNavigateHome();
          }}
          className="flex min-w-0 shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:focus-visible:ring-blue-400"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#0F2544] font-serif text-xs font-bold tracking-wider text-white dark:bg-blue-600"
          >
            {siteConfig.shortMark}
          </span>
          <span className="max-w-[185px] truncate font-serif text-[15px] font-semibold tracking-tight text-slate-900 sm:max-w-none sm:text-lg dark:text-slate-100">
            {siteConfig.publicationName}
          </span>
        </a>

        {/* Zone 2: Main Navigation (4-5 concise single-line links) */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-7 lg:flex">
          {siteConfig.mainNavigation.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.target)}
              className="shrink-0 whitespace-nowrap border-b border-transparent py-1 text-sm font-medium text-slate-600 transition-colors duration-150 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-300 dark:hover:border-slate-100 dark:hover:text-white dark:focus-visible:ring-blue-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Utility Controls & Primary Subscribe CTA */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            aria-label="Search articles"
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-blue-400"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-blue-400"
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('#newsletter')}
            className="hidden shrink-0 whitespace-nowrap bg-[#0F2544] px-4 py-2 text-xs font-semibold tracking-wide text-white transition-colors duration-150 hover:bg-[#173660] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] sm:inline-flex dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-blue-400"
          >
            Subscribe
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-10 w-10 items-center justify-center text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] lg:hidden dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-400"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Compact Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-x-0 top-16 bottom-0 z-30 bg-slate-950/35 backdrop-blur-[1px] lg:hidden"
          />
          <div
            id="mobile-navigation-drawer"
            role="region"
            aria-label="Mobile navigation drawer"
            className="relative z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden dark:border-slate-800 dark:bg-[#0D1424]"
          >
            <nav aria-label="Mobile Main Navigation" className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {siteConfig.mainNavigation.map((item, idx) => (
                <button
                  key={item.id}
                  ref={idx === 0 ? firstMobileLinkRef : undefined}
                  type="button"
                  onClick={() => handleNavClick(item.target)}
                  className="flex min-h-[42px] w-full items-center justify-between px-1 text-left text-sm font-medium text-slate-800 transition-colors hover:text-[#0F2544] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-100 dark:hover:text-blue-300 dark:focus-visible:ring-blue-400"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                </button>
              ))}
            </nav>

            <div className="mt-4 border-t border-slate-200 pt-3.5 dark:border-slate-800">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[11px] font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-400">
                  Categories
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('all');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:focus-visible:ring-blue-400 ${
                    activeCategory === 'all'
                      ? 'text-[#0F2544] underline underline-offset-4 dark:text-blue-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  All Stories
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat.slug);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex min-h-[36px] items-center truncate px-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:focus-visible:ring-blue-400 ${
                        isActive
                          ? 'bg-slate-100 font-semibold text-[#0F2544] dark:bg-slate-800 dark:text-blue-300'
                          : 'font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="truncate">{cat.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 border-t border-slate-200 pt-3.5 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleNavClick('#newsletter')}
                className="flex min-h-[42px] w-full items-center justify-center bg-[#0F2544] px-4 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#173660] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-blue-400"
              >
                Subscribe to Weekly Dispatch
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
