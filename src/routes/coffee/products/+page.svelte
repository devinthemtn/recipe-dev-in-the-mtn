<script>
	import { resolve } from '$app/paths';
	import CoffeeProductCard from '$lib/components/CoffeeProductCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Coffee Products | Mountain Kitchen</title>
	<meta
		name="description"
		content="The coffee gear I use and recommend: grinders, brewers, kettles, scales and the small stuff."
	/>
</svelte:head>

<a
	href={resolve('/coffee')}
	class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>&larr; Coffee</a
>

<h1 class="mt-3 mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	Coffee Products
</h1>
<p class="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
	The gear on my counter: grinders, brewers, kettles, scales and the small stuff. What I use it for,
	what's good and bad about it, and whether I'd buy it again.
</p>

{#if data.products.length}
	<div class="grid gap-6 sm:grid-cols-2">
		{#each data.products as product (product.slug)}
			<CoffeeProductCard {product} />
		{/each}
	</div>
{:else}
	<p class="text-sm text-stone-500">Gear write-ups are on the way.</p>
{/if}
