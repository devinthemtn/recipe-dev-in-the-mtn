import { env } from '$env/dynamic/public';

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
