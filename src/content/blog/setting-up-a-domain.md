---
title: "Setting up a domain takes longer than buying one"
description: "I'm writing this while waiting for DNS to propagate. Getting a domain working takes more fiddling than buying one."
date: 2026-06-21
---

I'm writing this while waiting for my domain to go live. This week I've been moving my blog from its Netlify address to my own domain, tyrbujac.com, and right now it's stuck in the wait for DNS to propagate. It should be live tomorrow. That wait is the theme of this post: getting a domain working takes more fiddling than buying one.

A domain is just a human-friendly address. The actual site lives somewhere else, on a server, and DNS is the system that points the address at it. When you change where a domain points, that update has to spread across the internet's servers worldwide, which can take anywhere from minutes to a day. That spreading is propagation, and it's why I'm waiting.

I also set up email at the domain using Resend, so messages to tyr@boojy.org land in my normal inbox and I can send from that address too. It looks more professional than a generic address, but it's another set of records to configure and verify, which adds to the fiddling.

If you're building your first site to launch, my advice: start on the free hosting URL that Netlify or Cloudflare gives you, and add your own domain later. The site works straight away, and you avoid being blocked by the domain setup, which can take a few hours to a day to go live.

## References

- [Resend](https://resend.com)
- [Netlify](https://www.netlify.com)
- [Cloudflare](https://www.cloudflare.com/)
