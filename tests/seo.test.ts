import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

const DIST = path.join(process.cwd(), 'dist');
const SITE = 'https://tyrbujac.com';

function getHtmlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getHtmlFiles(fullPath));
    else if (entry.name.endsWith('.html')) results.push(fullPath);
  }
  return results;
}

function label(file: string) {
  return path.relative(DIST, file);
}

let htmlFiles: string[] = [];

beforeAll(() => {
  htmlFiles = getHtmlFiles(DIST);
  expect(htmlFiles.length, 'dist/ is empty — run pnpm build first').toBeGreaterThan(0);
});

describe('every page has required meta tags', () => {
  it('has a non-empty <title>', () => {
    for (const file of htmlFiles) {
      const doc = parse(readFileSync(file, 'utf-8'));
      const title = doc.querySelector('title')?.text?.trim();
      expect(title, `${label(file)}: missing or empty <title>`).toBeTruthy();
    }
  });

  it('has a non-empty <meta name="description">', () => {
    for (const file of htmlFiles) {
      const doc = parse(readFileSync(file, 'utf-8'));
      const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim();
      expect(desc, `${label(file)}: missing or empty description`).toBeTruthy();
    }
  });

  it('has a canonical tag pointing to the site origin', () => {
    for (const file of htmlFiles) {
      const doc = parse(readFileSync(file, 'utf-8'));
      const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical, `${label(file)}: missing canonical`).toBeTruthy();
      expect(canonical, `${label(file)}: canonical doesn't start with site URL`).toMatch(
        new RegExp(`^${SITE}`)
      );
    }
  });

  it('has all four og: tags', () => {
    const required = ['og:type', 'og:url', 'og:title', 'og:description', 'og:image'];
    for (const file of htmlFiles) {
      const doc = parse(readFileSync(file, 'utf-8'));
      for (const prop of required) {
        const content = doc
          .querySelector(`meta[property="${prop}"]`)
          ?.getAttribute('content')
          ?.trim();
        expect(content, `${label(file)}: missing or empty ${prop}`).toBeTruthy();
      }
    }
  });
});

describe('every blog post has article-specific meta', () => {
  it('has article:published_time', () => {
    const postFiles = htmlFiles.filter((f) => f.includes(`${path.sep}blog${path.sep}`) && !f.endsWith('blog/index.html'));
    expect(postFiles.length, 'no post files found').toBeGreaterThan(0);
    for (const file of postFiles) {
      const doc = parse(readFileSync(file, 'utf-8'));
      const time = doc
        .querySelector('meta[property="article:published_time"]')
        ?.getAttribute('content');
      expect(time, `${label(file)}: missing article:published_time`).toBeTruthy();
    }
  });

  it('has Article JSON-LD with headline and datePublished', () => {
    const postFiles = htmlFiles.filter((f) => f.includes(`${path.sep}blog${path.sep}`) && !f.endsWith('blog/index.html'));
    for (const file of postFiles) {
      const doc = parse(readFileSync(file, 'utf-8'));
      const ldScript = doc.querySelector('script[type="application/ld+json"]');
      expect(ldScript, `${label(file)}: missing JSON-LD`).toBeTruthy();
      const data = JSON.parse(ldScript!.text);
      expect(data['@type'], `${label(file)}: JSON-LD @type`).toBe('Article');
      expect(data.headline, `${label(file)}: JSON-LD headline`).toBeTruthy();
      expect(data.datePublished, `${label(file)}: JSON-LD datePublished`).toBeTruthy();
    }
  });
});

describe('site-wide SEO assets', () => {
  it('sitemap exists', () => {
    const hasSitemap =
      existsSync(path.join(DIST, 'sitemap-index.xml')) ||
      existsSync(path.join(DIST, 'sitemap.xml'));
    expect(hasSitemap, 'no sitemap-index.xml or sitemap.xml in dist/').toBe(true);
  });

  it('sitemap references all blog posts', () => {
    const sitemapPath = existsSync(path.join(DIST, 'sitemap-0.xml'))
      ? path.join(DIST, 'sitemap-0.xml')
      : path.join(DIST, 'sitemap.xml');
    if (!existsSync(sitemapPath)) return;
    const content = readFileSync(sitemapPath, 'utf-8');
    const slugs = ['building-this-blog', 'what-100-lines-of-react-taught-me',
      'why-im-sticking-with-typescript', 'website-vs-web-app-which-framework-when',
      'devops-and-when-its-worth-it', 'setting-up-a-domain'];
    for (const slug of slugs) {
      expect(content, `sitemap missing /blog/${slug}/`).toContain(`/blog/${slug}/`);
    }
  });

  it('rss.xml exists', () => {
    expect(existsSync(path.join(DIST, 'rss.xml')), 'rss.xml not found in dist/').toBe(true);
  });

  it('rss.xml contains all blog posts', () => {
    const raw = readFileSync(path.join(DIST, 'rss.xml'), 'utf-8');
    // Decode basic XML entities so string matching works on raw titles
    const rss = raw
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    const titles = [
      'Building this blog in pure HTML/CSS',
      'What 100 lines of React taught me',
      "Why I'm sticking with TypeScript",
      'Website vs web app: which framework when',
      "DevOps, and when it's worth it",
      'Setting up a domain takes longer than buying one',
    ];
    for (const title of titles) {
      expect(rss, `rss.xml missing: ${title}`).toContain(title);
    }
  });

  it('robots.txt exists and references the sitemap', () => {
    const robotsPath = path.join(DIST, 'robots.txt');
    expect(existsSync(robotsPath), 'robots.txt not found').toBe(true);
    const content = readFileSync(robotsPath, 'utf-8');
    expect(content, 'robots.txt missing Sitemap directive').toContain('Sitemap:');
    expect(content, 'robots.txt sitemap URL should reference tyrbujac.com').toContain(SITE);
  });

  it('no internal link ends in .html', () => {
    for (const file of htmlFiles) {
      const doc = parse(readFileSync(file, 'utf-8'));
      const links = doc.querySelectorAll('a[href]');
      for (const link of links) {
        const href = link.getAttribute('href') ?? '';
        const isInternal = href.startsWith('/') || (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#'));
        if (isInternal) {
          expect(href, `${label(file)}: internal link ends in .html`).not.toMatch(/\.html$/);
        }
      }
    }
  });
});
