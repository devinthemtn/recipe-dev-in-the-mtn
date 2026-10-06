import { getAllPosts } from '$lib/content/blog.js';
import { getAllCoffeeReviews } from '$lib/content/coffee.js';
import { getAllIngredients } from '$lib/content/ingrts.js';
import { getAllProducts } from '$lib/content/prods.js';
import { getAllRecipes } from '$lib/content/recipes.js';
import { showCoffee, siteOrigin } from '$lib/site.js';

// Written to build/sitemap.xml at build time. Every page here is listed from
// the same content loaders the routes use, so new content is picked up
// automatically and drafts stay out.
export const prerender = true;
export const trailingSlash = 'never';

const sections = [
	{ path: '/recipes/', items: getAllRecipes() },
	{ path: '/blog/', items: getAllPosts() },
	{ path: '/ingrts/', items: getAllIngredients() },
	{ path: '/prods/', items: getAllProducts() },
	...(showCoffee ? [{ path: '/coffee/reviews/', items: getAllCoffeeReviews() }] : [])
];

/**
 * Frontmatter dates as YYYY-MM-DD, or undefined if missing or invalid.
 * @param {unknown} date
 */
function day(date) {
	if (!date) return undefined;
	const parsed = new Date(/** @type {string} */ (date));
	return isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

/** @param {Array<string | undefined>} dates */
function newest(dates) {
	return dates.filter(Boolean).sort().pop();
}

/** @param {string} text */
function escapeXml(text) {
	return text.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

export function GET() {
	const origin = siteOrigin();
	/** @type {Array<{ path: string, lastmod?: string }>} */
	const pages = [];

	if (origin) {
		const sectionPages = sections.map(({ path, items }) => {
			const entries = items.map((item) => ({
				path: `${path}${item.slug}/`,
				lastmod: day(item.date)
			}));
			return { index: { path, lastmod: newest(entries.map((e) => e.lastmod)) }, entries };
		});
		pages.push({ path: '/', lastmod: newest(sectionPages.map((s) => s.index.lastmod)) });
		for (const { index, entries } of sectionPages) pages.push(index, ...entries);
		if (showCoffee) pages.push({ path: '/coffee/' }, { path: '/coffee/videos/' });
		pages.push({ path: '/legal/' });
	} else {
		// Sitemap URLs must be absolute, so there's nothing valid to list.
		console.warn('PUBLIC_SITE_URL is not set: writing an empty sitemap.xml.');
	}

	const urls = pages
		.map(
			({ path, lastmod }) =>
				`\t<url>\n\t\t<loc>${escapeXml(origin + path)}</loc>\n` +
				(lastmod ? `\t\t<lastmod>${lastmod}</lastmod>\n` : '') +
				'\t</url>'
		)
		.join('\n');

	const body =
		'<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
		(urls ? `${urls}\n` : '') +
		'</urlset>\n';

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
