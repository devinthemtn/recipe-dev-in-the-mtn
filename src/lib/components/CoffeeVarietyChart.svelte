<script>
	// Which arabica varieties are commonly grown in which countries. The countries
	// match CoffeeOriginChart.svelte, so keep the two in step when editing.
	// `main` is where a variety is widely grown or best known; `also` is where you'll
	// still see it on bags, just less often. Generalizations, not a census.
	const regions = [
		{
			name: 'Africa & Arabia',
			color: 'border-t-rose-500',
			countries: ['Ethiopia', 'Kenya', 'Rwanda & Burundi', 'Yemen']
		},
		{
			name: 'Central America & Mexico',
			color: 'border-t-amber-500',
			countries: ['Mexico', 'Guatemala', 'Honduras', 'El Salvador', 'Costa Rica', 'Panama']
		},
		{
			name: 'South America',
			color: 'border-t-lime-600',
			countries: ['Colombia', 'Brazil', 'Peru']
		},
		{
			name: 'Asia & Pacific',
			color: 'border-t-violet-500',
			countries: ['Indonesia', 'India', 'Hawaii']
		}
	];
	const countries = regions.flatMap((r) => r.countries);

	const families = [
		{
			name: 'Ethiopian and Yemeni originals',
			varieties: [
				{ name: 'Ethiopian landraces', main: ['Ethiopia'], also: [] },
				{ name: 'Gesha', main: ['Panama'], also: ['Ethiopia', 'Colombia', 'Costa Rica'] },
				{ name: 'Pink Bourbon', main: ['Colombia'], also: [] },
				{ name: 'Yemeni landraces', main: ['Yemen'], also: [] }
			]
		},
		{
			name: 'Typica and Bourbon',
			varieties: [
				{ name: 'Typica', main: ['Mexico', 'Peru', 'Hawaii'], also: ['Colombia', 'Indonesia'] },
				{ name: 'Maragogipe', main: [], also: ['Mexico', 'Guatemala'] },
				{
					name: 'Bourbon',
					main: ['Rwanda & Burundi', 'El Salvador', 'Guatemala'],
					also: ['Mexico', 'Peru']
				},
				{ name: 'Yellow Bourbon', main: ['Brazil'], also: [] }
			]
		},
		{
			name: "Bourbon's offspring",
			varieties: [
				{
					name: 'Caturra',
					main: ['Colombia', 'Costa Rica', 'Guatemala', 'Peru'],
					also: ['Mexico', 'Honduras', 'Panama']
				},
				{ name: 'Villa Sarchi', main: ['Costa Rica'], also: [] },
				{ name: 'Pacas', main: ['El Salvador', 'Honduras'], also: [] },
				{ name: 'SL28 & SL34', main: ['Kenya'], also: [] }
			]
		},
		{
			name: 'Crosses',
			varieties: [
				{ name: 'Mundo Novo', main: ['Brazil'], also: [] },
				{
					name: 'Catuai',
					main: ['Brazil', 'Honduras', 'Costa Rica', 'Guatemala', 'Panama'],
					also: ['Mexico']
				},
				{ name: 'Pacamara', main: ['El Salvador'], also: ['Guatemala', 'Honduras'] }
			]
		},
		{
			name: 'Bred for disease resistance',
			varieties: [
				{
					name: 'Catimor & Sarchimor types',
					main: ['Honduras', 'Indonesia', 'India', 'Peru'],
					also: ['Mexico', 'Costa Rica']
				},
				{ name: 'Castillo & Colombia', main: ['Colombia'], also: [] },
				{ name: 'Ruiru 11 & Batian', main: ['Kenya'], also: [] },
				{ name: 'S795', main: ['India'], also: ['Indonesia'] }
			]
		}
	];

	/**
	 * @param {{ main: string[], also: string[] }} variety
	 * @param {string} country
	 */
	function level(variety, country) {
		if (variety.main.includes(country)) return 'main';
		if (variety.also.includes(country)) return 'also';
		return null;
	}
