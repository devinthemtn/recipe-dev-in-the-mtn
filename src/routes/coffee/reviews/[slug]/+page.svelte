<script>
	import { resolve } from '$app/paths';
	import CoffeeDetails from '$lib/components/CoffeeDetails.svelte';

	let { data } = $props();
	const { meta, Content } = data;

	// Roundups and other articles have none of the per-coffee fields, so they skip the sidebar.
	const detailKeys = [
		'rating',
		'roaster',
		'origin',
		'producer',
		'variety',
		'process',
		'roast',
		'price',
		'notes',
		'brewedWith',
		'buyUrl'
	];
	const hasDetails = detailKeys.some((key) => meta[key] !== undefined);

	/** @param {string} date */
	function formatDate(date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		});
	}
</script>

<svelte:head>
	<title>{meta.title} | Mountain Kitchen</title>
	<meta name="description" content={meta.description} />
</svelte:head>

<nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm text-stone-400">
	<a
		href={resolve('/coffee')}
		class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
		>&larr; Coffee</a
	>
	<span aria-hidden="true">/</span>
	<a
		href={resolve('/coffee/reviews')}
		class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
		>Coffee Reviews</a
	>
</nav>

<h1 class="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	{meta.title}
</h1>
<p class="mt-2 text-stone-600 dark:text-stone-400">{meta.description}</p>
{#if meta.date}
	<p class="mt-2 text-sm text-stone-500">Reviewed {formatDate(meta.date)}</p>
{/if}

{#if hasDetails}
	<div class="mt-8 grid gap-8 md:grid-cols-[1fr_240px]">
		<article class="prose max-w-none prose-stone dark:prose-invert">
			<Content />
		</article>

		<CoffeeDetails {meta} />
	</div>
{:else}
	<article class="prose mt-8 max-w-3xl prose-stone dark:prose-invert">
		<Content />
	</article>
{/if}
