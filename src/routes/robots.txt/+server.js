import { siteOrigin } from '$lib/site.js';

// Written to build/robots.txt at build time, pointing crawlers at the sitemap.
export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	const origin = siteOrigin();
	const lines = ['# Allow crawling everything by default', 'User-agent: *', 'Disallow:'];
	// The Sitemap line has to be an absolute URL, so it's left out without a site URL.
	if (origin) lines.push('', `Sitemap: ${origin}/sitemap.xml`);

	return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain' } });
}
