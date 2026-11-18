import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

interface SeoOptions {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  structuredData?: Record<string, unknown>;
}

/**
 * Updates client-side document metadata for preview and SPA route transitions.
 *
 * SEO NOTE:
 * Hash-based routes (`#article/...`, `#category/...`) cannot serve distinct canonical
 * URLs to search engine crawlers because URL fragments are stripped before HTTP requests.
 * This hook intentionally avoids writing `#` fragments into `<link rel="canonical">`.
 * See `docs/WORDPRESS_URL_MIGRATION.md` for the server-rendered clean permalink plan.
 */
export function useSeo({
  title,
  description,
  ogType = 'website',
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
  section,
  structuredData,
}: SeoOptions) {
  useEffect(() => {
    const resolvedTitle = title
      ? `${title} — ${siteConfig.publicationName}`
      : `${siteConfig.publicationName} – Essays, Analysis & Practical Guides`;
    const resolvedDescription = description || siteConfig.description;

    document.title = resolvedTitle;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const removeMeta = (attr: 'name' | 'property', key: string) => {
      const el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) el.remove();
    };

    upsertMeta('name', 'description', resolvedDescription);
    upsertMeta('property', 'og:title', resolvedTitle);
    upsertMeta('property', 'og:description', resolvedDescription);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('name', 'twitter:title', resolvedTitle);
    upsertMeta('name', 'twitter:description', resolvedDescription);

    if (typeof window !== 'undefined') {
      // Never embed URL hash fragments in canonical tags; crawlers strip `#...`
      const cleanDocumentUrl = `${window.location.origin}${window.location.pathname}`;

      let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.rel = 'canonical';
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.href = cleanDocumentUrl;
      upsertMeta('property', 'og:url', cleanDocumentUrl);

      if (image) {
        const absoluteImage = image.startsWith('http')
          ? image
          : `${window.location.origin}${image}`;
        upsertMeta('property', 'og:image', absoluteImage);
        upsertMeta('name', 'twitter:image', absoluteImage);
        if (imageAlt) {
          upsertMeta('property', 'og:image:alt', imageAlt);
        } else {
          removeMeta('property', 'og:image:alt');
        }
      }
    }

    if (ogType === 'article') {
      if (publishedTime) upsertMeta('property', 'article:published_time', publishedTime);
      if (modifiedTime) upsertMeta('property', 'article:modified_time', modifiedTime);
      if (section) upsertMeta('property', 'article:section', section);
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:modified_time');
      removeMeta('property', 'article:section');
    }

    const scriptId = 'idm-structured-data';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [
    title,
    description,
    ogType,
    image,
    imageAlt,
    publishedTime,
    modifiedTime,
    section,
    structuredData,
  ]);
}