</script>

<figure class="not-prose my-8">
	<!-- Wider screens: a variety × country grid -->
	<div class="hidden overflow-x-auto md:block">
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr>
					<td></td>
					{#each regions as region (region.name)}
						<th
							scope="colgroup"
							colspan={region.countries.length}
							class="border-t-4 px-1 pt-1 pb-2 text-center text-[11px] leading-tight font-semibold text-stone-500 {region.color}"
						>
							{region.name}
						</th>
					{/each}
				</tr>
				<tr class="border-b border-stone-200 dark:border-stone-800">
					<td></td>
					{#each countries as country (country)}
						<th scope="col" class="h-32 px-0.5 pb-2 align-bottom font-normal">
							<span
								class="inline-block rotate-180 text-xs whitespace-nowrap text-stone-600 [writing-mode:vertical-rl] dark:text-stone-400"
								>{country}</span
							>
						</th>
					{/each}
				</tr>
			</thead>
			{#each families as family (family.name)}
				<tbody class="border-b border-stone-200 dark:border-stone-800">
					<tr>
						<th
							scope="rowgroup"
							colspan={countries.length + 1}
							class="pt-3 pb-1 text-left text-xs font-semibold tracking-wide text-stone-500 uppercase"
						>
							{family.name}
						</th>
					</tr>
					{#each family.varieties as variety (variety.name)}
						<tr
							class="odd:bg-stone-100/70 hover:bg-stone-200/70 dark:odd:bg-stone-900/50 dark:hover:bg-stone-800/70"
						>
							<th
								scope="row"
								class="py-1.5 pr-3 text-left font-medium whitespace-nowrap text-stone-800 dark:text-stone-200"
							>
								{variety.name}
							</th>
							{#each countries as country (country)}
								{@const l = level(variety, country)}
								<td class="px-0.5 py-1.5 text-center">
									{#if l === 'main'}
										<span
											class="inline-block size-3 rounded-full bg-stone-700 dark:bg-stone-300"
											title="{variety.name}: widely grown in {country}"
										></span>
										<span class="sr-only">Widely grown</span>
									{:else if l === 'also'}
										<span
											class="inline-block size-3 rounded-full border-2 border-stone-400 dark:border-stone-500"
											title="{variety.name}: also grown in {country}"
										></span>
										<span class="sr-only">Also grown</span>
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			{/each}
		</table>
	</div>

	<!-- Phones: one card per variety -->
	<div class="space-y-6 md:hidden">
		{#each families as family (family.name)}
			<section>
				<h3 class="mb-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
					{family.name}
				</h3>
				<div class="space-y-2">
					{#each family.varieties as variety (variety.name)}
						<div class="rounded-lg border border-stone-200 p-3 dark:border-stone-800">
							<p class="font-medium text-stone-900 dark:text-stone-100">{variety.name}</p>
							<ul class="mt-2 flex flex-wrap gap-1.5 text-xs">
								{#each variety.main as country (country)}
									<li
										class="rounded-full bg-stone-700 px-2 py-0.5 text-stone-50 dark:bg-stone-300 dark:text-stone-900"
									>
										{country}
									</li>
								{/each}
								{#each variety.also as country (country)}
									<li
										class="rounded-full border border-stone-300 px-2 py-0.5 text-stone-600 dark:border-stone-700 dark:text-stone-400"
									>
										{country}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>

	<figcaption class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
		<span class="flex items-center gap-1.5"
			><span class="inline-block size-3 rounded-full bg-stone-700 dark:bg-stone-300"></span> Widely grown
			or best known there</span
		>
		<span class="flex items-center gap-1.5"
			><span
				class="inline-block size-3 rounded-full border-2 border-stone-400 dark:border-stone-500"
			></span> Also grown</span
		>
		<span class="basis-full"
			>A rough guide to the usual suspects. Most farms grow more than one variety, and plenty of
			varieties turn up in places not shown here.</span
		>
	</figcaption>
</figure>
