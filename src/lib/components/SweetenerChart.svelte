<script>
	// Glycemic index (glucose = 100) and calories per gram for sweeteners and the
	// bulking agents they're commonly mixed with. GI values are typical published
	// figures and vary between studies, so `gi` is a representative value and
	// `giRange` is what's shown. Calories are US label values (FDA).
	const sweeteners = [
		{ name: 'Maltodextrin (packet filler)', gi: 95, giRange: '85–110', kcal: 4, kind: 'sugar' },
		{ name: 'Dextrose (packet filler)', gi: 100, giRange: '100', kcal: 4, kind: 'sugar' },
		{ name: 'Table sugar', gi: 65, giRange: '~65', kcal: 4, kind: 'sugar' },
		{ name: 'Maltitol syrup', gi: 50, giRange: '~35–53', kcal: 3, kind: 'polyol' },
		{ name: 'Maltitol', gi: 35, giRange: '~35', kcal: 2.1, kind: 'polyol' },
		{ name: 'Xylitol', gi: 12, giRange: '7–13', kcal: 2.4, kind: 'polyol' },
		{ name: 'Sorbitol', gi: 9, giRange: '4–9', kcal: 2.6, kind: 'polyol' },
		{ name: 'Erythritol', gi: 0, giRange: '0', kcal: 0.2, kind: 'polyol' },
		{ name: 'Allulose', gi: 0, giRange: '~0', kcal: 0.4, kind: 'zero' },
		{ name: 'Pure monk fruit or stevia', gi: 0, giRange: '0', kcal: 0, kind: 'zero' }
	];

	const views = [
		{ id: 'gi', label: 'Glycemic index', max: 110 },
		{ id: 'kcal', label: 'Calories per gram', max: 4 }
	];

	const kinds = [
		{ id: 'sugar', label: 'Sugars and starch fillers', bar: 'bg-red-600 dark:bg-red-400' },
		{ id: 'polyol', label: 'Sugar alcohols', bar: 'bg-amber-500 dark:bg-amber-400' },
		{ id: 'zero', label: 'Rare sugar and extracts', bar: 'bg-lime-600 dark:bg-lime-400' }
	];

	let view = $state('gi');

	const max = $derived(views.find((v) => v.id === view)?.max ?? 1);

	/** @param {(typeof sweeteners)[number]} s */
	const value = (s) => (view === 'gi' ? s.gi : s.kcal);

	/** @param {(typeof sweeteners)[number]} s */
	const label = (s) => (view === 'gi' ? s.giRange : `${s.kcal} kcal`);

	/** @param {string} kind */
	const bar = (kind) => kinds.find((k) => k.id === kind)?.bar;
</script>

<figure class="not-prose my-8">
	<div class="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<p class="font-semibold text-stone-900 dark:text-stone-100">
				{view === 'gi' ? 'Glycemic index (glucose = 100)' : 'Calories per gram'}
			</p>
			<div class="flex gap-1" role="group" aria-label="Measure">
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
			{#each sweeteners as s (s.name)}
				<li>
					<div class="flex items-baseline justify-between gap-3 text-sm">
						<span class="text-stone-800 dark:text-stone-200">{s.name}</span>
						<span class="shrink-0 font-semibold text-stone-900 tabular-nums dark:text-stone-100"
							>{label(s)}</span
						>
					</div>
					<div class="mt-1 h-2 rounded-full bg-stone-100 dark:bg-stone-800">
						<span
							class="block h-2 rounded-full {bar(s.kind)}"
							style="width: {Math.min((value(s) / max) * 100, 100)}%"
						></span>
					</div>
				</li>
			{/each}
		</ul>

		<ul class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-600 dark:text-stone-400">
			{#each kinds as k (k.id)}
				<li class="flex items-center gap-1.5">
					<span class="size-3 rounded-sm {k.bar}"></span>{k.label}
				</li>
			{/each}
		</ul>
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		{#if view === 'gi'}
			Typical published values. Glycemic index varies between studies, especially for maltodextrin
			and maltitol syrup, so treat these as a guide. A bar with no length means it doesn't raise
			blood sugar in a meaningful way.
		{:else}
			US label values. Erythritol is often labeled 0 calories, and the EU counts most sugar alcohols
			at 2.4 kcal/g.
		{/if}
	</figcaption>
</figure>
