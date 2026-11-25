<script>
	import { resolve } from '$app/paths';

	/** @type {{ name: string, current: string, guides: Array<{ slug: string } & Record<string, any>> }} */
	let { name, current, guides } = $props();

	const index = $derived(guides.findIndex((g) => g.slug === current));
	const prev = $derived(index > 0 ? guides[index - 1] : null);
	const next = $derived(index >= 0 && index < guides.length - 1 ? guides[index + 1] : null);

	/** @param {Record<string, any>} guide */
	const partLabel = (guide) => (guide.part ? `Part ${guide.part}` : 'Overview');
</script>

{#if prev || next}
	<nav
		aria-label="Previous and next in {name}"
		class="mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 print:hidden"
	>
		{#if prev}
			<a
				href={resolve('/coffee/guides/[slug]', { slug: prev.slug })}
				rel="prev"
				class="rounded-lg border border-stone-200 p-4 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
			>
				<span class="text-xs text-stone-500">&larr; Previous · {partLabel(prev)}</span>
				<span class="mt-1 block font-medium text-stone-900 dark:text-stone-100">{prev.title}</span>
			</a>
		{/if}
		{#if next}
			<a
				href={resolve('/coffee/guides/[slug]', { slug: next.slug })}
				rel="next"
				class="rounded-lg border border-stone-200 p-4 text-right hover:border-stone-400 sm:col-start-2 dark:border-stone-800 dark:hover:border-stone-600"
			>
				<span class="text-xs text-stone-500">Next · {partLabel(next)} &rarr;</span>
				<span class="mt-1 block font-medium text-stone-900 dark:text-stone-100">{next.title}</span>
			</a>
		{/if}
	</nav>
{/if}

<nav
	aria-label="{name} series"
	class="mt-6 max-w-3xl rounded-lg border border-stone-200 p-5 dark:border-stone-800 print:hidden"
>
	<p class="text-xs font-semibold tracking-wide text-stone-500 uppercase">More in this series</p>
	<p class="mt-1 font-semibold text-stone-900 dark:text-stone-100">{name}</p>
	<ol class="mt-4 space-y-2 text-sm">
		{#each guides as guide (guide.slug)}
			<li class="flex gap-3">
				<span class="w-14 shrink-0 text-stone-500"
					>{guide.part ? `Part ${guide.part}` : 'Overview'}</span
				>
				{#if guide.slug === current}
					<span aria-current="page" class="font-medium text-stone-900 dark:text-stone-100"
						>{guide.title} <span class="font-normal text-stone-500">(you're here)</span></span
					>
				{:else}
					<a
						href={resolve('/coffee/guides/[slug]', { slug: guide.slug })}
						class="text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-900 dark:text-stone-300 dark:decoration-stone-600 dark:hover:text-stone-100"
						>{guide.title}</a
					>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
