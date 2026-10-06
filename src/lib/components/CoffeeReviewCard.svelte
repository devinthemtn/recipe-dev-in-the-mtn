<script>
	import { resolve } from '$app/paths';

	/** @type {{ review: { slug: string } & Record<string, any> }} */
	let { review } = $props();
</script>

<a
	href={resolve('/coffee/reviews/[slug]', { slug: review.slug })}
	class="block rounded-lg border border-stone-200 p-5 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
>
	<div class="flex items-baseline justify-between gap-4">
		<h3 class="font-semibold text-stone-900 dark:text-stone-100">{review.title}</h3>
		{#if review.rating !== undefined}
			<span class="shrink-0 text-sm font-semibold text-stone-700 dark:text-stone-300"
				>{review.rating} / 5</span
			>
		{/if}
	</div>
	{#if review.roaster || review.origin}
		<p class="mt-1 text-xs text-stone-500">
			{[review.roaster, review.origin].filter(Boolean).join(' · ')}
		</p>
	{/if}
	<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{review.description}</p>
	<div class="mt-3 flex flex-wrap gap-2">
		{#each review.tags ?? [] as tag (tag)}
			<span
				class="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300"
				>{tag}</span
			>
		{/each}
	</div>
</a>
