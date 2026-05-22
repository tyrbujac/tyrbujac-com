# tyrbujac.com

Personal site + blog for Tyr Bujac. Design Engineer, final-year CS at Liverpool, relocating to Barcelona summer 2027.

## Stack

- Pure HTML + CSS. No framework, no build step.
- Hosted on Netlify, deployed via GitHub push.
- One shared `styles.css` across all pages.

## Structure

- `index.html` — homepage (about, projects, blog list, footer)
- `projects/index.html` — projects listing page
- `blog/index.html` — blog listing page
- `blog/[slug].html` — individual blog posts
- `styles.css` — all styles, referenced everywhere as `/styles.css` (absolute path)
- `assets/` — `favicon.svg`, `og-image.png`
- `netlify.toml` — Netlify deploy config

## Conventions

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- CSS custom properties for all colour, spacing, type tokens. Defined in `:root`. Don't hardcode values in component styles.
- Mobile-first responsive. `prefers-color-scheme` for dark mode (no toggle).
- Centred column, max-width ~42rem (~65ch).
- Type stack: system fonts. Body ~17px, line-height 1.6.

## Blog post meta

Every blog post header carries `<time>DD Mon YYYY</time> · <span>N words</span>`. Count only the prose inside `<p>` tags within `<article class="post">` — exclude title, date, References, and image alt text. Recount and update whenever the body is edited; the count drifting silently is worse than a wrong number. Posts with external links end with an `<h2>References</h2>` followed by a `<ul>` (the body stays unlinked).

## Modern CSS — reach for these first

These aren't all in `styles.css` yet (the site is small), but they're the default when new CSS gets written:
- `clamp()` for fluid type
- `:has()` for parent selectors
- Container queries where applicable
- `oklch()` over hex for new colours
- Logical properties (`margin-block`, `padding-inline`)

Don't suggest reaching for libraries or frameworks. The constraint is the point.

## Positioning

Site positions Tyr as a **Design Engineer** (Figma → React). Not "Product Designer" or "Frontend Developer." Don't soften this.

## Don'ts

- No build step, no npm, no framework. If a fix requires these, push back first.
- No analytics, no cookies, no tracking.
- No "Hello world / welcome to my blog" posts. Posts should have substance.
- Don't add features without asking (tags, search, comments, RSS, etc. — these come later, deliberately).

## Trade-offs

- Every page copies the `<header>`, `<footer>`, and most of `<head>`. That's the cost of no build step. Don't reach for a template system or partials before the duplication is genuinely painful — it's accepted as deliberate.
