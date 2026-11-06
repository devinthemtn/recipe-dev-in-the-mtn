<script>
	// How the cup tends to shift from light to dark roast. Each trait is a rough
	// 1–5 scale, meant to show the direction of change rather than measure anything.
	const traits = ['Acidity', 'Origin character', 'Body', 'Roasty bitterness'];

	const roasts = [
		{
			name: 'Light',
			swatch: 'bg-amber-600',
			tastes: 'Bright, fruity or floral, tea-like',
			scores: [5, 5, 2, 1]
		},
		{
			name: 'Medium',
			swatch: 'bg-amber-800',
			tastes: 'Balanced, caramel, nutty, chocolate',
			scores: [3, 3, 4, 2]
		},
		{
			name: 'Dark',
			swatch: 'bg-stone-800 dark:bg-stone-950',
			tastes: 'Smoky, bittersweet, toasty',
			scores: [1, 1, 4, 5]
		}
	];
</script>

<figure class="not-prose my-8">
	<div class="grid gap-3 sm:grid-cols-3">
		{#each roasts as roast (roast.name)}
			<div class="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
				<div class="flex items-center gap-3">
					<span
						class="size-6 shrink-0 rounded-full ring-1 ring-stone-300 dark:ring-stone-700 {roast.swatch}"
						aria-hidden="true"
					></span>
					<p class="font-semibold text-stone-900 dark:text-stone-100">{roast.name} roast</p>
				</div>
				<p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{roast.tastes}</p>
				<dl class="mt-4 space-y-2">
					{#each traits as trait, i (trait)}
						<div>
							<dt class="text-xs text-stone-500">{trait}</dt>
							<dd class="mt-1 flex gap-1" aria-label="{roast.scores[i]} out of 5">
								{#each [1, 2, 3, 4, 5] as step (step)}
									<span
										class="h-1.5 flex-1 rounded-full {step <= roast.scores[i]
											? 'bg-stone-700 dark:bg-stone-300'
											: 'bg-stone-200 dark:bg-stone-800'}"
									></span>
								{/each}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
		{/each}
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		Rough tendencies, not measurements. Roasters don't agree on where "light" ends and "medium"
		begins.
	</figcaption>
</figure>
