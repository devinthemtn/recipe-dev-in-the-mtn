<script>
	/** @type {{ nutrition: Record<string, string | number>, servings?: number }} */
	let { nutrition, servings } = $props();

	const labels = {
		calories: 'Calories',
		protein: 'Protein',
		carbs: 'Carbs',
		fat: 'Fat',
		fiber: 'Fiber',
		sugar: 'Sugar',
		sodium: 'Sodium'
	};
</script>

<!-- self-start: as a grid item it would otherwise stretch to the article's full height. -->
<aside class="print-keep card self-start bg-card/85 p-4 dark:bg-card-dark/85 print:bg-white">
	<h2 class="text-sm font-semibold tracking-wide text-stone-900 uppercase dark:text-stone-100">
		Nutrition
	</h2>
	{#if servings}
		<p class="mt-1 text-xs text-stone-500">Per serving &middot; {servings} servings total</p>
	{/if}
	<dl class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
		{#each Object.entries(labels) as [key, label] (key)}
			{#if nutrition?.[key] !== undefined}
				<div
					class="flex items-baseline justify-between border-b border-edge pb-1 dark:border-edge-dark"
				>
					<dt class="text-stone-600 dark:text-stone-400">{label}</dt>
					<dd class="font-medium text-stone-900 dark:text-stone-100">{nutrition[key]}</dd>
				</div>
			{/if}
		{/each}
	</dl>
</aside>
