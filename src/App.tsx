import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { siteConfig } from './config/siteConfig';
import { categories, getCategoryBySlug } from './data/categories';
import { articles } from './data/articles';
import { getAuthorById } from './data/authors';
import { policyDocuments } from './data/policies';
import { CategorySlug, PolicyDocument } from './types/editorial';
import { useTheme } from './hooks/useTheme';
import { useSeo } from './hooks/useSeo';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CategoryFilterBar } from './components/common/CategoryFilterBar';
import { HeroSection } from './components/home/HeroSection';
import { TrendingStories } from './components/home/TrendingStories';
import { LatestArticles } from './components/home/LatestArticles';
import { ExploreCategories } from './components/home/ExploreCategories';
import { EditorsPicks } from './components/home/EditorsPicks';
import { PopularThisWeek } from './components/home/PopularThisWeek';
import { NewsletterSection } from './components/home/NewsletterSection';

const ArticleReader = lazy(() =>
  import('./components/article/ArticleReader').then((m) => ({ default: m.ArticleReader }))
);
const SearchOverlay = lazy(() =>
  import('./components/common/SearchOverlay').then((m) => ({ default: m.SearchOverlay }))
);
const PolicyModal = lazy(() =>
  import('./components/common/PolicyModal').then((m) => ({ default: m.PolicyModal }))
);

