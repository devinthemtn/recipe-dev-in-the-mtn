# Newsletter Signup Plan

Status: built on 2026-10-15 (MailerLite, form on every recipe, lead magnet deferred). Not yet live: needs a MailerLite account and the env vars set. See "Remaining steps" at the bottom. Implements Phase 2 of `MONETIZATION_PLAN.md`.

**How the site works now:** every page is prerendered by adapter-static and there is no server, so the form has to post straight to an email provider. No backend is needed.

## 1. Pick a provider (decision pending)

Each provider gives you a URL that a plain HTML form can POST to, and handles double opt-in, unsubscribes and the email-law details:

- **Kit (ConvertKit):** recommended. It can deliver a lead magnet automatically when someone subscribes, which fits the "7-Day Diabetic-Friendly Meal Plan" idea, and its free tier is generous.
- **MailerLite:** a good free tier, with landing pages and automations.
- **Buttondown:** the simplest and most developer-friendly, but its free tier is small.

Free-tier limits change often, so check them before you sign up. Turn on double opt-in whichever you choose.

## 2. Config: `PUBLIC_NEWSLETTER_FORM_URL`

Read it through `$env/dynamic/public`, the same way `GoogleAnalytics.svelte` reads its ID. If it's unset, the form doesn't render, so dev and preview builds stay clean. Providers name the email field differently (Kit uses `email_address`, Buttondown uses `email`), so also add a small field-name setting, or hardcode it once a provider is chosen.

## 3. Component: `src/lib/components/NewsletterSignup.svelte`

- A real `<form method="post" action={url}>`, so it works without JavaScript.
- With JavaScript, it submits through `fetch` and shows "Check your inbox to confirm" in place, without sending the reader to another site.
- The email input has a `<label>`, `type="email"`, `required` and `autocomplete="email"`.
- A hidden honeypot field to catch spam bots.
- One line of consent text: "No spam, unsubscribe anytime," with a link to `/legal#privacy`.
- A `variant` prop (`inline` | `card`) and a heading/blurb prop so each placement can have its own wording.
- Stone and dark-mode styles that match the layout, plus `print:hidden` so it doesn't show up when someone prints a recipe.
- A Storybook story covering the default, success and error states.

## 4. Where it goes

- The end of each recipe page (`src/routes/recipes/[slug]/+page.svelte`). This is the spot most likely to get signups.
- The end of each blog post (`src/routes/blog/[slug]/+page.svelte`).
- The home page (`src/routes/+page.svelte`).
- A new page at `/newsletter` to use as the landing page for the lead magnet and to link from social media. Link it from the footer in `+layout.svelte`, because the prerender crawler fails the build on routes it can't reach. Add it to `sitemap.xml` too.
- A new page at `/newsletter/thanks` that the provider sends people to after they subscribe, for the no-JavaScript path and after confirming. Mark it `noindex`.

## 5. Analytics

When a signup succeeds, send `gtag('event', 'sign_up', { method: 'newsletter' })`, and mark `sign_up` as a key event in GA4.

## 6. Legal page (must ship with the form)

- The privacy section of `src/routes/legal/+page.svelte` currently says the site has no sign-up forms and doesn't collect your email. That will no longer be true, so it has to be rewritten.
- Add an "Email newsletter" subsection covering:
  - what is collected (the email address, plus open and click data if the provider tracks it)
  - which provider processes the data
  - how to unsubscribe
  - how to ask for the data to be deleted
- Change the `updated` date.
- US anti-spam law (CAN-SPAM) requires a physical mailing address in every email. The provider will ask for one, and a P.O. box is fine.

## 7. Testing

- Do one real subscription end to end: confirmation email, then the thank-you page, then the contact shows up in the provider.
- Test the form with JavaScript turned off.
- Run `pnpm build` to confirm prerendering still passes, then `pnpm check` and `pnpm lint`.

## Decisions (2026-10-15)

1. Provider: **MailerLite**, swappable. `PUBLIC_NEWSLETTER_PROVIDER` (`mailerlite` | `kit` | `buttondown`) picks field names and the privacy-policy wording from `src/lib/newsletterProviders.js`. To switch, change the two env vars.
2. Lead magnet: **later.** The form pitches "new recipes by email" for now.
3. Placement: **every recipe page**, plus blog posts, the home page and `/newsletter`.

## What was built

- `src/lib/newsletterProviders.js` holds the provider presets. It doesn't import `$env`, so Storybook can load it.
- `src/lib/newsletter.js` provides `newsletterConfig()`, which reads the env vars and returns undefined when the form is off.
- `src/lib/components/NewsletterSignup.svelte`, plus its stories. It takes a required `config` prop that pages pass in.
  - JavaScript submits use `fetch` with `mode: 'no-cors'`, so the reply can't be read. Any request that reaches the server counts as a success, and the confirmation email is the real check.
  - When the form is off, it renders nothing.
- `/newsletter` and `/newsletter/thanks` (noindex) are always built through `prerender.entries` in `vite.config.js`.
- The footer link and the sitemap entry only appear when the form is on.
- The legal page's privacy section changes to match whether the form is on and which provider is set.

## Remaining steps

- Create a MailerLite account and turn on double opt-in.
  - Set the confirmation redirect to `https://koefod.us/newsletter/thanks/`.
  - Add a mailing address (a P.O. box is fine) for CAN-SPAM.
- Create an embedded form. Copy its `action` URL (`https://assets.mailerlite.com/jsonp/<acct>/forms/<id>/subscribe`) into `PUBLIC_NEWSLETTER_FORM_URL` in the production `.env`.
- Without JavaScript, the form posts straight to MailerLite, and the reader sees MailerLite's raw response rather than a nice page. Check what it actually shows.
- Mark `sign_up` as a key event in GA4.
- Run one real end-to-end subscription test.
