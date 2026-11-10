<script>
	// Typical total carbs in unsweetened milks and creamers, per cup (240 ml).
	// The splash view divides by 8 (2 tablespoons). These are typical label values
	// and vary by brand, so the chart is a guide, not a nutrition label.
	// No almond-based options, on purpose.
	const milks = [
		{ name: 'Pea milk, unsweetened', perCup: 0, range: '0–1 g', kind: 'plant' },
		{ name: 'Coconut milk (carton), unsweetened', perCup: 1.5, range: '1–2 g', kind: 'plant' },
		{ name: 'Soy milk, unsweetened', perCup: 3.5, range: '3–4 g', kind: 'plant' },
		{ name: 'Ultra-filtered milk', perCup: 6, range: '~6 g', kind: 'dairy' },
		{ name: 'Heavy cream', perCup: 6.5, range: '~6–7 g', kind: 'dairy' },
		{ name: 'Half-and-half', perCup: 10, range: '~10 g', kind: 'dairy' },
		{ name: 'Milk (whole, 2% or skim)', perCup: 12, range: '~12 g', kind: 'dairy' },
		{ name: 'Lactose-free milk', perCup: 12.5, range: '12–13 g', kind: 'dairy' },
		{ name: 'Oat milk, "no added sugar"', perCup: 16, range: '12–17 g', kind: 'plant' }
	];

	const views = [
		{ id: 'splash', label: 'A splash (2 tbsp)', divide: 8 },
		{ id: 'cup', label: 'A latte (1 cup)', divide: 1 }
	];

	let view = $state('splash');

	const divide = $derived(views.find((v) => v.id === view)?.divide ?? 1);
	const max = 16;

	/** @param {number} perCup */
	const amount = (perCup) => {
		const g = perCup / divide;
		return g === 0 ? '0 g' : g < 0.5 ? '<0.5 g' : `${Math.round(g * 10) / 10} g`;
	};
</script>

<figure class="not-prose my-8">
	<div class="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<p class="font-semibold text-stone-900 dark:text-stone-100">Carbs per serving</p>
			<div class="flex gap-1" role="group" aria-label="Serving size">
				{#each views as v (v.id)}
					<button
						type="button"
						onclick={() => (view = v.id)}
						aria-pressed={view === v.id}
						class="rounded-md border px-3 py-1 text-sm {view === v.id
							? 'border-stone-800 bg-stone-800 text-white dark:border-stone-200 dark:bg-stone-200 dark:text-stone-900'
							: 'border-stone-300 text-stone-700 dark:border-stone-700 dark:text-stone-300'}"
						>{v.label}</button
					>
				{/each}
			</div>
		</div>

		<ul class="mt-4 space-y-3">
			{#each milks as milk (milk.name)}
				<li>
					<div class="flex items-baseline justify-between gap-3 text-sm">
						<span class="text-stone-800 dark:text-stone-200">{milk.name}</span>
						<span class="shrink-0 font-semibold text-stone-900 tabular-nums dark:text-stone-100"
							>{amount(milk.perCup)}</span
						>
					</div>
					<div class="mt-1 h-2 rounded-full bg-stone-100 dark:bg-stone-800">
						<span
							class="block h-2 rounded-full {milk.kind === 'dairy'
								? 'bg-sky-600 dark:bg-sky-400'
								: 'bg-lime-600 dark:bg-lime-400'}"
							style="width: {Math.max((milk.perCup / max) * 100, milk.perCup ? 2 : 0)}%"
						></span>
					</div>
				</li>
			{/each}
		</ul>

		<ul class="mt-4 flex gap-4 text-xs text-stone-600 dark:text-stone-400">
			<li class="flex items-center gap-1.5">
				<span class="size-3 rounded-sm bg-sky-600 dark:bg-sky-400"></span>Dairy
			</li>
			<li class="flex items-center gap-1.5">
				<span class="size-3 rounded-sm bg-lime-600 dark:bg-lime-400"></span>Plant-based
			</li>
		</ul>
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		Typical total carbs for unsweetened versions. Brands vary, especially oat milk and "barista"
		blends, so check the label. The bars use the same scale in both views.
		{#if view === 'cup'}Nobody drinks a cup of heavy cream, but it's here for comparison.{/if}
	</figcaption>
</figure>
