# Clean URL & WordPress Migration Strategy

## 1. Current Frontend Limitations (Hash-Based Routing)

In this pre-release static React frontend milestone, navigation between the homepage, category archives, and sample articles uses URL hash fragments (`/#article/<slug>` and `/#category/<slug>`).

### Why Hash URLs Are Not SEO-Final
- **Fragment Stripping by Crawlers**: Search engines (Googlebot, Bingbot) and social link unfurlers (X, LinkedIn, Slack, Facebook) strip everything from `#` onward before sending an HTTP request. As a result, `/#article/quiet-architecture-of-human-centered-ai` resolves on the server as `/`.
- **Canonical Collapse**: Putting `#article/...` inside `<link rel="canonical">` is invalid/ignored by search engines and would cause every article to collapse onto the homepage canonical. Therefore, `useSeo.ts` intentionally emits clean, fragment-free canonical URLs (`origin + pathname`) during this prototype stage.
- **Dynamic Client-Side Meta Tags**: Social media crawlers generally do not execute client-side JavaScript (`useSeo.ts`), so Open Graph tags (`og:title`, `og:description`, `og:image`) must be server-rendered per URL in production.

---

## 2. Target Clean Permalink Structure (WordPress on Hostinger)

When migrating to WordPress, replace hash-based routes with server-rendered clean permalinks:

| Content Type | Current Prototype Hash | Target WordPress Permalink |
| --- | --- | --- |
| Homepage | `/` | `/` |
| Single Article | `/#article/<slug>` | `/<slug>/` or `/articles/<slug>/` |
| Category Archive (12 desks) | `/#category/<slug>` | `/category/<slug>/` |
| Policy / Editorial Pages | Modal (`policyDocuments`) | `/about/`, `/contact/`, `/privacy-policy/`, `/terms-of-use/`, `/editorial-policy/`, `/disclaimer/` |

Recommended WordPress Permalink Setting:
- **Post name** (`/%postname%/`) or custom prefix `/articles/%postname%/` paired with **Category base** `/category/`.

---

## 3. Data-to-WordPress Architecture Mapping

The frontend data layer (`src/types/editorial.ts`, `src/data/*.ts`, `src/config/siteConfig.ts`) is structured to map directly to WordPress primitives:

1. **`SiteConfig` (`src/config/siteConfig.ts`)** → WordPress **Site Identity / Theme Customizer** (`blogname`, `blogdescription`, custom logo, navigation menus, and social channel options).
2. **`Category` (`src/data/categories.ts`)** → Native WordPress **Categories** (`category` taxonomy) with matching slugs (`technology-ai`, `digital-world`, etc.) and descriptions.
3. **`Author` (`src/data/authors.ts`)** → WordPress **Users / Author Archives** (`/author/<nicename>/`) using display name, role/desk meta, and biographical info.
4. **`Article` (`src/data/articles.ts`)** → WordPress **Posts** (`post` post type) with:
   - `title` → `post_title`
   - `slug` → `post_name`
   - `excerpt` → `post_excerpt`
   - `publishedIso` / `updatedIso` → `post_date_gmt` / `post_modified_gmt`
   - `coverImage` / `coverImageAlt` / `coverCaption` → Featured Image (`_thumbnail_id`, attachment alt meta, caption)
   - `sections` → Gutenberg Block content (`H2`/`H3` headings + Pullquote blocks + paragraphs, supporting automatic Table of Contents generation)
   - `featuredHero`, `trendingRank`, `editorsPick`, `popularRank` → Post tags/categories or ACF/custom post meta flags.

---

## 4. Production SEO & Server-Rendering Checklist

Before indexing the live WordPress site:
1. **Server-Rendered Head Tags**: Output `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, and Twitter tags directly in PHP (`wp_head`) or via an SEO plugin (e.g., Yoast SEO / Rank Math).
2. **Absolute Image URLs**: Ensure `og:image` and `twitter:image` resolve to full HTTPS URLs of `1200x630` / `1376x768` optimized assets.
3. **Structured Data (JSON-LD)**: Emit `WebSite`, `Organization`, `BreadcrumbList`, and `Article` schema per route in server HTML.
4. **Sitemaps & Robots**: Enable WordPress XML sitemaps (`/wp-sitemap.xml`), verify `robots.txt` does not block CSS/JS/images, and submit the sitemap in Google Search Console only after replacing all sample content with original editorial articles.
5. **No Hash Links in Production**: Ensure internal `<a>` links use clean server paths (`href="/articles/<slug>/"`) rather than `#article/` fragments.
