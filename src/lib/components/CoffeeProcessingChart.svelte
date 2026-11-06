<script>
	// A comparison of the common coffee processing methods, roughly from the
	// cleanest-tasting to the most experimental. Shown as a table on wider screens
	// and as stacked cards on phones. Flavor notes are tendencies, not rules:
	// the farm, variety and roast all pull the cup around too.
	const methods = [
		{
			name: 'Washed',
			aka: 'Wet process',
			how: 'The fruit is stripped off the seed right after picking. The beans soak in water tanks to loosen the sticky layer, then get rinsed and dried.',
			flavor: ['Clean and bright', 'Crisp acidity', 'Tastes most like the farm and variety'],
			label: 'Washed, fully washed, wet process',
			accent: 'border-l-sky-500',
			dot: 'bg-sky-500'
		},
		{
			name: 'Honey',
			aka: 'Pulped natural',
			how: 'The skin comes off, but some or all of the sticky fruit layer (mucilage) stays on while the beans dry. Lighter grades (white, yellow) keep less of it; black honey keeps the most.',
			flavor: ['Sweet', 'Rounded body', 'Gentle fruit'],
			label: 'Honey, white / yellow / red / black honey, pulped natural',
			accent: 'border-l-amber-500',
			dot: 'bg-amber-500'
		},
		{
			name: 'Natural',
			aka: 'Dry process',
			how: 'The whole cherry dries in the sun, fruit and all, for a few weeks before the dried fruit is milled off.',
			flavor: ['Fruity, often berry', 'Sweet', 'Heavier body'],
			label: 'Natural, dry process, sun-dried',
			accent: 'border-l-rose-500',
			dot: 'bg-rose-500'
		},
		{
			name: 'Wet-hulled',
			aka: 'Giling basah',
			how: 'Used mostly in Indonesia. The beans are hulled while still damp and then finish drying with no parchment layer to protect them.',
			flavor: ['Earthy, herbal, cedar', 'Heavy body', 'Low acidity'],
			label: 'Wet-hulled, giling basah, often Sumatra',
			accent: 'border-l-lime-600',
			dot: 'bg-lime-600'
		},
		{
			name: 'Anaerobic',
			aka: 'Incl. carbonic maceration',
			how: 'Cherries or beans ferment in sealed tanks with no oxygen, sometimes flushed with CO₂ (carbonic maceration, borrowed from winemaking), before drying.',
			flavor: ['Intense, boozy fruit', 'Wine-like or funky', 'Big aroma'],
			label: 'Anaerobic, carbonic maceration, extended fermentation',
			accent: 'border-l-violet-500',
			dot: 'bg-violet-500'
		},
		{
			name: 'Co-fermented',
			aka: 'Infused',
			how: 'Fruit, spices or other ingredients go into the fermentation tank with the coffee, so their flavors carry into the beans.',
			flavor: ['Loud, specific flavors', 'Can taste like candy or fruit juice', 'Divisive'],
			label: 'Co-ferment, co-fermented with…, infused',
			accent: 'border-l-fuchsia-500',
			dot: 'bg-fuchsia-500'
		}
	];
</script>

<figure class="not-prose my-8">
	<!-- Wider screens: a table -->
	<div
		class="hidden overflow-hidden rounded-lg border border-stone-200 md:block dark:border-stone-800"
	>
		<table class="w-full text-left text-sm">
			<thead class="bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-300">
				<tr>
					<th scope="col" class="w-36 px-4 py-3 font-semibold">Method</th>
					<th scope="col" class="px-4 py-3 font-semibold">What happens</th>
					<th scope="col" class="w-52 px-4 py-3 font-semibold">Typical flavor</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-stone-200 dark:divide-stone-800">
				{#each methods as method (method.name)}
					<tr class="align-top">
						<th scope="row" class="border-l-4 px-4 py-4 font-normal {method.accent}">
							<span class="block font-semibold text-stone-900 dark:text-stone-100"
								>{method.name}</span
							>
							<span class="block text-xs text-stone-500">{method.aka}</span>
						</th>
						<td class="px-4 py-4 text-stone-700 dark:text-stone-300">
							{method.how}
							<span class="mt-2 block text-xs text-stone-500"
								>On the bag: <em>{method.label}</em></span
							>
						</td>
						<td class="px-4 py-4">
							<ul class="space-y-1 text-stone-700 dark:text-stone-300">
								{#each method.flavor as note (note)}
									<li class="flex gap-2">
										<span class="mt-1.5 size-1.5 shrink-0 rounded-full {method.dot}"></span>{note}
									</li>
								{/each}
							</ul>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Phones: stacked cards -->
	<div class="flex flex-col gap-3 md:hidden">
		{#each methods as method (method.name)}
			<div
				class="rounded-lg border border-l-4 border-stone-200 p-4 dark:border-stone-800 {method.accent}"
			>
				<p class="font-semibold text-stone-900 dark:text-stone-100">
					{method.name} <span class="text-xs font-normal text-stone-500">· {method.aka}</span>
				</p>
				<p class="mt-2 text-sm text-stone-700 dark:text-stone-300">{method.how}</p>
				<ul class="mt-3 flex flex-wrap gap-2">
					{#each method.flavor as note (note)}
						<li
							class="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300"
						>
							{note}
						</li>
					{/each}
				</ul>
				<p class="mt-3 text-xs text-stone-500">On the bag: <em>{method.label}</em></p>
			</div>
		{/each}
	</div>

	<figcaption class="mt-3 text-xs text-stone-500">
		Listed roughly from the cleanest-tasting to the most experimental. These are tendencies, not
		rules. The farm, the variety and the roast all change the cup too.
	</figcaption>
</figure>
