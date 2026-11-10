<script>
	import { resolve } from '$app/paths';

	// Compares the common home brew methods on a rough 1–5 scale. Like the roast
	// chart, the scores show tendencies, not measurements: a $40 drip machine and
	// a $400 one are both "drip", for example.
	const traits = ['Body', 'Hands-on effort', 'Gear cost', 'Total time'];

	const methods = [
		{
			name: 'Pour-over',
			slug: 'pour-over-coffee',
			best: 'Clean and bright. Great for light roasts.',
			scores: [2, 3, 2, 2]
		},
		{
			name: 'French press',
			slug: 'french-press-coffee',
			best: 'Full-bodied and forgiving. Good for darker roasts.',
			scores: [5, 1, 1, 2]
		},
		{
			name: 'AeroPress',
			slug: 'aeropress-coffee',
			best: 'Simple, quick and good quality. A bit of everything.',
			scores: [3, 2, 1, 1]
		},
		{
			name: 'Cold brew',
			slug: 'cold-brew-coffee',
			best: 'Smooth and cheap. Takes most of a day.',
			scores: [4, 1, 1, 5]
		},
		{
			name: 'Drip machine',
			slug: 'drip-coffee-machines',
			best: 'Simple, and makes a full pot. Quality varies a lot.',
			scores: [3, 1, 2, 2]
		},
		{
			name: 'Capsule',
			slug: 'capsule-coffee-machines',
			best: 'Quick, easy and the same every time.',
			scores: [3, 1, 3, 1]
		},
		{
			name: 'Espresso',
			slug: 'espresso-at-home',
			best: 'A whole different game. Effort, time and expense.',
			scores: [5, 5, 5, 4]
		}
	];
</script>

<figure class="not-prose my-8">
	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each methods as method (method.name)}
			<a
				href={resolve('/coffee/guides/[slug]', { slug: method.slug })}
				class="block rounded-lg border border-stone-200 p-4 transition-colors hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
			>
				<p class="font-semibold text-stone-900 dark:text-stone-100">{method.name}</p>
				<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{method.best}</p>
				<dl class="mt-4 space-y-2">
					{#each traits as trait, i (trait)}
						<div>
							<dt class="text-xs text-stone-500">{trait}</dt>
							<dd class="mt-1 flex gap-1" aria-label="{method.scores[i]} out of 5">
								{#each [1, 2, 3, 4, 5] as step (step)}
									<span
										class="h-1.5 flex-1 rounded-full {step <= method.scores[i]
											? 'bg-stone-700 dark:bg-stone-300'
											: 'bg-stone-200 dark:bg-stone-800'}"
									></span>
								{/each}
							</dd>
						</div>
					{/each}
				</dl>
			</a>
		{/each}
	</div>
	<figcaption class="mt-3 text-xs text-stone-500">
		Rough tendencies on a 1–5 scale, not measurements. "Total time" includes waiting, so cold brew
		scores high even though you barely touch it.
	</figcaption>
</figure>
