<script>
	import { resolve } from '$app/paths';
	import CoffeeReviewCard from '$lib/components/CoffeeReviewCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Coffee Reviews | Mountain Kitchen</title>
	<meta
		name="description"
		content="Reviews of coffees I've brewed at home: roaster, origin, process, how I brewed it and whether I'd buy it again."
	/>
</svelte:head>

<a
	href={resolve('/coffee')}
	class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>&larr; Coffee</a
>

<h1 class="mt-3 mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	Coffee Reviews
</h1>
<p class="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
	Coffees I've bought and brewed at home — where they're from, how I brewed them, what I actually
	tasted, and whether I'd buy them again.
</p>

{#if data.reviews.length}
	<div class="flex flex-col gap-6">
		{#each data.reviews as review (review.slug)}
			<CoffeeReviewCard {review} />
		{/each}
	</div>
{:else}
	<p class="text-sm text-stone-500">The first reviews are brewing. Check back soon.</p>
{/if}
