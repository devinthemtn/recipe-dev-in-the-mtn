<script>
	import { resolve } from '$app/paths';
	import VideoCard from '$lib/components/VideoCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Coffee Videos | Mountain Kitchen</title>
	<meta
		name="description"
		content="The coffee YouTube videos and channels I recommend — brewing, espresso, grinders and the deep dives."
	/>
</svelte:head>

<a
	href={resolve('/coffee')}
	class="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>&larr; Coffee</a
>

<h1 class="mt-3 mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	Coffee Videos
</h1>
<p class="mb-10 max-w-2xl text-stone-600 dark:text-stone-400">
	The coffee corner of YouTube I actually watch and recommend. Links open on YouTube.
</p>

{#each data.groups as group (group.category)}
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-stone-900 dark:text-stone-50">{group.category}</h2>
		<div class="grid gap-6 sm:grid-cols-2">
			{#each group.videos as video (video.url)}
				<VideoCard {video} />
			{/each}
		</div>
	</section>
{:else}
	<p class="mb-12 text-sm text-stone-500">Video picks are on the way.</p>
{/each}

{#if data.channels.length}
	<section>
		<h2 class="mb-4 text-xl font-semibold text-stone-900 dark:text-stone-50">Channels I Follow</h2>
		<ul class="flex flex-col gap-4">
			{#each data.channels as channel (channel.url)}
				<li>
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external link, nothing to resolve() -->
					<a
						href={channel.url}
						target="_blank"
						rel="noopener noreferrer"
						class="font-semibold text-stone-900 underline-offset-2 hover:underline dark:text-stone-100"
						>{channel.name}</a
					>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{#if channel.note}
						<p class="text-sm text-stone-600 dark:text-stone-400">{channel.note}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
{/if}
