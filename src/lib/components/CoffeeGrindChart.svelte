<script>
	// Grind size by brew method, from finest to coarsest. Each method gets a
	// range on a 1–10 scale (1 = powder, 10 = coarse sea salt) so the overlap
	// between methods shows. The scale is for comparison only: grinder dial
	// numbers aren't standard and don't line up with it.
	const methods = [
		{ name: 'Turkish', from: 1, to: 1.5, feel: 'Flour, powder' },
		{ name: 'Espresso', from: 1.5, to: 3, feel: 'Fine, a bit like powdered sugar' },
		{ name: 'AeroPress', from: 2.5, to: 5.5, feel: 'Fine to medium, depends on steep time' },
		{ name: 'V60 / pour-over', from: 4, to: 6, feel: 'Medium-fine, like table salt' },
		{ name: 'Drip machine', from: 5, to: 6.5, feel: 'Medium, like sand' },
		{ name: 'Chemex', from: 6, to: 7.5, feel: 'Medium-coarse' },
		{ name: 'French press', from: 7.5, to: 9, feel: 'Coarse, like kosher salt' },
		{ name: 'Cold brew', from: 8.5, to: 10, feel: 'Coarse to extra coarse' }
	];

	const pct = (/** @type {number} */ n) => ((n - 1) / 9) * 100;
</script>

<figure class="not-prose my-8">
	<div class="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
		<div class="mb-3 flex justify-between text-xs text-stone-500 sm:ml-36">
			<span>Fine</span>
			<span>Medium</span>
			<span>Coarse</span>
		</div>
		<ul class="space-y-3">
			{#each methods as method (method.name)}
				<li class="sm:flex sm:items-center sm:gap-4">
					<p class="text-sm font-semibold text-stone-900 sm:w-32 sm:shrink-0 dark:text-stone-100">
						{method.name}
					</p>
					<div class="mt-1 flex-1 sm:mt-0">
						<div class="relative h-3 rounded-full bg-stone-100 dark:bg-stone-800">
							<span
								class="absolute inset-y-0 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-500 dark:to-amber-700"
								style="left: {pct(method.from)}%; width: {Math.max(
									pct(method.to) - pct(method.from),
									3
								)}%"
							></span>
						</div>
						<p class="mt-1 text-xs text-stone-500">{method.feel}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		Rough ranges to start from. Every grinder's numbers are different, so use this to know which
		direction to go, then adjust by taste.
	</figcaption>
</figure>
