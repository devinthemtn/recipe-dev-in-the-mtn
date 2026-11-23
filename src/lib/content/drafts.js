// Entries with `draft: true` in their frontmatter are hidden everywhere by default.
// Entries whose `date` is later than today are scheduled: they stay hidden until
// a build runs on or after that date (see `__BUILD_DATE__` in vite.config.js).
// To preview drafts and scheduled entries locally, start the dev server with the flag set:
//
//   pnpm dev:drafts   (same as: VITE_SHOW_DRAFTS=true pnpm dev)
//
// Production builds never show drafts or scheduled entries, whatever the flag says.
export const showDrafts = import.meta.env.DEV && import.meta.env.VITE_SHOW_DRAFTS === 'true';

/**
 * A frontmatter date as "YYYY-MM-DD", or undefined if it's missing or invalid.
 * Quoted dates stay strings; unquoted YAML dates arrive as Date objects at UTC midnight.
 * @param {unknown} date
 */
function day(date) {
	if (date instanceof Date) return isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
	if (typeof date !== 'string') return undefined;
	const match = date.trim().match(/^\d{4}-\d{2}-\d{2}/);
	if (match) return match[0];
	const parsed = new Date(date);
	return isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

/**
 * Whether an entry's date is later than the build date. Entries with no date
 * are never scheduled.
 * @param {{ date?: unknown } | undefined} meta
 */
export const isScheduled = (meta) => {
	const date = day(meta?.date);
	return date !== undefined && date > __BUILD_DATE__;
};

/** @param {{ draft?: boolean, date?: unknown } | undefined} meta */
export const isVisible = (meta) => showDrafts || (!meta?.draft && !isScheduled(meta));
