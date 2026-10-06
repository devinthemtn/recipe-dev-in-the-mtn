<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import NutritionFacts from '$lib/components/NutritionFacts.svelte';
	import PrintButton from '$lib/components/PrintButton.svelte';
	import { jsonLdScript } from '$lib/content/recipeSchema.js';
	import { siteOrigin } from '$lib/site.js';

	let { data } = $props();
	const { meta, Content, schema } = data;

	// Shown only on paper, so a printed recipe says where it came from.
	const origin = siteOrigin();
	const printSource = origin ? `${origin.replace(/^https?:\/\//, '')}${page.url.pathname}` : null;
</script>

<svelte:head>
	<title>{meta.title} | Mountain Kitchen</title>
	<meta name="description" content={meta.description} />
	{#if schema}
		<!-- Escaped by jsonLdScript, so recipe text can't break out of the tag. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html jsonLdScript(schema)}
	{/if}
</svelte:head>

<a
	href={resolve('/recipes')}
	class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 print:hidden"
	>&larr; Recipes</a
>

<h1 class="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	{meta.title}
</h1>
<p class="mt-2 text-stone-600 dark:text-stone-400">{meta.description}</p>

<div class="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-500">
	{#if meta.prepTime}<span>Prep: {meta.prepTime}</span>{/if}
	{#if meta.cookTime}<span>Cook: {meta.cookTime}</span>{/if}
	{#if meta.totalTime}<span>Total: {meta.totalTime}</span>{/if}
	{#if meta.servings}<span>Serves: {meta.servings}</span>{/if}
	<span class="ml-auto"><PrintButton /></span>
</div>

<div class="mt-8 grid gap-8 md:grid-cols-[1fr_240px] print:mt-6 print:items-start print:gap-6">
	<article class="prose max-w-none prose-stone dark:prose-invert print:prose-sm">
		<Content />
	</article>

	{#if meta.nutrition}
		<NutritionFacts nutrition={meta.nutrition} servings={meta.servings} />
	{/if}
</div>

<p class="mt-8 hidden border-t border-stone-300 pt-2 text-xs text-stone-500 print:block">
	Mountain Kitchen{#if printSource}&ensp;·&ensp;{printSource}{/if}
</p>
