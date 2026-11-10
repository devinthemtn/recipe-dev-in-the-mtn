<script>
	// Starting coffee-to-water ratios by brew method, plus a small calculator that
	// turns a ratio and an amount of water into grams of coffee. The ratios are
	// starting points to adjust by taste, not rules.
	const methods = [
		{ name: 'Pour-over', range: '15:1 to 17:1', start: 16, note: 'V60, Kalita, Chemex' },
		{ name: 'Drip machine', range: '15:1 to 17:1', start: 16, note: 'Same as pour-over' },
		{ name: 'French press', range: '12:1 to 15:1', start: 14, note: 'A little stronger' },
		{ name: 'AeroPress', range: '11:1 to 16:1', start: 14, note: 'Varies a lot by recipe' },
		{ name: 'Cold brew', range: '5:1 to 8:1', start: 6, note: 'Concentrate, diluted after' },
		{ name: 'Espresso', range: '1:2 to 1:2.5', start: null, note: 'Weighed by drink, not water' }
	];

	const ratios = [15, 16, 17];

	let water = $state(350);
	let ratio = $state(16);

	const grams = $derived(water > 0 ? Math.round((water / ratio) * 10) / 10 : 0);
</script>

<figure class="not-prose my-8 space-y-4">
	<div class="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
		<p class="font-semibold text-stone-900 dark:text-stone-100">How much coffee?</p>
		<div class="mt-3 flex flex-wrap items-end gap-4">
			<label class="text-sm text-stone-600 dark:text-stone-400">
				Water (grams or ml)
				<input
					type="number"
					min="0"
					step="10"
					bind:value={water}
					class="mt-1 block w-28 rounded-md border border-stone-300 bg-white px-2 py-1 text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
				/>
			</label>
			<div class="text-sm text-stone-600 dark:text-stone-400">
				Ratio
				<div class="mt-1 flex gap-1" role="group" aria-label="Ratio">
					{#each ratios as r (r)}
						<button
							type="button"
							onclick={() => (ratio = r)}
							aria-pressed={ratio === r}
							class="rounded-md border px-3 py-1 {ratio === r
								? 'border-stone-800 bg-stone-800 text-white dark:border-stone-200 dark:bg-stone-200 dark:text-stone-900'
								: 'border-stone-300 text-stone-700 dark:border-stone-700 dark:text-stone-300'}"
							>{r}:1</button
						>
					{/each}
				</div>
			</div>
			<p class="text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
				<span class="block text-2xl font-semibold text-stone-900 dark:text-stone-100"
					>{grams} g</span
				>
				of coffee
			</p>
		</div>
		<p class="mt-3 text-xs text-stone-500">
			Lower numbers make a stronger cup. 15:1 is stronger, 17:1 is lighter.
		</p>
	</div>

	<div class="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-800">
		<table class="w-full text-left text-sm">
			<thead class="bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-300">
				<tr>
					<th scope="col" class="px-4 py-3 font-semibold">Method</th>
					<th scope="col" class="px-4 py-3 font-semibold">Starting ratio</th>
					<th scope="col" class="hidden px-4 py-3 font-semibold sm:table-cell">Notes</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-stone-200 dark:divide-stone-800">
				{#each methods as method (method.name)}
					<tr>
						<th scope="row" class="px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">
							{method.name}
							<span class="block text-xs font-normal text-stone-500 sm:hidden">{method.note}</span>
						</th>
						<td class="px-4 py-3 text-stone-700 dark:text-stone-300">{method.range}</td>
						<td class="hidden px-4 py-3 text-stone-500 sm:table-cell">{method.note}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<figcaption class="text-xs text-stone-500">
		Starting points, not rules. Water is in grams (1 ml of water weighs about 1 g). Espresso is
		written the other way around: grams of coffee to grams of drink in the cup.
	</figcaption>
</figure>
