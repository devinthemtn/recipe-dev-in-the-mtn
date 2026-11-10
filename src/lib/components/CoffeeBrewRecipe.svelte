<script>
	// A recipe card for a brew method: the key numbers up top, then the steps.
	// Used in the Brew Methods guides, e.g.
	//
	// <CoffeeBrewRecipe
	// 	title="V60"
	// 	specs={[{ label: 'Coffee', value: '20 g' }, { label: 'Water', value: '320 g' }]}
	// 	steps={['Rinse the filter.', 'Bloom with 40 g of water.']}
	// />
	/**
	 * @type {{
	 *   title: string,
	 *   specs: Array<{ label: string, value: string }>,
	 *   steps: string[],
	 *   note?: string
	 * }}
	 */
	let { title, specs, steps, note } = $props();
</script>

<figure class="not-prose my-8 rounded-lg border border-stone-200 dark:border-stone-800">
	<div class="border-b border-stone-200 px-4 py-3 dark:border-stone-800">
		<p class="font-semibold text-stone-900 dark:text-stone-100">{title}</p>
	</div>
	<dl class="grid grid-cols-2 gap-px bg-stone-200 sm:grid-cols-5 dark:bg-stone-800">
		{#each specs as spec (spec.label)}
			<div class="bg-white px-4 py-3 dark:bg-stone-950">
				<dt class="text-xs text-stone-500">{spec.label}</dt>
				<dd class="mt-0.5 text-sm font-semibold text-stone-900 dark:text-stone-100">
					{spec.value}
				</dd>
			</div>
		{/each}
	</dl>
	<ol
		class="list-decimal space-y-2 border-t border-stone-200 py-4 pr-4 pl-9 text-sm text-stone-700 dark:border-stone-800 dark:text-stone-300"
	>
		{#each steps as step, i (i)}
			<li>{step}</li>
		{/each}
	</ol>
	{#if note}
		<figcaption
			class="border-t border-stone-200 px-4 py-3 text-xs text-stone-500 dark:border-stone-800"
		>
			{note}
		</figcaption>
	{/if}
</figure>
