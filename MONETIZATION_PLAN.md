# Monetization Plan

## Where the site stands

- **What we have:** 24 recipes, 8 blog posts, 3 ingredient pages and 2 product pages. It's a static SvelteKit site with GA4 already wired up.
- **The niche:** diabetic-friendly cooking, plus Ethiopian staples like teff, injera and berbere, in a mountain-kitchen setting. That's a specific audience with real buying intent.
- **What's missing:** recipes have no Recipe schema (JSON-LD), there's no sitemap, no email signup, and no affiliate links or disclosure. The `prods/` and `ingrts/` pages are already product reviews in all but name.

## Phase 0: Groundwork (now, before any income)

Traffic is what every income source depends on, and the site can't earn much until it has it.

1. **Recipe JSON-LD schema** on every recipe page. The frontmatter already has times, servings and nutrition, so the data is there. This is how recipes get rich results in Google, and it's the most valuable SEO step available.
2. **`sitemap.xml` and `robots.txt`**, prerendered from the existing `import.meta.glob` content. Then submit the sitemap to Google Search Console.
3. **A "Jump to recipe" button and a print-friendly recipe card.** Readers expect them, and ad networks expect them too.
4. **Legal pages:** a privacy policy (needed for GA, ads and affiliates), an affiliate disclosure, and a medical disclaimer. The disclaimer matters because "diabetic" recipes are health content in Google's eyes.
5. **Publishing pace:** aim for 2–3 recipes a week. Lean into the niche overlap, e.g. "low-glycemic Ethiopian" or "teff for diabetics." Big recipe sites can't easily compete there.

## Phase 1: Affiliate links (start right away, works at low traffic)

- Add optional `affiliateUrl` and `retailer` fields to the `prods` and `ingrts` frontmatter, plus a "Where to buy" button component that adds `rel="sponsored nofollow"`.
- Put inline links in recipes for hard-to-find ingredients (teff flour, monk fruit, berbere spices, injera pans/mitad) and for gear (cast iron, glucose meters, kitchen scale).
- Programs to try:
  - **Amazon Associates.** It's easy to get into, but you need 3 sales within 180 days or the account closes.
  - **Direct brand programs,** which often pay better: specialty flour mills, spice companies, and Thrive Market.
- Auto-insert a short FTC disclosure on any page that has affiliate links.
- Leave almond-flour products out of the picks so recommendations stay consistent with the site's own kitchen.

## Phase 2: Email list (start now, pays off later)

- Use a free tier of Kit (ConvertKit), Buttondown or MailerLite. A static site only needs their embed form, no backend.
- Offer a lead magnet such as "7-Day Diabetic-Friendly Meal Plan (PDF)" or "Ethiopian Pantry Starter Guide."
- The list is traffic we own. It also drives repeat visits, which ad networks reward, and it provides buyers for Phase 4.

## Phase 3: Display ads (when traffic qualifies)

- Avoid AdSense early on: it pays very little and makes the site slower.
- Aim for a premium network:
  - **Mediavine Journey:** roughly 10k sessions a month.
  - **Raptive:** roughly 25k pageviews a month.
  - Check their current requirements when getting close.
- Recipe sites are one of the best-paying ad categories, so this is likely to become the largest income source.
- Ads need a consent banner (CMP) for EU and California visitors. The networks usually provide one.

## Phase 4: Our own products (once there's an audience)

- Low-effort digital products: a recipe ebook, printable meal plans, or a "diabetic Ethiopian cookbook." Sell them through Gumroad, Lemon Squeezy or Payhip, which need no backend.
- Later, optionally: a paid membership with ad-free pages and extra meal plans, or sponsored posts from brands already reviewed honestly on the site.

## Suggested order

| When             | Focus                                          | Revenue expectation        |
| ---------------- | ---------------------------------------------- | -------------------------- |
| Month 0–1        | Phase 0 SEO/legal, affiliate setup, email form | ~$0                        |
| Month 1–6        | Publishing pace, affiliate links, list growth  | Small (tens of $/mo)       |
| ~10k sessions/mo | Apply to Mediavine Journey                     | Ads become the main income |
| 1k+ subscribers  | Launch first digital product                   | One-off launches           |

## What to track in GA4

- Sessions
- Top recipes
- Outbound affiliate clicks (to be added as a GA event)
