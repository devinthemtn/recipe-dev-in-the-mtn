<script>
	import { resolve } from '$app/paths';
	import CoffeeProductDetails from '$lib/components/CoffeeProductDetails.svelte';

	let { data } = $props();
	const { meta, Content } = data;
</script>

<svelte:head>
	<title>{meta.title} | Mountain Kitchen</title>
	<meta name="description" content={meta.description} />
</svelte:head>

<a
	href={resolve('/coffee/products')}
	class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>&larr; Coffee Products</a
>

<h1 class="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	{meta.title}
</h1>
<p class="mt-2 text-stone-600 dark:text-stone-400">{meta.description}</p>

<div class="mt-8 grid gap-8 md:grid-cols-[1fr_240px]">
	<article class="prose max-w-none prose-stone dark:prose-invert">
		<Content />
	</article>

	<CoffeeProductDetails {meta} />
</div>
