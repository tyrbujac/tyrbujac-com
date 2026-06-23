# tyrbujac.com

Personal site and blog. Built with [Astro](https://astro.build) — static HTML output, no client-side JS.

Live at [tyrbujac.com](https://tyrbujac.com).

## Run locally

```bash
git clone https://github.com/tyrbujac/tyrbujac-com.git
cd tyrbujac-com
pnpm install
pnpm dev        # http://localhost:4321
```

## Build & test

```bash
pnpm build      # outputs to dist/
pnpm preview    # preview the built site locally
pnpm test       # build + run SEO test suite
```

## Structure

```text
.
├── src/
│   ├── layouts/
│   │   ├── Base.astro       Shared head, header, footer
│   │   └── Post.astro       Blog post wrapper (JSON-LD, word count)
│   ├── pages/
│   │   ├── index.astro      Homepage
│   │   ├── projects/        Projects listing
│   │   ├── blog/            Blog listing + [slug] route
│   │   └── rss.xml.js       RSS feed
│   └── content/
│       ├── config.ts        Blog collection schema
│       └── blog/            Posts as Markdown (.md)
├── plugins/
│   └── remark-word-count.mjs   Auto word count at build time
├── public/
│   ├── styles.css           All styles
│   ├── assets/              favicon.svg, og-image.png, images
│   └── robots.txt
├── tests/
│   └── seo.test.ts          SEO test suite (Vitest)
├── astro.config.mjs
└── netlify.toml             Build command + .html → clean URL redirects
```

## Stack

- [Astro](https://astro.build) (static output)
- Hosted on Netlify, deployed on push to `master`
