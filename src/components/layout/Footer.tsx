import { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { Category, CategorySlug, PolicyDocument } from '../../types/editorial';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (slug: CategorySlug) => void;
  onOpenPolicy: (policyId: PolicyDocument['id']) => void;
}

export function Footer({
  categories,
  onSelectCategory,
  onOpenPolicy,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [placeholderNotice, setPlaceholderNotice] = useState<string | null>(null);

  const publicationLinks: { label: string; policyId: PolicyDocument['id'] }[] = [
    { label: 'About the Publication', policyId: 'about' },
    { label: 'Contact & Editorial Desk', policyId: 'contact' },
    { label: 'Editorial Policy', policyId: 'editorial-policy' },
    { label: 'Privacy Policy', policyId: 'privacy' },
    { label: 'Terms of Use', policyId: 'terms' },
    { label: 'Disclaimer', policyId: 'disclaimer' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-[#F3F5F8] text-slate-700 dark:border-slate-800 dark:bg-[#070B14] dark:text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: About the publication */}
          <div className="md:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#0F2544] font-serif text-xs font-bold tracking-wider text-white dark:bg-blue-600"
              >
                {siteConfig.shortMark}
              </span>
              <span className="font-serif text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                {siteConfig.publicationName}
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {siteConfig.tagline}
            </p>

            <p className="mt-5 max-w-sm border-t border-slate-200/90 pt-4 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
              {siteConfig.sampleNotice}
            </p>
          </div>

          {/* Column 2: Explore Categories (all 12 initial categories) */}
          <div className="lg:col-span-5">
            <h2 className="border-b border-slate-200/90 pb-2.5 font-sans text-xs font-semibold tracking-[0.08em] text-slate-900 uppercase dark:border-slate-800 dark:text-slate-100">
              Explore Categories
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.slug)}
                    className="py-0.5 text-left text-sm leading-snug text-slate-600 transition-colors hover:text-[#0F2544] hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-400 dark:hover:text-blue-300"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Publication Policies & Social Placeholders */}
          <div className="lg:col-span-3">
            <h2 className="border-b border-slate-200/90 pb-2.5 font-sans text-xs font-semibold tracking-[0.08em] text-slate-900 uppercase dark:border-slate-800 dark:text-slate-100">
              Publication &amp; Policies
            </h2>
            <ul className="mt-4 space-y-2.5">
              {publicationLinks.map((item) => (
                <li key={item.policyId}>
                  <button
                    type="button"
                    onClick={() => onOpenPolicy(item.policyId)}
                    className="py-0.5 text-left text-sm leading-snug text-slate-600 transition-colors hover:text-[#0F2544] hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-400 dark:hover:text-blue-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-slate-200/90 pt-5 dark:border-slate-800">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-sans text-xs font-semibold tracking-[0.08em] text-slate-900 uppercase dark:text-slate-100">
                  Social Channels
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Placeholder URLs
                </span>
              </div>

              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                {siteConfig.socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      title={
                        social.isPlaceholder
                          ? `${social.label} (Placeholder URL: ${social.href})`
                          : social.label
                      }
                      onClick={(e) => {
                        if (social.isPlaceholder) {
                          e.preventDefault();
                          setPlaceholderNotice(
                            `${social.label} currently uses a configurable placeholder URL (${social.href}).`
                          );
                        }
                      }}
                      className="inline-block py-0.5 text-xs font-medium text-slate-600 transition-colors hover:text-[#0F2544] hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2544] dark:text-slate-400 dark:hover:text-blue-300"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>

              {placeholderNotice && (
                <p
                  role="status"
                  className="mt-3 border border-slate-200 bg-white/80 p-2.5 text-[11px] leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                >
                  {placeholderNotice}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-slate-800 dark:text-slate-400">
          <p>
            &copy; {currentYear} {siteConfig.copyrightHolder}. All rights reserved.
          </p>
          <p>
            {siteConfig.editionLabel} · Sample Content Preview
          </p>
        </div>
      </div>
    </footer>
  );
}
