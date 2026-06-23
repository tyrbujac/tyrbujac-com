---
title: "Website vs web app: which framework when"
description: "Migrating boojy.org to Astro, and what it taught me about picking React for apps and Astro for content sites."
date: 2026-06-07
---

This week I migrated my landing page, boojy.org, to Astro. It's the site for Boojy, the creative software I'm developing. After learning React I'd planned to build the landing page in React too, but while reading about SEO I found that React apps aren't designed well for web searches. That sent me down a useful rabbit hole about when to use which framework.

It comes down to what you're building. There are roughly two kinds of thing. A web app is interactive and stateful: you log in, click around, things change on screen. A content site is mostly pages of text that need to be found on Google. They pull in different directions, so they suit different tools.

React is built for interactivity, so it suits apps. The two apps in the Boojy suite, Boojy Notes and Boojy Design, are built with React. Astro is built for content sites that load fast and rank well on search engines, which is exactly what a landing page needs. A landing page lives or dies on being found; an app you log into doesn't need Google at all. So boojy.org is Astro, and the apps are React.

Honestly, I wish I'd done a bit more research before picking Astro. It works well, but it's less popular than Next.js (another framework that renders pages search engines can read), so there are fewer high-quality tutorials when you get stuck. Next time I'd lean towards Next.js, and I plan to learn it in the future.

## References

- [Astro](https://astro.build/)
