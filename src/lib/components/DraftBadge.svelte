<script>
	// Marks unpublished content. Drafts only render at all when previewing with
	// VITE_SHOW_DRAFTS=true in dev (see $lib/content/drafts.js), so this never
	// shows up on the live site.
	/** @type {{ draft?: boolean }} */
	let { draft = false } = $props();
</script>

{#if draft}
	<span
		class="ml-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 align-middle text-xs font-semibold tracking-wide text-amber-800 uppercase dark:bg-amber-900/40 dark:text-amber-300"
		>Draft</span
	>
{/if}
