<script>
	import CoffeeGuideSeries from '$lib/components/CoffeeGuideSeries.svelte';

	let { data } = $props();
	const { meta, Content, series, slug } = data;

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

<h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	{meta.title}
</h1>
<p class="mt-2 text-stone-600 dark:text-stone-400">{meta.description}</p>
{#if meta.date}
	<p class="mt-2 text-sm text-stone-500">Published {formatDate(meta.date)}</p>
{/if}

<article class="prose mt-8 max-w-3xl prose-stone dark:prose-invert">
	<Content />
</article>

{#if series.length > 1}
	<CoffeeGuideSeries name={meta.series} guides={series} current={slug} />
{/if}
