# tyrbujac.com

Personal site and blog. Built in pure HTML and CSS — no framework, no build step.

Live at [tyrbujac.com](https://tyrbujac.com).

## Run locally

```bash
git clone https://github.com/tyrbujac/tyrbujac-com.git
cd tyrbujac-com
```

Open the folder in VS Code, then right-click `index.html` → "Open with Live Server" (install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension if you don't have it). Serves at `http://127.0.0.1:5500`.

Note: opening `index.html` directly via `file://` won't work — pages reference assets via absolute paths (`/styles.css`, `/assets/favicon.svg`), which only resolve when served from an HTTP server.

## Structure

```text
.
├── index.html               Homepage
├── projects/index.html      Projects page
├── blog/index.html          Blog index
├── blog/[slug].html         Blog posts
├── styles.css               All styles
├── assets/                  favicon.svg, og-image.png
├── netlify.toml             Netlify deploy config
└── CLAUDE.md                Project conventions
```

## Stack

- HTML, CSS
- Hosted on Netlify
