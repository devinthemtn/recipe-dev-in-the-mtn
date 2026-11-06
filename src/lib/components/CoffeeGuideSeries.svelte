<script>
	import { resolve } from '$app/paths';

	/** @type {{ name: string, current: string, guides: Array<{ slug: string } & Record<string, any>> }} */
	let { name, current, guides } = $props();
</script>

<nav
	aria-label="{name} series"
	class="mt-12 max-w-3xl rounded-lg border border-stone-200 p-5 dark:border-stone-800 print:hidden"
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
