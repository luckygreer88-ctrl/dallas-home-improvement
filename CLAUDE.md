# Notes for Claude: Dallas Home Improvement website

Read this first in any new chat about this site or the owner's ads.

## The business
- **Name:** Dallas Home Improvement Cleaning Services
- **Website:** https://dallashomeimprovementexperts.com
- **Phone (call or text):** 469-562-1010. Every page has tel: and sms: buttons, and the text message is pre-filled.
- **Area:** Dallas–Fort Worth Metroplex
- **Services (one page each):** window cleaning (plus a window-cleaning tips page), pressure washing, gutter cleaning,
  furniture/upholstery cleaning, carpet cleaning, dryer vent cleaning, junk removal, post-construction cleaning
- **Reviews:** Thumbtack review widget on the home page; Google Business profile link (share.google)
- **Owner:** prefers plain-word, one-step-at-a-time instructions. Ask for
  screenshots when guiding them through a website's screens.

## How the site works
- Plain HTML/CSS/JS, no build step. `index.html` plus one `.html` file per page. Netlify serves pages without
  `.html` (e.g. `/junk-removal`), and the sitemap uses those addresses.
- Shared files: `css/style.css`, `js/main.js`, `images/`. Each page repeats its own header, footer and tracking
  code, so a change to any of those has to be made in **every** `.html` file.
- When adding or renaming a page, update `sitemap.xml` (except ad landing pages, which stay out of it).
- **Ad landing pages** (no menu, `noindex`, not in the sitemap, sticky Call / Text bar on phones):
  - `/sofa-cleaning-deal`: Google Ads furniture campaign. Deal: $99 one sofa, $149 two sofas; a sectional counts
    as 2. The Text button pre-fills a message asking for a couch photo. Google reviews (140) are linked, but no
    quotes are shown yet: add only real reviews the owner pastes in.

## Hosting and publishing
- **Netlify** project `resonant-kulfi-e58012` (team `luckygreer88`), linked to this GitHub repo.
- **Pushing to `main` publishes the live site** within about a minute. Nothing else is needed.
- `netlify.toml` publishes the repo root with no build command. `_redirects` hides CLAUDE.md, README.md and
  netlify.toml from the public site (they would otherwise be served).
- History: the site was first uploaded by hand with Netlify Drop (Sept 2026). In Nov 2026 it was copied into this
  repo byte-for-byte and Netlify was linked to GitHub. The domain was not bought through Vercel.

## Tracking and ads
- On every page: the **ChatGPT (OpenAI) ads pixel** `JgTd5JPQExATxXrxQ7gnjQ`.
- **Not installed yet:** Meta (Facebook) Pixel, Google Ads / Google Analytics tag. Add these if running
  Facebook or Google ads to this site, so calls and texts from ads can be counted.
- Facebook ads run from the "Dallas Home Improvement" Facebook page.

## Related projects (same owner, separate repos)
- **SnapHaul** (`luckygreer88-ctrl/estimate-recovery-app`, folder `snaphaul/`, hosted on Vercel): junk removal
  quote app. Visitors from the Dallas Home Improvement Facebook ads see "In partnership with Dallas Home
  Improvement" on its start page.
- **CleanCompare** (`luckygreer88-ctrl/cleancompare`, hosted on Vercel): carpet cleaning deals site for
  Facebook traffic.
