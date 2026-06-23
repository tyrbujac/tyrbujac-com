---
title: "DevOps, and when it's worth it"
description: "Why I skip automated builds and tests on small projects, and the point where they start saving more time than they cost."
date: 2026-06-13
---

As a teenager making small coding projects, I didn't use version control. The projects were a few files, and if something broke I could usually spot where this was. Closer to a hundred files, that stopped being true. Code I'd changed would break things I couldn't see.

This gets worse as a project grows. Last year I shipped a new version of the music software I'm building with a major bug I thought I'd already fixed. The Windows version had an outdated audio engine, so the new release had no sound. I only realised this after releasing it!

So I started using continuous integration, or CI. Every time I send an update to GitHub, it runs automatic checks for anything broken, without me having to remember to look. It would have caught that silent Windows build before it ever reached anyone.

The whole practice of automating this building, testing, and releasing is called DevOps. I use GitHub Actions, GitHub's built-in tool, free for public repositories. It also handles releases: once the checks pass, a new version gets packaged up automatically.

I wouldn't set this up for a small project. The initial setup feels like it slows you down, and when there's little to break, it does. But as a project grows and there's more that can quietly fail, that flips. The automatic checks catch things faster than I could by hand, so development actually speeds up rather than slows down. The setup cost gets paid back.

## References

- [GitHub Actions](https://github.com/features/actions)
