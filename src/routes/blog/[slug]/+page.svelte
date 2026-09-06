<script>
	import { resolve } from '$app/paths';

	let { data } = $props();
	const { meta, Content } = data;

	/** @param {string} date */
	function formatDate(date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{meta.title} | Mountain Kitchen</title>
	<meta name="description" content={meta.description} />
</svelte:head>

<a
	href={resolve('/blog')}
	class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>&larr; Blog</a
>

<h1 class="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">{meta.title}</h1>
<p class="mt-2 text-sm text-stone-500">
	{formatDate(meta.date)}{#if meta.author}&nbsp;&middot; {meta.author}{/if}
</p>

<article class="prose mt-8 max-w-none prose-stone dark:prose-invert">
	<Content />
</article>
