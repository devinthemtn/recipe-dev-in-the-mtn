<script>
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Mountain Kitchen</title>
</svelte:head>

<section class="mb-14">
	<h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Mountain Kitchen</h1>
	<p class="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
		Recipes and notes from a small kitchen, built around what's actually in the pantry. Every recipe
		includes nutrition info, and the blog covers what we're learning along the way.
	</p>
</section>

<section class="mb-14">
	<div class="mb-4 flex items-baseline justify-between">
		<h2 class="text-xl font-semibold text-stone-900 dark:text-stone-50">Recent Recipes</h2>
		<a
			href={resolve('/recipes')}
			class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
			>All recipes &rarr;</a
		>
	</div>
	<div class="grid gap-6 sm:grid-cols-3">
		{#each data.recipes as recipe (recipe.slug)}
			<a
				href={resolve('/recipes/[slug]', { slug: recipe.slug })}
				class="block rounded-lg border border-stone-200 p-4 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
			>
				<h3 class="font-semibold text-stone-900 dark:text-stone-100">{recipe.title}</h3>
				<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{recipe.description}</p>
			</a>
		{/each}
	</div>
</section>

<section>
	<div class="mb-4 flex items-baseline justify-between">
		<h2 class="text-xl font-semibold text-stone-900 dark:text-stone-50">From the Blog</h2>
		<a
			href={resolve('/blog')}
			class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
			>All posts &rarr;</a
		>
	</div>
	<div class="grid gap-6 sm:grid-cols-2">
		{#each data.posts as post (post.slug)}
			<a
				href={resolve('/blog/[slug]', { slug: post.slug })}
				class="block rounded-lg border border-stone-200 p-4 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
			>
				<h3 class="font-semibold text-stone-900 dark:text-stone-100">{post.title}</h3>
				<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{post.description}</p>
			</a>
		{/each}
	</div>
</section>
