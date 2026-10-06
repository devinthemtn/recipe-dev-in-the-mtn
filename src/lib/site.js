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
 * domain ("koefod.us") as well as a full origin. Returns undefined when unset.
 * @param {string | undefined} url
 */
export function normalizeOrigin(url) {
	const trimmed = url?.trim().replace(/\/+$/, '');
	if (!trimmed) return undefined;
	return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** The public origin from PUBLIC_SITE_URL, e.g. "https://koefod.us". */
export function siteOrigin() {
	return normalizeOrigin(env.PUBLIC_SITE_URL);
}
