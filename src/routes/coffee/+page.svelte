<script>
	import { resolve } from '$app/paths';
	import CoffeeProductCard from '$lib/components/CoffeeProductCard.svelte';
	import CoffeeReviewCard from '$lib/components/CoffeeReviewCard.svelte';
	import VideoCard from '$lib/components/VideoCard.svelte';

	let { data } = $props();

	const sections = [
		{
			path: /** @type {const} */ ('/coffee/videos'),
			label: 'Recommended Videos',
			blurb: 'The coffee YouTube I keep sending to friends.'
		},
		{
			path: /** @type {const} */ ('/coffee/reviews'),
			label: 'Reviews',
			blurb: "Coffees I've brewed at home, and whether I'd buy them again."
		},
		{
			path: /** @type {const} */ ('/coffee/products'),
			label: 'Products',
			blurb: 'Grinders, brewers, kettles, scales and the small stuff.'
		}
	];
</script>

<svelte:head>
	<title>Coffee | Mountain Kitchen</title>
	<meta
		name="description"
		content="Coffee reviews, gear and the YouTube videos I recommend, for people who weigh their beans and argue about grind size."
	/>
</svelte:head>

<section class="mb-10">
	<h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Coffee</h1>
	<p class="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
		For the weird coffee people — the ones who weigh their beans, own more than one grinder, and
		have opinions about water. Here you'll find the YouTube videos I keep sending to friends, my
		reviews of coffees I've brewed, and the gear I actually use.
	</p>
	<p class="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
		Black coffee has no carbs, which makes it one of the easier things to keep in a diabetic
		routine. Going down the rabbit hole is optional, but encouraged.
	</p>
</section>

<nav class="mb-14 grid gap-4 sm:grid-cols-3" aria-label="Coffee sections">
	{#each sections as section (section.path)}
		<a
			href={resolve(section.path)}
			class="block rounded-lg border border-stone-200 p-4 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
		>
			<span class="font-semibold text-stone-900 dark:text-stone-100">{section.label} &rarr;</span>
			<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{section.blurb}</p>
		</a>
	{/each}
</nav>

<section class="mb-14">
	<div class="mb-4 flex items-baseline justify-between">
		<h2 class="text-xl font-semibold text-stone-900 dark:text-stone-50">Latest Videos</h2>
		<a
			href={resolve('/coffee/videos')}
			class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
			>All videos &rarr;</a
		>
	</div>
	{#if data.videos.length}
		<div class="grid gap-6 sm:grid-cols-2">
			{#each data.videos as video (video.url)}
				<VideoCard {video} />
			{/each}
		</div>
	{:else}
		<p class="text-sm text-stone-500">Video picks are on the way.</p>
	{/if}
</section>

<section class="mb-14">
	<div class="mb-4 flex items-baseline justify-between">
		<h2 class="text-xl font-semibold text-stone-900 dark:text-stone-50">Latest Reviews</h2>
		<a
			href={resolve('/coffee/reviews')}
			class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
			>All reviews &rarr;</a
		>
	</div>
	{#if data.reviews.length}
		<div class="flex flex-col gap-6">
			{#each data.reviews as review (review.slug)}
				<CoffeeReviewCard {review} />
			{/each}
		</div>
	{:else}
		<p class="text-sm text-stone-500">The first reviews are brewing. Check back soon.</p>
	{/if}
</section>

<section>
	<div class="mb-4 flex items-baseline justify-between">
		<h2 class="text-xl font-semibold text-stone-900 dark:text-stone-50">Latest Products</h2>
		<a
			href={resolve('/coffee/products')}
			class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
			>All products &rarr;</a
		>
	</div>
	{#if data.products.length}
		<div class="grid gap-6 sm:grid-cols-2">
			{#each data.products as product (product.slug)}
				<CoffeeProductCard {product} />
			{/each}
		</div>
	{:else}
		<p class="text-sm text-stone-500">Gear write-ups are on the way.</p>
	{/if}
</section>
