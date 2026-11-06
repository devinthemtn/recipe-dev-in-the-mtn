<script>
	import CoffeeGuideCard from '$lib/components/CoffeeGuideCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Coffee Guides | Mountain Kitchen</title>
	<meta
		name="description"
		content="Plain-language coffee guides: what the words on a bag mean, how beans become coffee, and how to brew better at home."
	/>
</svelte:head>

<h1 class="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	Coffee Guides
</h1>
<p class="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
	The background I wish I'd had when I started: what the words on a coffee bag actually mean, and
	how to use them to find coffee you'll like.
</p>

{#if data.guides.length}
	<div class="flex flex-col gap-6">
		{#each data.guides as guide (guide.slug)}
			<CoffeeGuideCard {guide} />
		{/each}
	</div>
{:else}
	<p class="text-sm text-stone-500">The first guides are on the way.</p>
{/if}
