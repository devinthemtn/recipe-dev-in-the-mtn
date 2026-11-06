<script>
	// Common coffee-growing countries, grouped by part of the world: the region
	// names you'll see on bags, the varieties most often grown there, the usual
	// processing and how the coffee tends to taste. These are generalizations;
	// any one farm can break every one of them.
	const groups = [
		{
			name: 'Africa & Arabia',
			accent: 'border-l-rose-500',
			countries: [
				{
					country: 'Ethiopia',
					regions: 'Yirgacheffe, Sidama, Guji, Harrar',
					varieties: ['Heirloom landraces', 'Numbered local selections (e.g. 74110)'],
					process: 'Washed and natural',
					cup: 'Floral, citrus, berry, tea-like'
				},
				{
					country: 'Kenya',
					regions: "Nyeri, Kirinyaga, Murang'a, Kiambu",
					varieties: ['SL28', 'SL34', 'Ruiru 11', 'Batian'],
					process: 'Washed',
					cup: 'Juicy, blackcurrant, grapefruit, bright'
				},
				{
					country: 'Rwanda & Burundi',
					regions: 'Nyamasheke, Huye (Rwanda); Kayanza, Ngozi (Burundi)',
					varieties: ['Red Bourbon'],
					process: 'Mostly washed',
					cup: 'Red fruit, black tea, sweet'
				},
				{
					country: 'Yemen',
					regions: 'Haraz, Bani Matar',
					varieties: ['Old Yemeni landraces'],
					process: 'Natural',
					cup: 'Dried fruit, spice, chocolate, winey'
				}
			]
		},
		{
			name: 'Central America & Mexico',
			accent: 'border-l-amber-500',
			countries: [
				{
					country: 'Mexico',
					regions: 'Chiapas, Oaxaca, Veracruz',
					varieties: ['Typica', 'Bourbon', 'Caturra'],
					process: 'Washed',
					cup: 'Mild, nutty, milk chocolate'
				},
				{
					country: 'Guatemala',
					regions: 'Antigua, Huehuetenango, Atitlán',
					varieties: ['Bourbon', 'Caturra', 'Catuai'],
					process: 'Washed',
					cup: 'Chocolate, toffee, apple'
				},
				{
					country: 'Honduras',
					regions: 'Copán, Santa Bárbara, Marcala, El Paraíso',
					varieties: ['Catuai', 'Lempira', 'Parainema', 'Pacas'],
					process: 'Washed',
					cup: 'Caramel, stone fruit, sweet'
				},
				{
					country: 'El Salvador',
					regions: 'Santa Ana, Apaneca-Ilamatepec',
					varieties: ['Bourbon', 'Pacas', 'Pacamara'],
					process: 'Washed, honey and natural',
					cup: 'Sweet, chocolate, soft fruit'
				},
				{
					country: 'Costa Rica',
					regions: 'Tarrazú, West Valley, Central Valley',
					varieties: ['Caturra', 'Catuai', 'Villa Sarchi'],
					process: 'Washed, and known for honey',
					cup: 'Clean, sweet, citrus'
				},
				{
					country: 'Panama',
					regions: 'Boquete, Volcán',
					varieties: ['Gesha', 'Caturra', 'Catuai'],
					process: 'Washed and natural',
					cup: 'Jasmine, bergamot, tropical fruit (Gesha)'
				}
			]
		},
		{
			name: 'South America',
			accent: 'border-l-lime-600',
			countries: [
				{
					country: 'Colombia',
					regions: 'Huila, Nariño, Cauca, Antioquia, Tolima',
					varieties: ['Castillo', 'Caturra', 'Colombia', 'Typica'],
					process: 'Washed',
					cup: 'Balanced, caramel, red fruit, citrus'
				},
				{
					country: 'Brazil',
					regions: 'Sul de Minas, Cerrado Mineiro, Mogiana, Bahia',
					varieties: ['Mundo Novo', 'Catuai', 'Yellow Bourbon'],
					process: 'Natural and pulped natural',
					cup: 'Nutty, chocolate, low acidity, heavy body'
				},
				{
					country: 'Peru',
					regions: 'Cajamarca, Cusco, Puno',
					varieties: ['Typica', 'Caturra', 'Bourbon'],
					process: 'Washed',
					cup: 'Mild, sweet, chocolate'
				}
			]
		},
		{
			name: 'Asia & Pacific',
			accent: 'border-l-violet-500',
			countries: [
				{
					country: 'Indonesia',
					regions: 'Sumatra (Gayo, Lintong), Java, Sulawesi (Toraja)',
					varieties: ['Catimor types (Ateng)', 'Typica', 'S795'],
					process: 'Wet-hulled (Java is often washed)',
					cup: 'Earthy, herbal, cedar, heavy body'
				},
				{
					country: 'India',
					regions: 'Chikmagalur, Coorg, Malabar Coast',
					varieties: ['S795', 'Kents', 'Robusta'],
					process: 'Washed, natural and "monsooned"',
					cup: 'Spicy, low acidity, full body'
				},
				{
					country: 'Hawaii',
					regions: "Kona, Ka'ū",
					varieties: ['Kona Typica'],
					process: 'Washed',
					cup: 'Mild, smooth, sweet'
				}
			]
		}
	];
</script>

<figure class="not-prose my-8 space-y-8">
	{#each groups as group (group.name)}
		<section>
			<h3 class="mb-3 text-sm font-semibold tracking-wide text-stone-500 uppercase">
				{group.name}
			</h3>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each group.countries as c (c.country)}
					<div
						class="rounded-lg border border-l-4 border-stone-200 p-4 dark:border-stone-800 {group.accent}"
					>
						<p class="font-semibold text-stone-900 dark:text-stone-100">{c.country}</p>
						<p class="mt-0.5 text-xs text-stone-500">{c.regions}</p>
						<ul class="mt-3 flex flex-wrap gap-1.5" aria-label="Common varieties">
							{#each c.varieties as variety (variety)}
								<li
									class="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300"
								>
									{variety}
								</li>
							{/each}
						</ul>
						<dl class="mt-3 space-y-1 text-sm">
							<div class="flex gap-2">
								<dt class="w-20 shrink-0 text-stone-500">Process</dt>
								<dd class="text-stone-700 dark:text-stone-300">{c.process}</dd>
							</div>
							<div class="flex gap-2">
								<dt class="w-20 shrink-0 text-stone-500">In the cup</dt>
								<dd class="text-stone-700 dark:text-stone-300">{c.cup}</dd>
							</div>
						</dl>
					</div>
				{/each}
			</div>
		</section>
	{/each}
	<figcaption class="text-xs text-stone-500">
		The usual suspects, not the full list. Most of these countries grow plenty of other varieties,
		and any single farm can surprise you.
	</figcaption>
</figure>
