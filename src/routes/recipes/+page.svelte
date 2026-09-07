<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { browser } from '$app/environment';

	let { data } = $props();

	const tagCounts = $derived.by(() => {
		const counts = new Map();
		for (const recipe of data.recipes) {
			for (const tag of recipe.tags ?? []) {
				counts.set(tag, (counts.get(tag) ?? 0) + 1);
			}
		}
		return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
	});

	// url.searchParams can't be read during prerendering, and the tag filter
	// is a client-side enhancement anyway, so this only resolves in-browser.
	const activeTag = $derived(browser ? page.url.searchParams.get('tag') : null);

	const recipes = $derived(
		activeTag ? data.recipes.filter((recipe) => recipe.tags?.includes(activeTag)) : data.recipes
	);

	/** @param {string | null} tag */
	function tagHref(tag) {
		return tag ? `${resolve('/recipes')}?tag=${encodeURIComponent(tag)}` : resolve('/recipes');
	}
</script>

<svelte:head>
	<title>{activeTag ? `${activeTag} recipes` : 'Recipes'} | Mountain Kitchen</title>
</svelte:head>

<h1 class="mb-6 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Recipes</h1>

<div class="mb-8 flex flex-wrap gap-2 tag-list-search" role="group" aria-label="Filter recipes by tag">
	<a
		href={tagHref(null)}
		aria-current={!activeTag ? 'true' : undefined}
		class={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
			!activeTag
				? 'border-stone-900 bg-stone-900 text-white dark:border-stone-50 dark:bg-stone-50 dark:text-stone-900'
				: 'border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-600'
		}`}
	>
		All <span class="opacity-70">{data.recipes.length}</span>
	</a>
	{#each tagCounts as [tag, count] (tag)}
		<a
			href={tagHref(tag)}
			aria-current={activeTag === tag ? 'true' : undefined}
			class={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
				activeTag === tag
					? 'border-stone-900 bg-stone-900 text-white dark:border-stone-50 dark:bg-stone-50 dark:text-stone-900'
					: 'tag-list-tag border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-600'
			}`}
		>
			{tag} <span class="opacity-70">{count}</span>
		</a>
	{/each}
</div>

{#if activeTag && recipes.length === 0}
	<p class="mb-8 text-stone-600 dark:text-stone-400">
		No recipes tagged &ldquo;{activeTag}&rdquo; yet.
		<a href={tagHref(null)} class="underline">Clear filter</a>.
	</p>
{/if}

<div class="grid gap-6 sm:grid-cols-2">
	{#each recipes as recipe (recipe.slug)}
		<a
			href={resolve('/recipes/[slug]', { slug: recipe.slug })}
			class="block rounded-lg border border-stone-200 p-5 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
		>
			<h2 class="font-semibold text-stone-900 dark:text-stone-100">{recipe.title}</h2>
			<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{recipe.description}</p>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each recipe.tags ?? [] as tag (tag)}
					<span
						class="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300"
						>{tag}</span
					>
				{/each}
			</div>
		</a>
	{/each}
</div>
