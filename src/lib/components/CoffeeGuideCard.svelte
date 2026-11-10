<script>
	import DraftBadge from '$lib/components/DraftBadge.svelte';
	import { resolve } from '$app/paths';

	/** @type {{ guide: { slug: string } & Record<string, any> }} */
	let { guide } = $props();
</script>

<a
	href={resolve('/coffee/guides/[slug]', { slug: guide.slug })}
	class="block rounded-lg border border-stone-200 p-5 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
>
	{#if guide.series}
		<p class="mb-1 text-xs font-medium text-stone-500">
			{guide.part ? `Part ${guide.part} · ${guide.series}` : `${guide.series} · Overview`}
		</p>
	{/if}
	<h3 class="font-semibold text-stone-900 dark:text-stone-100">
		{guide.title}<DraftBadge draft={guide.draft} />
	</h3>
	<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{guide.description}</p>
	<div class="mt-3 flex flex-wrap gap-2">
		{#each guide.tags ?? [] as tag (tag)}
			<span
				class="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300"
				>{tag}</span
			>
		{/each}
	</div>
</a>
