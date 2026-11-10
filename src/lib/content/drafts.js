// Entries with `draft: true` in their frontmatter are hidden everywhere by default.
// To preview them locally, start the dev server with the flag set:
//
//   pnpm dev:drafts   (same as: VITE_SHOW_DRAFTS=true pnpm dev)
//
// Production builds never show drafts, whatever the flag says.
export const showDrafts = import.meta.env.DEV && import.meta.env.VITE_SHOW_DRAFTS === 'true';

/** @param {{ draft?: boolean } | undefined} meta */
export const isVisible = (meta) => showDrafts || !meta?.draft;
