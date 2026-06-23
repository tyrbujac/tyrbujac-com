---
title: "Why I'm sticking with TypeScript"
description: "A week of migrating Boojy Notes to TypeScript, and why the extra typing is worth it."
date: 2026-05-31
---

Last week I built a todo list in React. This week I started using TypeScript with my React projects, and I think I'm keeping it.

JavaScript is the language that runs in every web browser. It's the foundation of the web. But it lets a variable be anything: text, a number, or nothing at all. You often only find out something's wrong when it breaks. TypeScript makes you label what each thing is meant to be, then warns you the moment something doesn't match, before you run the code.

This week I started migrating my app Boojy Notes from JavaScript to TypeScript and it's caught bugs earlier, especially in React, where I've had noticeably fewer of the small errors that used to slow me down.

That helps me focus on the design. Every hour not lost to a confusing bug is an hour I get to spend on how something looks and feels instead.

I like simple code, so the extra typing felt like a step backwards at first. It reminds me of riding a bike without stabilisers. Worse at the start, better once it clicks. My experience with typed languages like C++ and Dart, which I didn't expect to help here, turned out to.

Here's the idea in practice. Plain JavaScript accepts anything:

```
function addTask(text) { ... }

addTask(42); // runs fine, breaks later
```

TypeScript checks it for you:

```
function addTask(text: string) { ... }

addTask(42); // flagged: 42 isn't text
```

Maybe some of the "fewer bugs" is placebo. I'll find out as my projects get bigger.
