<script>
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Products | Mountain Kitchen</title>
</svelte:head>

<h1 class="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Products</h1>
<p class="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
	Store-bought products I've found that fit a diabetic-friendly diet — brand, nutrition, and why
	they're worth keeping around.
</p>

<div class="flex flex-col gap-6">
	{#each data.products as product (product.slug)}
		<a
			href={resolve('/prods/[slug]', { slug: product.slug })}
			class="block rounded-lg border border-stone-200 p-5 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
		>
			<h2 class="font-semibold text-stone-900 dark:text-stone-100">{product.title}</h2>
			{#if product.brand}
				<p class="mt-1 text-xs text-stone-500">{product.brand}</p>
			{/if}
			<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{product.description}</p>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each product.tags ?? [] as tag (tag)}
					<span
						class="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300"
						>{tag}</span
					>
				{/each}
			</div>
		</a>
	{/each}
</div>
