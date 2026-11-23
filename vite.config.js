/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
const dirname = import.meta.dirname;

// Content dated after this day is scheduled and stays hidden (see src/lib/content/drafts.js).
// It's fixed when the build starts, rather than read from the visitor's clock, so the
// lists in the browser always match the pages that were actually built. A scheduled
// entry goes live on the first build on or after its date.
// The date is taken in this time zone, so a build server running on UTC
// doesn't publish things early in the evening the day before.
const SITE_TIME_ZONE = 'America/Denver';
const buildDate = new Intl.DateTimeFormat('en-CA', {
	timeZone: SITE_TIME_ZONE,
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
}).format(new Date()); // "YYYY-MM-DD"

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	define: {
		__BUILD_DATE__: JSON.stringify(buildDate)
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Recipe and blog content is authored as markdown (.svx) with mdsvex.
			extensions: ['.svelte', '.svx'],
			preprocess: [
				mdsvex({
					extensions: ['.svx'],
					// Recipe/blog links are always references out to other sites, so open them
					// in a new tab instead of navigating away from the reader's place here.
					rehypePlugins: [
						[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
					]
				})
			],
			// This is a fully static, prerendered site (see src/routes/+layout.js),
			// so adapter-static can output plain HTML/CSS/JS with no server runtime.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false
			}),
			prerender: {
				// The newsletter pages are only linked when a newsletter is configured,
				// and /newsletter/thanks/ is only reached from the provider's redirect,
				// so list them here to always build them.
				entries: ['*', '/newsletter/', '/newsletter/thanks/'],
				// The coffee section isn't linked from anywhere until it launches (see
				// `showCoffee` in src/lib/site.js), and has no reviews or products yet, so the crawler
				// never reaches its routes. That's expected; fail the build only for any
				// other route that wasn't reached.
				handleUnseenRoutes: ({ routes, message }) => {
					if (routes.some((id) => !id.startsWith('/coffee'))) throw new Error(message);
				},
				// Until then, the coffee pages answer 404 in production builds (see
				// src/routes/coffee/+layout.js), and pages that 404 aren't written to build/.
				// That's how the section stays out, so don't fail the build over it.
				handleHttpError: ({ status, path, message }) => {
					if (status === 404 && path.startsWith('/coffee')) return;
					throw new Error(message);
				}
			},
			// Installed copies of the app can stay open for days, so check for a new deploy
			// every 3 hours. When one is found, the next link clicked does a full page load
			// onto the new version (and the browser picks up the new service worker).
			version: {
				pollInterval: 3 * 60 * 60 * 1000
			}
		})
	],
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook')
					})
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: 'chromium'
							}
						]
					}
				}
			}
		]
	}
});
