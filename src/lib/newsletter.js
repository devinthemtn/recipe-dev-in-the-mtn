import { env } from '$env/dynamic/public';
import { providers } from './newsletterProviders.js';

/**
 * The configured newsletter, or undefined when PUBLIC_NEWSLETTER_FORM_URL is
 * unset (or the provider is unknown), in which case no signup form renders.
 */
export function newsletterConfig() {
	const url = env.PUBLIC_NEWSLETTER_FORM_URL?.trim();
	const provider = providers[env.PUBLIC_NEWSLETTER_PROVIDER?.trim().toLowerCase() || 'mailerlite'];
	if (!url || !provider) return undefined;
	return { url, ...provider };
}
