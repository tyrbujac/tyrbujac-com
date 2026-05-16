# tyrbujac.com

Personal site + blog for Tyr Bujac. Design Engineer, final-year CS at Liverpool, relocating to Barcelona summer 2027.

## Stack

- Pure HTML + CSS. No framework, no build step.
- Hosted on Netlify, deployed via GitHub push.
- One shared `styles.css` across all pages.

## Structure

- `index.html` — homepage (about, projects, blog list, footer)
- `posts/[slug].html` — individual blog posts
- `styles.css` — all styles
- `assets/` — images

## Conventions

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- CSS custom properties for all colour, spacing, type tokens. Defined in `:root`. Don't hardcode values in component styles.
- Mobile-first responsive. `prefers-color-scheme` for dark mode (no toggle).
- Centred column, max-width ~42rem (~65ch).
- Type stack: system fonts. Body ~17px, line-height 1.6.

## Modern CSS deliberately used

This project is partly an exercise in modern CSS. Prefer:
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