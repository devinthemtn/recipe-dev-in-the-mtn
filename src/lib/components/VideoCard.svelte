<script>
	/** @type {{ video: { title: string, url: string, channel: string, note?: string, id?: string } }} */
	let { video } = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- external link, nothing to resolve() -->
<a
	href={video.url}
	target="_blank"
	rel="noopener noreferrer"
	class="block overflow-hidden rounded-lg border border-stone-200 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
>
	{#if video.id}
		<img
			src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
			alt=""
			loading="lazy"
			class="aspect-video w-full bg-stone-100 object-cover dark:bg-stone-900"
		/>
	{/if}
	<div class="p-4">
		<h3 class="font-semibold text-stone-900 dark:text-stone-100">{video.title}</h3>
		<p class="mt-1 text-xs text-stone-500">{video.channel}</p>
		{#if video.note}
			<p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{video.note}</p>
		{/if}
	</div>
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
