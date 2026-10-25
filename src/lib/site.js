import { env } from '$env/dynamic/public';

/**
 * Whether the coffee section (/coffee) is live. Set this to `dev` to hide it
 * from production builds again — no nav link, no sitemap entries and no pages
 * in build/ — while still showing it under `pnpm dev`.
 */
export const showCoffee = true;

/**
 * Normalises a site URL to an origin with no trailing slash, accepting a bare
 * domain ("mountainkitchen.org") as well as a full origin. Returns undefined when unset.
 * @param {string | undefined} url
 */
export function normalizeOrigin(url) {
	const trimmed = url?.trim().replace(/\/+$/, '');
	if (!trimmed) return undefined;
	return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** The site's permanent public domain, used when PUBLIC_SITE_URL is unset. */
export const DEFAULT_SITE_URL = 'mountainkitchen.org';

/** The public origin, e.g. "https://mountainkitchen.org". PUBLIC_SITE_URL overrides the default. */
export function siteOrigin() {
	return normalizeOrigin(env.PUBLIC_SITE_URL) ?? normalizeOrigin(DEFAULT_SITE_URL);
}
