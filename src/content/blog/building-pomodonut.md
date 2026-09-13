---
title: "Building Pomodonut"
description: "How I rebuilt a Pomodoro timer in React 19 — the stack, the stages, and the problems worth solving: accurate timing in background tabs, a donut drawn with zero image assets, and sound with no audio files."
date: 2026-06-24
---

Pomodonut is a Pomodoro timer where the progress indicator is an illustrated donut. Work or break, the donut drains clockwise. A chime fires when the session ends. That's about it.

I built an earlier version in vanilla JS a while back. This is a full rebuild in my current stack — React 19, Tailwind v4, Vite 8 — with a cleaner visual approach and a handful of problems that turned out to be more interesting than they first looked.

Scope was deliberate from the start: no session counts, no task lists, no history, no accounts. The design doc I wrote before touching any code put it plainly: "simplicity is the point." That constraint held up throughout.

## The stack

**React 19 + TypeScript 6** — bleeding-edge versions mainly because I wanted to try them. No significant gotchas; a few TS 6 deprecation warnings the linter complained about, but nothing that broke anything real.

**Vite 8** — instant dev server, dead-simple config. No surprise here.

**Tailwind v4** — the new CSS-first config: an `@theme` block in the CSS file, no JS config at all. Design tokens defined with `oklch` and a bakery theme: `--color-dough`, `--color-choc`, `--color-coral`, `--color-bg-break`. The plugin-based setup via `@tailwindcss/vite` is noticeably cleaner than the old v3 approach.

**shadcn/ui** — pulled in exactly two components: the Radix Dialog (for settings) and a base Button. Using a component library for two components might look like overkill. The Dialog accessibility story — focus trap, `aria` attributes, keyboard dismiss — is genuinely hard to get right from scratch and not worth re-solving for a side project.

**Framer Motion 12** — one use: the animated Work/Break toggle pill. The `layoutId` pattern handles the sliding indicator with a single prop and a spring config. The whole animation is about six lines.

**Vitest 4** — unit tests for the `formatTime` utility. Small test surface, but it was worth extracting and covering before setting up CI.

## The stages

I started with a design doc before writing any code. Then: working timer (countdown, modes, start/pause), state-driven durations with `localStorage` persistence, motion polish (the toggle pill), and finally a large visual redesign that introduced the illustrated donut and synthesised sounds. GitHub Actions CI and Netlify CD were the last pieces.

The design doc paid off. Every feature I considered adding had a clear answer: out of scope.

## Getting the timer right

This is the part worth writing about.

My first version used `setInterval` to tick down one second at a time. It worked, but not reliably. Browsers throttle `setInterval` in background tabs — drop to another tab for a few minutes and come back to find the timer several seconds behind.

The fix everyone reaches for is `requestAnimationFrame`: derive remaining time from `Date.now()` on each frame instead of trusting the interval. This fixes visual smoothness but introduces a different problem. Browsers also throttle `requestAnimationFrame` in background tabs (to 1fps or less). If the session ends while you're in another tab, the completion callback never fires until you switch back.

The solution I landed on is a hybrid. A `setTimeout` scheduled for the exact session end time drives *completion* — browsers don't throttle `setTimeout` the same way for known delays, so it fires even in background tabs. `requestAnimationFrame` is only responsible for *rendering the countdown while the tab is visible*:

```js
// Fires even when the tab is hidden — fixes the background-tab bug.
timeoutRef.current = setTimeout(onComplete, secondsLeft * 1000);

// rAF loop: only responsible for rendering the countdown, not completion.
const tick = () => {
  const rem = (endTimeRef.current - Date.now()) / 1000;
  if (rem > 0) {
    setSecondsLeft(rem);
    rafRef.current = requestAnimationFrame(tick);
  }
};
rafRef.current = requestAnimationFrame(tick);
```

`endTimeRef` stores the wall-clock end time (`Date.now() + secondsLeft * 1000`) so the rAF loop always derives remaining time from absolute time, not accumulated ticks. Accuracy is independent of frame rate or tab throttling.

One more wrinkle: the rAF and timeout callbacks need to read current settings values — mode, durations, auto-start, sound — without re-subscribing the effect every time those values change. The solution is a refs-mirror-state pattern: `modeRef`, `workMinutesRef`, etc., synced via `useLayoutEffect` on every render. The timer effect's deps are deliberately just `[isRunning, session]`. The `session` counter is the auto-start re-trigger mechanism — incrementing it causes the effect to re-run and schedule a new timer. This is the kind of thing that looks like a lint violation until you understand why it's correct.

## The donut

The donut is pure SVG. No image asset, no canvas, no library. I wanted full control over the drain animation and didn't want to ship a file.

The structure is two stacked `<use>` layers pointing at the same `<g id="donut-art">` in `<defs>`. The first layer renders at 25% opacity and carries a drop shadow — the ghost donut, always visible as a backdrop. The second layer renders at full opacity but is clipped by a pie-wedge `<clipPath>` that covers only the remaining-time portion. As time runs down, the wedge shrinks and the vivid donut drains clockwise from 12 o'clock.

The wedge is an SVG arc path calculated from the progress fraction (0 to 1). One edge case: SVG can't draw a 360° arc in a single `<path>` command, so the full-circle case is special-cased as two 180° halves.

The 28 sprinkles (coloured rectangles scattered around the donut ring) are hardcoded — angle, distance from centre, colour, tilt — rather than randomly generated. Random would mean a different layout every render, or a seed to maintain, or a `useMemo`. Hardcoded is deterministic and stable across renders, and the layout can be hand-tuned. The comment in the code says it plainly.

## Sound without files

Every sound in Pomodonut is synthesised at runtime via the Web Audio API. No `.mp3`, no `.ogg`, no fetch requests.

One shared `AudioContext` is lazily created and reused across all sounds. A `scheduleNote` helper creates an oscillator, routes it through a gain node, sets the frequency and an exponential fade-out, then starts and stops it at a scheduled time. Three cues are built from pairs of notes:

- **Start** — 440Hz then 660Hz (rising, two short notes)
- **Pause** — 550Hz then 370Hz (falling)
- **Chime** — 880Hz then 1100Hz, slightly longer, higher volume

Each cue calls `ctx.resume()` first, which satisfies the browser autoplay-gesture requirement. The `AudioContext` suspends itself if no user interaction has happened yet; `resume()` unblocks it before scheduling the notes.

Sound is togglable via a settings switch, and the preference persists to `localStorage` alongside the duration settings.

## Shipping it

Before CI, I extracted `formatTime` — the seconds-to-MM:SS formatter — into a `utils.ts` file and added Vitest unit tests for it. A timer app's formatter is the most testable piece of logic in the whole codebase. Having even a small test file meant the CI step was meaningful rather than ceremonial.

GitHub Actions runs lint and tests on every push and PR. Netlify CD was a single `netlify.toml` commit: `pnpm run build` pointing at `dist/`. The most recent commit in the repo is literally "Test auto-deploy: minor README wording tweak" — a manual smoke test of the pipeline, which I find funny to have in the git log permanently.

## References

- [Pomodonut — live app](https://pomodonut-react.netlify.app)
- [pomodonut-react — source on GitHub](https://github.com/tyrbujac/pomodonut-react)
- [Web Audio API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Framer Motion layout animations](https://motion.dev/docs/react-layout-animations)
