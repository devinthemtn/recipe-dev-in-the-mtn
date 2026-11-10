<script>
	import { resolve } from '$app/paths';

	// An example specialty coffee bag, with each line of the label explained.
	// Lines that have their own guide link to it. The example coffee is the same
	// one used in the Understanding Coffee Beans overview.
	const fields = [
		{
			label: 'Origin',
			value: 'Ethiopia, Guji',
			means: 'Where it was grown. The country sets the style, and the region narrows it down.',
			slug: 'coffee-origins'
		},
		{
			label: 'Producer',
			value: 'Hambela washing station',
			means: 'Who grew or processed it. More detail here usually means more traceable coffee.'
		},
		{
			label: 'Altitude',
			value: '2,000–2,200 m',
			means: 'Higher usually means denser beans, more acidity and more complexity.'
		},
		{
			label: 'Variety',
			value: 'Ethiopian heirloom',
			means: 'What kind of coffee plant. It sets what the coffee can taste like.',
			slug: 'coffee-varieties'
		},
		{
			label: 'Process',
			value: 'Natural',
			means: 'What happened to the fruit after picking. A big part of how fruity or clean it is.',
			slug: 'coffee-processing-methods'
		},
		{
			label: 'Roast',
			value: 'Light',
			means: 'How far it was roasted. Lighter keeps more of everything above.',
			slug: 'coffee-roast-levels'
		},
		{
			label: 'Tasting notes',
			value: 'Blueberry, jasmine, cocoa',
			means: 'What the roaster tastes in it. A description, not added flavors.'
		},
		{
			label: 'Roasted on',
			value: 'Nov 2',
			means: 'The most useful date on the bag. Tells you when it will be at its best.',
			slug: 'coffee-freshness-and-roast-date'
		}
	];
</script>

<figure class="not-prose my-8">
	<div
		class="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-800"
		aria-label="An example coffee bag label, explained line by line"
	>
		<div class="bg-stone-100 px-4 py-3 dark:bg-stone-900">
			<p class="text-xs tracking-wide text-stone-500 uppercase">Example roaster</p>
			<p class="text-lg font-semibold text-stone-900 dark:text-stone-100">Ethiopia Guji Natural</p>
		</div>
		<dl class="divide-y divide-stone-200 dark:divide-stone-800">
			{#each fields as field (field.label)}
				<div class="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_12rem_1fr] sm:gap-4">
					<dt class="text-xs font-semibold tracking-wide text-stone-500 uppercase sm:pt-0.5">
						{field.label}
					</dt>
					<dd class="font-semibold text-stone-900 dark:text-stone-100">{field.value}</dd>
					<dd class="text-sm text-stone-600 dark:text-stone-400">
						{field.means}
						{#if field.slug}
							<a
								href={resolve('/coffee/guides/[slug]', { slug: field.slug })}
								class="whitespace-nowrap text-stone-900 underline dark:text-stone-100">Read more</a
							>
						{/if}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		A made-up bag, but a typical one. Not every roaster lists all of these, and some list more, like
		the harvest date or the farm's name.
	</figcaption>
</figure>
