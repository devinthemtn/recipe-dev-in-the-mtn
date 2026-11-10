<script>
	// When whole beans tend to taste best, in days after the roast date, for
	// different uses. Each row is split into phases: resting (too fresh, still
	// giving off a lot of CO₂), peak, still good, and fading. These are rough
	// windows; the coffee, the roast and how it's stored all move them around.
	const maxDay = 42;

	const phases = {
		rest: { name: 'Resting', class: 'bg-stone-300 dark:bg-stone-700' },
		peak: { name: 'Peak', class: 'bg-amber-600 dark:bg-amber-500' },
		good: { name: 'Still good', class: 'bg-amber-300 dark:bg-amber-800' },
		fade: { name: 'Fading', class: 'bg-stone-200 dark:bg-stone-800' }
	};

	const rows = [
		{
			name: 'Filter, medium & dark',
			spans: [
				{ phase: 'rest', to: 3 },
				{ phase: 'peak', to: 14 },
				{ phase: 'good', to: 28 },
				{ phase: 'fade', to: maxDay }
			]
		},
		{
			name: 'Filter, light roast',
			spans: [
				{ phase: 'rest', to: 7 },
				{ phase: 'peak', to: 21 },
				{ phase: 'good', to: 35 },
				{ phase: 'fade', to: maxDay }
			]
		},
		{
			name: 'Espresso',
			spans: [
				{ phase: 'rest', to: 7 },
				{ phase: 'peak', to: 21 },
				{ phase: 'good', to: 30 },
				{ phase: 'fade', to: maxDay }
			]
		}
	];

	const ticks = [0, 7, 14, 21, 28, 35, 42];

	/** @param {Array<{ phase: string, to: number }>} spans */
	const withStart = (spans) =>
		spans.map((span, i) => ({ ...span, from: i === 0 ? 0 : spans[i - 1].to }));
</script>

<figure class="not-prose my-8">
	<div class="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
		<ul class="space-y-4">
			{#each rows as row (row.name)}
				<li>
					<p class="text-sm font-semibold text-stone-900 dark:text-stone-100">{row.name}</p>
					<div class="mt-1 flex h-4 overflow-hidden rounded-full">
						{#each withStart(row.spans) as span (span.phase)}
							<span
								class={phases[/** @type {keyof typeof phases} */ (span.phase)].class}
								style="width: {((span.to - span.from) / maxDay) * 100}%"
								title="{phases[/** @type {keyof typeof phases} */ (span.phase)]
									.name}: day {span.from}–{span.to}"
							></span>
						{/each}
					</div>
				</li>
			{/each}
		</ul>
		<div class="relative mt-2 h-4 text-xs text-stone-500" aria-hidden="true">
			{#each ticks as tick (tick)}
				<span
					class="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
					style="left: {(tick / maxDay) * 100}%">{tick === maxDay ? '6 wk+' : tick}</span
				>
			{/each}
		</div>
		<p class="mt-1 text-center text-xs text-stone-500">Days after the roast date</p>
		<ul class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-600 dark:text-stone-400">
			{#each Object.values(phases) as phase (phase.name)}
				<li class="flex items-center gap-1.5">
					<span class="size-3 rounded-sm {phase.class}"></span>{phase.name}
				</li>
			{/each}
		</ul>
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		Rough windows for whole beans in a sealed bag. Ground coffee fades in days, not weeks. Freezing
		pauses the clock.
	</figcaption>
</figure>
