<script>
	import { resolve } from '$app/paths';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import { newsletterConfig } from '$lib/newsletter.js';

	let { data } = $props();

	// Smaller screens show this many of each; wide screens (lg and up) show
	// everything loaded, which is double.
	const recipeCount = 3;
	const postCount = 2;
</script>

<svelte:head>
	<title>Mountain Kitchen</title>
</svelte:head>

<section class="mb-14">
	<h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
		Mountain Kitchen
	</h1>
	<p class="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
		Recipes and notes from a small kitchen, and how I'm adjusting to being diagnosed diabetic and
		the food changes that brings. Most recipes include nutrition info, and the blog covers what I'm
		learning along the way.
	</p>
	<p class="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
		I am starting this site as I am learning to cook all new foods that are better for me. I hope
		that my struggles and recipes I find help other people either with diabetes or just trying to
		eat healthier.
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
	<!-- Up to three across, wrapping into a second row on wide screens. -->
	<div class="flex flex-wrap gap-6">
		{#each data.recipes as recipe, i (recipe.slug)}
			<a
				href={resolve('/recipes/[slug]', { slug: recipe.slug })}
				class={[
					'card card-link block basis-full p-4 sm:basis-[calc((100%-3rem)/3)]',
					i >= recipeCount && 'max-lg:hidden'
				]}
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
	<!-- Two across, then four across once there's room for the extra posts. -->
	<div class="flex flex-wrap gap-6">
		{#each data.posts as post, i (post.slug)}
			<a
				href={resolve('/blog/[slug]', { slug: post.slug })}
				class={[
					'card card-link block basis-full p-4 sm:basis-[calc((100%-1.5rem)/2)] xl:basis-[calc((100%-4.5rem)/4)]',
					i >= postCount && 'max-lg:hidden'
				]}
			>
				<h3 class="font-semibold text-stone-900 dark:text-stone-100">{post.title}</h3>
				<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{post.description}</p>
			</a>
		{/each}
	</div>
</section>

<div class="mt-14">
	<NewsletterSignup config={newsletterConfig()} />
</div>
