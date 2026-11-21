# Notes for Claude: Dallas Home Improvement website

Read this first in any new chat about this site or the owner's ads.

## The business
- **Name:** Dallas Home Improvement Cleaning Services
- **Website:** https://dallashomeimprovementexperts.com
- **Phone (call or text):** 469-562-1010. Every page has tel: and sms: buttons, and the text message is pre-filled.
- **Area:** Dallas–Fort Worth Metroplex (owner: "Dallas and surrounding areas")
- **Replies to calls/texts:** 8 AM – 10 PM (Google Ads schedule matches)
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
  - `/sofa-cleaning-deal`: Google Ads furniture campaign. Deal: $129 one sofa, $199 two sofas; a sectional counts
    as 2. (Raised from $99/$149 in Nov 2026 for Google Ads, near the Dallas average; the Facebook ads may still say $99.) Navy header with the white-and-gold logo (`images/logo-light-gold.png`) and a small slim gold Call pill (phone icon in a navy circle + the number; owner picked option 3 of 5, then asked for it smaller). Headline "Sofa Cleaning $129" with a "FREE Fabric Protector Included" bar in Scotchgard red: dark see-through glass, glowing red outline, "FREE" in a red box, white text, a little space above and below (owner picked this from 10 red-bar options, to cut down on gold). A small Scotchgard bottle (`images/scotchgard-bottle.png`, cut along the can's real edge from the owner's product photo so there's no white fringe; the owner uses Scotchgard) sits inside the left end of the tag and pulses (grows to 118%, owner asked for a bigger pulse), like the owner's Facebook ad. Owner picked this over a pop-out or side-by-side bottle. Hero background: the couch photo (`images/furniture-header.webp`) shows through at the bottom, behind the prices (owner picked this over a photo strip or a before/after strip). Gallery order: sectional (owner's job, `images/sectional-before-after.webp`), yellow couch, armchair (owner confirmed it is their job, `images/chair-before-after.webp`), two mattresses. Before/after photos are smaller on phones (about 1.7 visible, swipe for more); the owner will add more photos later. Speed: phones load `images/furniture-header-900.webp` (preloaded) instead of the 1536px hero, and the YouTube video is a thumbnail until the visitor scrolls near it (`.yt-lazy`); keep it that way. Price boxes: white cards, gold 2-sofa card with a round navy "Best value" sticker. No buttons under the prices. Floating bottom button: gold block, navy couch icon with a camera badge, "Text Us for a Free Quote / Send Photo (Optional)" (owner's exact wording), gentle gold pulse. The owner said no light flash/shine on this button. Pre-filled text: "Hi! I'm interested in sofa cleaning." Photos are optional everywhere on the page (the owner doesn't want to scare off people who can't send one), and the text must not name a price (customers may want 2 sofas etc.). **Pet urine treatment is an extra charge** (not in the $129/$199): never imply it is included on the page or in ads; the FAQ says it is an add-on. **Facebook prices:** links with `?deal=fb` show $99 / $149 (Facebook ads still advertise those) instead of $129 / $199; only the numbers in `.p1`/`.p2` and the headline price change. The tap alert has a `came_from` field (Facebook ad / Google ad / Not sure). Ad-group versions: `?v=sectional` ("Sectional Cleaning $199"), `?v=pet` ("Pet Stain Couch Cleaning", no price, offers urine treatment as an add-on), `?v=upholstery` ("Upholstery Cleaning $129") swap only the headline and the sentence under it (script right after `#lp-sub`); no `?v` = "Sofa Cleaning $129". Google Ads ad groups link to these. Google rating 5.0 from 143 reviews (updated Nov 20, 2026) is shown in the top badge and again as a one-line heading over the reviews ("5.0 ★★★★★ · 143 Google reviews", "Google" in its colors, no icon; owner picked option 13 of 17 and dropped "Trusted by DFW Homeowners"), plus 3 real Google review quotes (Nov 2026: Moyra S., Nadia R., Kisha C., with their Google profile pictures `images/review-*.webp` and a Google G on each card) each
    linked to its review. Only ever use real reviews the owner sends.

## Hosting and publishing
- **Publishing uses Netlify credits.** The free plan ran out in Nov 2026 after ~22 publishes and deploys were paused; the owner then upgraded the Netlify plan. Still: show the owner screenshots of options first and publish once per decision, not after every small tweak. Deploys blocked while paused are not retried; a new push triggers one.
- **Netlify** project `resonant-kulfi-e58012` (team `luckygreer88`), linked to this GitHub repo.
- **Pushing to `main` publishes the live site** within about a minute. Nothing else is needed.
- `netlify.toml` publishes the repo root with no build command. `_redirects` hides CLAUDE.md, README.md and
  netlify.toml from the public site (they would otherwise be served).
- History: the site was first uploaded by hand with Netlify Drop (Sept 2026). In Nov 2026 it was copied into this
  repo byte-for-byte and Netlify was linked to GitHub. The domain was not bought through Vercel.

## Link previews (Facebook, Messenger, texts)
- Every page has Open Graph tags. Share picture `images/og-home.jpg` (1200x630: the owner's "A Cleaner Home, A Brighter Life" banner, zoomed on the 5 service cards, version A the owner picked) on all pages except
  `furniture-cleaning` and `sofa-cleaning-deal`, which use `images/og-sofa.jpg` (couch photo + FREE Fabric Protector).
- The sofa page's share title/description name no price (Facebook visitors see $99, Google $129).
- After changing a share picture, re-scrape in Facebook's Sharing Debugger or old previews stay cached.

## Tracking and ads
- On every page: the **ChatGPT (OpenAI) ads pixel** `JgTd5JPQExATxXrxQ7gnjQ`.
- **Tap alerts (sofa page):** every tap on a Call or Text button on `/sofa-cleaning-deal` posts a hidden Netlify form `button-tap` (action, which button, from Google Ads yes/not sure, Dallas time); Netlify emails it to the owner. Needs Netlify Forms > form detection ON and an email notification on that form. A tap is not a connected call.
- **Google Ads (sofa page only):** Google tag `AW-18533660310` in the `<head>` of `/sofa-cleaning-deal`; every Call/Text tap
  fires the conversion "Call or text tap" (`send_to: AW-18533660310/lXVOCM7kvrgdEJbtxIVF`) inside the same click handler as
  the Netlify tap alert. Campaign "Sofa Cleaning – DFW" (Search, exact match, 30 mi around Dallas, $35/day, launched Nov 2026).
- **Not installed yet:** Meta (Facebook) Pixel; Google tag on the other pages.
- Facebook ads run from the "Dallas Home Improvement" Facebook page.

## Related projects (same owner, separate repos)
- **SnapHaul** (`luckygreer88-ctrl/estimate-recovery-app`, folder `snaphaul/`, hosted on Vercel): junk removal
  quote app. Visitors from the Dallas Home Improvement Facebook ads see "In partnership with Dallas Home
  Improvement" on its start page.
- **CleanCompare** (`luckygreer88-ctrl/cleancompare`, hosted on Vercel): carpet cleaning deals site for
  Facebook traffic.
