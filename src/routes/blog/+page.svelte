<script>
	import { resolve } from '$app/paths';

	let { data } = $props();

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
	<title>Blog | Mountain Kitchen</title>
</svelte:head>

<h1 class="mb-8 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Blog</h1>

<div class="flex flex-col gap-6">
	{#each data.posts as post (post.slug)}
		<a
			href={resolve('/blog/[slug]', { slug: post.slug })}
			class="block rounded-lg border border-stone-200 p-5 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
		>
			<p class="text-xs text-stone-500">{formatDate(post.date)}</p>
			<h2 class="mt-1 font-semibold text-stone-900 dark:text-stone-100">{post.title}</h2>
			<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{post.description}</p>
		</a>
	{/each}
</div>
