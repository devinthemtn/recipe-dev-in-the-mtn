import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

/**
 * The coffee section (/coffee) is still being drafted: it shows up under
 * `pnpm dev` but is left out of production builds — no nav link, no sitemap
 * entries and no pages in build/. Set this to `true` to launch it.
 */
export const showCoffee = dev;

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
