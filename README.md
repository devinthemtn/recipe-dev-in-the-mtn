# Mountain Kitchen

A small recipe and blog site — recipes and notes from a mountain-valley kitchen, built with SvelteKit as a fully static, prerendered site.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5, runes mode) + [Vite](https://vite.dev/)
- [`adapter-static`](https://svelte.dev/docs/kit/adapter-static) — no server at runtime, the whole site is prerendered to plain HTML/CSS/JS
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [mdsvex](https://mdsvex.pngwn.io/) — recipes and blog posts are authored as markdown (`.svx`) with frontmatter
- [Storybook](https://storybook.js.org/) for component development
- pnpm as the package manager

## Developing

Install dependencies, then start the dev server:

```sh
pnpm install
pnpm dev

# or start the server and open it in a new browser tab
pnpm dev -- --open
```

## Building

```sh
pnpm build
```

Output goes to `build/` as a plain static site — preview it locally with `pnpm preview`. Deploy `build/` to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Content

Recipes and blog posts live as markdown files with YAML frontmatter — there's no CMS or database.

- **Recipes**: `src/lib/content/recipes/*.svx`. Copy `src/lib/content/RECIPE_TEMPLATE.svx` into that folder, rename it to a lowercase-hyphenated slug (e.g. `garlic-roasted-potatoes.svx` → `/recipes/garlic-roasted-potatoes`), and fill in the frontmatter (title, description, tags, times, servings, optional nutrition) plus an `## Ingredients` and `## Instructions` section.
- **Blog posts**: `src/lib/content/blog/*.svx`, same pattern.

Recipe/blog metadata is read via `src/lib/content/recipes.js` and `blog.js` using `import.meta.glob`, so a new `.svx` file is picked up automatically — no registry to update.

## Sitemap and robots.txt

`build/sitemap.xml` and `build/robots.txt` are generated on every build by `src/routes/sitemap.xml/+server.js` and `src/routes/robots.txt/+server.js`. The sitemap lists the home page, each section index, and every non-draft recipe, blog post, ingredient and product, using each item's `date` as `lastmod`. Both need `PUBLIC_SITE_URL` set: without it the sitemap is empty and robots.txt has no `Sitemap:` line. Submit `https://<your domain>/sitemap.xml` in Google Search Console.

## Recipe structured data

Each recipe page includes schema.org `Recipe` JSON-LD (built in `src/lib/content/recipeSchema.js`) so Google can show it as a rich result. Times, servings, nutrition and tags come from the frontmatter. Ingredients and steps are parsed from the `## Ingredients` and `## Instructions` sections, so keep those headings when writing new recipes. `### ` subheadings under Instructions become named sections.

- Set `PUBLIC_SITE_URL` (e.g. `example.com`; `https://` is assumed) in `.env` or as a build-time variable so URLs in the schema are absolute. Changing domains only needs this value updated and a rebuild.
- Add an `image:` field to a recipe's frontmatter (a path under `static/`, or a full URL). Google requires an image before it will show a recipe rich result.
- Times like "20 min + chilling" or "overnight" are left out of the schema because they can't be stated exactly.

Check a page with Google's [Rich Results Test](https://search.google.com/test/rich-results).

## Other useful commands

```sh
pnpm check        # svelte-check type/diagnostics
pnpm lint         # prettier --check + eslint
pnpm format       # prettier --write
pnpm storybook    # component explorer at :6006
```

## Google Analytics

Copy `.env.example` to `.env` and set `PUBLIC_GA_MEASUREMENT_ID` to your GA4 Measurement ID (e.g. `G-XXXXXXXXXX`), then rebuild. Leaving it blank disables analytics.

On a hosting platform (Netlify, Vercel, etc.), set `PUBLIC_GA_MEASUREMENT_ID` as a build-time environment variable instead of committing a `.env` file — it gets baked into the static build.

Page views after the first load are tracked by GA4's enhanced measurement, not by the site's code. In the GA admin, under Data streams → your web stream → Enhanced measurement → Page views, leave "Page changes based on browser history events" turned on (it's on by default). If it's off, only the first page of each visit gets counted.
