<script>
	import { resolve } from '$app/paths';
	import { historyEras } from '$lib/content/coffee/historyEras.js';

	// Key events for each era of the "A History of Coffee" series, in the same order
	// as historyEras. Each era links to the guide that covers it in detail. Events
	// marked `legend` are popular stories that aren't backed by records from the time.
	const eventsByEra = [
		[
			{ when: 'Ancient', text: 'Wild arabica grows in the forests of southwestern Ethiopia' },
			{
				when: '~850',
				text: 'Kaldi notices his goats dancing after eating coffee cherries',
				legend: true
			},
			{ when: '1400s', text: 'Sufis in Yemen brew coffee to stay awake for night prayers' }
		],
		[
			{ when: '1511', text: 'Mecca tries to ban coffee; Cairo overturns it' },
			{ when: '1530s', text: 'Coffeehouses open in Cairo and Damascus' },
			{ when: '1554', text: 'The first coffeehouses open in Constantinople' }
		],
		[
			{ when: '1582', text: 'Leonhard Rauwolf describes the drink in print' },
			{ when: '~1600', text: 'Pope Clement VIII "baptizes" coffee', legend: true },
			{ when: '1680s', text: 'Venice gets its first coffeehouses (1645 is often claimed)' },
			{ when: '1686', text: 'Café Procope opens in Paris' }
		],
		[
			{ when: '1637', text: 'A Greek student brews coffee at Balliol College, Oxford' },
			{ when: '1650', text: "England's first coffeehouse opens in Oxford" },
			{ when: '1652', text: "Pasqua Rosée opens London's first, in St Michael's Alley" },
			{ when: '1675', text: 'Charles II bans coffeehouses, then backs down 11 days later' },
			{ when: '1680s', text: "Lloyd's coffeehouse becomes a hub for shipping insurance" }
		],
		[
			{ when: '1657', text: "Tea is first sold in London, at Garway's coffeehouse" },
			{ when: '1662', text: 'Catherine of Braganza makes tea fashionable at court' },
			{ when: '1717', text: 'Twinings opens the Golden Lyon, a tea shop women could visit' },
			{ when: '1784', text: 'The Commutation Act slashes the tea tax' },
			{ when: '1840s', text: 'Afternoon tea catches on' }
		],
		[
			{ when: '1690s', text: 'The Dutch start growing coffee on Java' },
			{ when: '1720s', text: 'Coffee reaches Martinique, then Brazil (1727)' },
			{ when: '1773', text: 'The Boston Tea Party nudges Americans toward coffee' },
			{ when: '1791', text: "Revolution in Haiti, then the world's biggest grower" },
			{ when: '1869', text: 'Leaf rust wipes out coffee in Ceylon, which turns to tea' }
		],
		[
			{ when: '1901', text: 'Luigi Bezzera patents an espresso machine in Milan' },
			{ when: '1908', text: 'Melitta Bentz invents the paper coffee filter' },
			{ when: '1938', text: 'Nescafé launches instant coffee' },
			{ when: '1966', text: "Peet's opens in Berkeley; Starbucks follows in 1971" },
			{ when: '1974', text: 'Erna Knutsen coins the term "specialty coffee"' },
			{ when: '2000s', text: 'The "third wave": light roasts, single origins, pour over' }
		]
	];

	const eras = historyEras.map((era, i) => ({ ...era, events: eventsByEra[i] }));
</script>

<figure class="not-prose my-8">
	<ol class="space-y-4">
		{#each eras as era (era.slug)}
			<li class="rounded-lg border border-l-4 border-stone-200 dark:border-stone-800 {era.accent}">
				<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 pt-4">
					<div>
						<p class="text-xs font-medium text-stone-500">Part {era.part} · {era.span}</p>
						<p class="font-semibold text-stone-900 dark:text-stone-100">{era.name}</p>
						<p class="text-sm text-stone-600 dark:text-stone-400">{era.where}</p>
					</div>
					<a
						href={resolve('/coffee/guides/[slug]', { slug: era.slug })}
						class="text-sm text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-900 dark:text-stone-300 dark:decoration-stone-600 dark:hover:text-stone-100 print:hidden"
						>Read part {era.part}<span class="sr-only">: {era.name}</span> →</a
					>
				</div>
				<ol
					class="relative mx-4 mt-3 mb-4 space-y-3 border-l border-stone-200 dark:border-stone-700"
				>
					{#each era.events as event (event.when + event.text)}
						<li class="relative pl-5">
							<span
								class="absolute top-1.5 -left-[5px] size-2.5 rounded-full ring-2 ring-paper dark:ring-paper-dark {era.dot}"
								aria-hidden="true"
							></span>
							<p class="text-sm text-stone-700 dark:text-stone-300">
								<span
									class="mr-1 inline-block min-w-12 font-semibold text-stone-900 tabular-nums dark:text-stone-100"
									>{event.when}</span
								>
								{event.text}
								{#if event.legend}
									<span
										class="ml-1 rounded-full bg-stone-100 px-2 py-0.5 text-xs whitespace-nowrap text-stone-600 dark:bg-stone-800 dark:text-stone-300"
										>legend</span
									>
								{/if}
							</p>
						</li>
					{/each}
				</ol>
			</li>
		{/each}
	</ol>
	<figcaption class="mt-3 text-xs text-stone-500">
		Dates before about 1600 are rough. Anything marked "legend" is a popular story with no record
		from the time to back it up.
	</figcaption>
</figure>
