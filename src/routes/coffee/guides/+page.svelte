<script>
	import CoffeeGuideCard from '$lib/components/CoffeeGuideCard.svelte';
	import DraftBadge from '$lib/components/DraftBadge.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Coffee Guides | Mountain Kitchen</title>
	<meta
		name="description"
		content="Plain-language coffee guides: what the words on a bag mean, how beans become coffee, and how to brew better at home."
	/>
</svelte:head>

<h1 class="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	Coffee Guides
</h1>
<p class="mb-6 max-w-2xl text-stone-600 dark:text-stone-400">
	The background I wish I'd had when I started: what the words on a coffee bag actually mean, and
	how to use them to find coffee you'll like.
</p>

{#if data.series.length || data.standalone.length}
	{#if data.series.length > 1}
		<nav aria-label="Guide series" class="mb-10 flex flex-wrap gap-2">
			{#each data.series as s (s.name)}
				<a
					href="#{s.id}"
					class="rounded-full border border-stone-200 px-3 py-1 text-sm text-stone-700 hover:border-stone-400 hover:text-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:border-stone-600 dark:hover:text-stone-100"
					>{s.name}</a
				>
			{/each}
		</nav>
	{/if}

	<div class="flex flex-col gap-14">
		{#each data.series as s (s.name)}
			<section id={s.id} class="scroll-mt-6">
				<div
					class="mb-4 flex items-baseline justify-between gap-4 border-b border-stone-200 pb-2 dark:border-stone-800"
				>
					<h2 class="text-xl font-semibold text-stone-900 dark:text-stone-50">{s.name}</h2>
					<p class="shrink-0 text-sm text-stone-500">
						{s.parts.length}
						{s.parts.length === 1 ? 'part' : 'parts'}{s.overview ? ' + overview' : ''}
					</p>
				</div>

				{#if s.overview}
					<a
						href={resolve('/coffee/guides/[slug]', { slug: s.overview.slug })}
						class="block rounded-lg border-2 border-stone-300 bg-stone-50 p-5 hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-500"
					>
						<p class="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
							Start here · Overview
						</p>
						<h3 class="text-lg font-semibold text-stone-900 dark:text-stone-100">
							{s.overview.title}<DraftBadge draft={s.overview.draft} />
						</h3>
						<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">
							{s.overview.description}
						</p>
					</a>
				{/if}

				{#if s.parts.length}
					<ol
						class="mt-3 space-y-3 {s.overview
							? 'ml-4 border-l-2 border-stone-200 pl-5 sm:ml-6 sm:pl-6 dark:border-stone-800'
							: ''}"
					>
						{#each s.parts as guide (guide.slug)}
							<li>
								<a
									href={resolve('/coffee/guides/[slug]', { slug: guide.slug })}
									class="flex gap-4 rounded-lg border border-stone-200 p-4 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
								>
									<span
										aria-hidden="true"
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300"
										>{guide.part}</span
									>
									<span class="min-w-0">
										<span class="sr-only">Part {guide.part}: </span>
										<span class="block font-semibold text-stone-900 dark:text-stone-100">
											{guide.title}<DraftBadge draft={guide.draft} />
										</span>
										<span class="mt-1 block text-sm text-stone-600 dark:text-stone-400"
											>{guide.description}</span
										>
									</span>
								</a>
							</li>
						{/each}
					</ol>
				{/if}
			</section>
		{/each}

		{#if data.standalone.length}
			<section>
				<h2
					class="mb-4 border-b border-stone-200 pb-2 text-xl font-semibold text-stone-900 dark:border-stone-800 dark:text-stone-50"
				>
					{data.series.length ? 'More guides' : 'Guides'}
				</h2>
				<div class="flex flex-col gap-6">
					{#each data.standalone as guide (guide.slug)}
						<CoffeeGuideCard {guide} />
					{/each}
				</div>
			</section>
		{/if}
	</div>
{:else}
	<p class="text-sm text-stone-500">The first guides are on the way.</p>
{/if}