const INITIAL_PAGE_SIZE = 6;
const PAGE_INCREMENT = 6;

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>(() => {
    if (typeof window === 'undefined') return 'all';
    const hash = window.location.hash;
    if (hash.startsWith('#category/')) {
      const slug = hash.replace('#category/', '') as CategorySlug;
      if (getCategoryBySlug(slug)) return slug;
    }
    return 'all';
  });
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash;
    if (hash.startsWith('#article/')) {
      return hash.replace('#article/', '');
    }
    return null;
  });
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activePolicyId, setActivePolicyId] = useState<PolicyDocument['id'] | null>(null);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  // Sync browser back/forward navigation with clean hash URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article/')) {
        setActiveArticleSlug(hash.replace('#article/', ''));
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (hash.startsWith('#category/')) {
        const slug = hash.replace('#category/', '') as CategorySlug;
        setActiveArticleSlug(null);
        setActiveCategory(getCategoryBySlug(slug) ? slug : 'all');
      } else {
        setActiveArticleSlug(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll reliably once homepage DOM is active after transitioning from article view
  useEffect(() => {
    if (!pendingScrollId || activeArticleSlug) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(pendingScrollId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPendingScrollId(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pendingScrollId, activeArticleSlug, activeCategory]);

  const activeArticle = useMemo(
    () => (activeArticleSlug ? articles.find((a) => a.slug === activeArticleSlug) ?? null : null),
    [activeArticleSlug]
  );

  const activeCategoryObj = useMemo(
    () => (activeCategory !== 'all' ? getCategoryBySlug(activeCategory) : undefined),
    [activeCategory]
  );

  // Dynamic SEO title, description, Open Graph, and Schema.org JSON-LD
  const seoConfig = useMemo(() => {
    const heroImage = '/src/assets/images/hero_ai_architecture_1795011169168.jpg';

    if (activeArticle) {
      const author = getAuthorById(activeArticle.authorId);
      const category = getCategoryBySlug(activeArticle.categorySlug);
      const absoluteImage =
        typeof window !== 'undefined'
          ? `${window.location.origin}${activeArticle.coverImage}`
          : activeArticle.coverImage;

      return {
        title: activeArticle.title,
        description: activeArticle.excerpt,
        ogType: 'article' as const,
        image: activeArticle.coverImage,
        imageAlt: activeArticle.coverImageAlt,
        publishedTime: activeArticle.publishedIso,
        modifiedTime: activeArticle.updatedIso ?? activeArticle.publishedIso,
        section: category?.name,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: activeArticle.title,
          description: activeArticle.excerpt,
          image: absoluteImage,
          datePublished: activeArticle.publishedIso,
          dateModified: activeArticle.updatedIso ?? activeArticle.publishedIso,
          articleSection: category?.name,
          author: {
            '@type': 'Person',
            name: author.name,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.publicationName,
          },
        },
      };
    }

    if (activeCategoryObj) {
      return {
        title: activeCategoryObj.name,
        description: activeCategoryObj.description,
        ogType: 'website' as const,
        image: heroImage,
        imageAlt: `${activeCategoryObj.name} — ${siteConfig.publicationName}`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${activeCategoryObj.name} — ${siteConfig.publicationName}`,
          description: activeCategoryObj.description,
        },
      };
    }

    return {
      title: undefined,
      description: siteConfig.description,
      ogType: 'website' as const,
      image: heroImage,
      imageAlt: `${siteConfig.publicationName} — Featured Editorial Library`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.publicationName,
        description: siteConfig.description,
      },
    };
  }, [activeArticle, activeCategoryObj]);

  useSeo(seoConfig);

  const heroArticle = useMemo(
    () => articles.find((a) => a.featuredHero) ?? articles[0],
    []
  );

  const trendingArticles = useMemo(
    () =>
      articles
        .filter((a) => typeof a.trendingRank === 'number')
        .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99))
        .slice(0, 5),
    []
  );

  const editorsPickArticles = useMemo(
    () => articles.filter((a) => a.editorsPick).slice(0, 4),
    []
  );

  const popularArticles = useMemo(
    () =>
      articles
        .filter((a) => typeof a.popularRank === 'number')
        .sort((a, b) => (a.popularRank ?? 99) - (b.popularRank ?? 99))
        .slice(0, 6),
    []
  );

  const filteredLatestArticles = useMemo(() => {
    if (activeCategory === 'all') {
      return articles.filter((a) => a.id !== heroArticle.id);
    }
    return articles.filter((a) => a.categorySlug === activeCategory);
  }, [activeCategory, heroArticle.id]);

  const handleOpenArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    if (typeof window !== 'undefined') {
      window.location.hash = `article/${slug}`;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const handleNavigateHome = () => {
    setActiveArticleSlug(null);
    setActiveCategory('all');
    setVisibleCount(INITIAL_PAGE_SIZE);
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (slug: CategorySlug | 'all') => {
    setActiveArticleSlug(null);
    setActiveCategory(slug);
    setVisibleCount(INITIAL_PAGE_SIZE);
    if (typeof window !== 'undefined') {
      if (slug === 'all') {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      } else {
        window.location.hash = `category/${slug}`;
      }
      setPendingScrollId('latest-articles');
    }
  };

  const handleNavigateSection = (target: string) => {
    if (target === '#top') {
      handleNavigateHome();
      return;
    }

    const id = target.replace('#', '');
    if (activeArticle) {
      setActiveArticleSlug(null);
      if (typeof window !== 'undefined') {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      setPendingScrollId(id);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="top" className="flex min-h-screen flex-col overflow-x-clip bg-[#FAFAFA] dark:bg-[#0A0F1A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#0F2544] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateSection={handleNavigateSection}
        onOpenPolicy={(id) => setActivePolicyId(id)}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <CategoryFilterBar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <main id="main-content" className="flex-1">
        {activeArticle ? (
          <Suspense
            fallback={
              <div className="mx-auto max-w-4xl px-4 py-16 text-sm text-slate-600 dark:text-slate-400">
                Loading article...
              </div>
            }
          >
            <ArticleReader
              article={activeArticle}
              allArticles={articles}
              onBackHome={handleNavigateHome}
              onOpenArticle={handleOpenArticle}
              onSelectCategory={handleSelectCategory}
            />
          </Suspense>
        ) : (
          <>
            {activeCategory === 'all' && (
              <HeroSection
                article={heroArticle}
                onOpenArticle={handleOpenArticle}
                onSelectCategory={handleSelectCategory}
              />
            )}

            {activeCategory === 'all' && (
              <TrendingStories
                articles={trendingArticles}
                onOpenArticle={handleOpenArticle}
              />
            )}

            <LatestArticles
              articles={filteredLatestArticles}
              visibleCount={visibleCount}
              totalFilteredCount={filteredLatestArticles.length}
              activeCategory={activeCategory}
              activeCategoryObj={activeCategoryObj}
              onResetCategory={() => handleSelectCategory('all')}
              onLoadMore={() => setVisibleCount((prev) => prev + PAGE_INCREMENT)}
              onOpenArticle={handleOpenArticle}
              onSelectCategory={handleSelectCategory}
            />

            <ExploreCategories
              categories={categories}
              articles={articles}
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
            />

            <EditorsPicks
              articles={editorsPickArticles}
              onOpenArticle={handleOpenArticle}
              onSelectCategory={handleSelectCategory}
            />

            <PopularThisWeek
              articles={popularArticles}
              onOpenArticle={handleOpenArticle}
            />

            <NewsletterSection />
          </>
        )}
      </main>

      <Footer
        categories={categories}
        onSelectCategory={handleSelectCategory}
        onOpenPolicy={(id) => setActivePolicyId(id)}
      />

      <Suspense fallback={null}>
        {searchOpen && (
          <SearchOverlay
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            articles={articles}
            onOpenArticle={handleOpenArticle}
          />
        )}

        {activePolicyId && (
          <PolicyModal
            document={policyDocuments[activePolicyId]}
            onClose={() => setActivePolicyId(null)}
          />
        )}
      </Suspense>
    </div>
  );
}
