<script>
	// A dial-in cheat sheet: what under-extracted, balanced and over-extracted
	// coffee taste like, and which way to move each variable to fix it.
	const states = [
		{
			name: 'Under-extracted',
			tastes: ['Sour, sharp', 'Thin or watery', 'Salty', 'Finish disappears fast'],
			fix: [
				'Grind finer',
				'Use hotter water',
				'Brew longer',
				'Use a little less water (stronger ratio)'
			],
			accent: 'border-t-lime-500'
		},
		{
			name: 'Balanced',
			tastes: ['Sweet', 'Clear flavors', 'Pleasant acidity', 'Clean, lingering finish'],
			fix: ['Write down what you did', 'Change one thing at a time from here'],
			accent: 'border-t-amber-500'
		},
		{
			name: 'Over-extracted',
			tastes: ['Bitter', 'Dry, chalky (astringent)', 'Hollow or muddy', 'Harsh aftertaste'],
			fix: [
				'Grind coarser',
				'Use cooler water',
				'Brew shorter',
				'Pour more gently, less agitation'
			],
			accent: 'border-t-stone-700 dark:border-t-stone-400'
		}
	];
</script>

<figure class="not-prose my-8">
	<div class="grid gap-3 sm:grid-cols-3">
		{#each states as state (state.name)}
			<div
				class="rounded-lg border border-t-4 border-stone-200 p-4 dark:border-stone-800 {state.accent}"
			>
				<p class="font-semibold text-stone-900 dark:text-stone-100">{state.name}</p>
				<p class="mt-3 text-xs font-semibold tracking-wide text-stone-500 uppercase">Tastes</p>
				<ul class="mt-1 space-y-1 text-sm text-stone-700 dark:text-stone-300">
					{#each state.tastes as note (note)}
						<li>{note}</li>
					{/each}
				</ul>
				<p class="mt-3 text-xs font-semibold tracking-wide text-stone-500 uppercase">Try</p>
				<ul class="mt-1 space-y-1 text-sm text-stone-700 dark:text-stone-300">
					{#each state.fix as step (step)}
						<li>{step}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		Grind size is usually the biggest lever, so start there. If a cup is both sour and bitter, the
		grind is often uneven, or the pour was uneven, rather than too fine or too coarse.
	</figcaption>
</figure>
