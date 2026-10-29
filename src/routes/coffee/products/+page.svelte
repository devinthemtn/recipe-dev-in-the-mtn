<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import CoffeeProductCard from '$lib/components/CoffeeProductCard.svelte';

	let { data } = $props();

	const tagCounts = $derived.by(() => {
		const counts = new Map();
		for (const product of data.products) {
			for (const tag of product.tags ?? []) {
				counts.set(tag, (counts.get(tag) ?? 0) + 1);
			}
		}
		return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
	});

	// url.searchParams can't be read during prerendering, and the tag filter
	// is a client-side enhancement anyway, so this only resolves in-browser.
	const activeTag = $derived(browser ? page.url.searchParams.get('tag') : null);

	let query = $state('');
	let tagsOpen = $state(false);

	// Every word typed must appear somewhere in the product's title, brand,
	// category, description or tags.
	const queryWords = $derived(query.toLowerCase().split(/\s+/).filter(Boolean));

	/** @param {Record<string, any>} product */
	function searchText(product) {
		return [
			product.title,
			product.brand,
			product.category,
			product.description,
			...(product.tags ?? [])
		]
			.join(' ')
			.toLowerCase();
	}

	const products = $derived(
		data.products.filter((product) => {
			if (activeTag && !product.tags?.includes(activeTag)) return false;
			if (queryWords.length === 0) return true;
			const text = searchText(product);
			return queryWords.every((word) => text.includes(word));
		})
	);

	/** @param {string | null} tag */
	function tagHref(tag) {
		return tag
			? `${resolve('/coffee/products')}?tag=${encodeURIComponent(tag)}`
			: resolve('/coffee/products');
	}
</script>

<svelte:head>
	<title
		>{activeTag ? `${activeTag} | Coffee Products` : 'Coffee Products'} | Mountain Kitchen</title
	>
	<meta
		name="description"
		content="The coffee gear I use and recommend: grinders, brewers, kettles, scales and the small stuff."
	/>
</svelte:head>

<div class="mt-3 mb-3 flex flex-wrap items-baseline justify-between gap-2">
	<h1 class="text-3xl font-bold tracking-tight text-stone-900 capitalize dark:text-stone-50">
		{activeTag ? activeTag : 'Coffee Products'}
	</h1>
	<p class="text-sm text-stone-500 dark:text-stone-400">
		{products.length}
		{products.length === 1 ? 'product' : 'products'}
		{#if activeTag}
			· <a
				href={tagHref(null)}
				class="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-100"
				>show all</a
			>
		{/if}
	</p>
</div>
<p class="mb-8 max-w-2xl text-stone-600 dark:text-stone-400">
	The gear on my counter: grinders, brewers, kettles, scales and the small stuff. What I use it for,
	what's good and bad about it, and whether I'd buy it again.
</p>

{#if data.products.length}
	<div class="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-10">
		<!-- Filter panel: search plus tags. Below lg the tag list collapses behind a toggle;
		     from lg up it's a sticky sidebar. -->
		<aside
			class="card mb-8 p-4 lg:sticky lg:top-6 lg:mb-0 lg:flex lg:max-h-[calc(100vh-3rem)] lg:flex-col"
		>
			<label for="product-search" class="sr-only">Filter products</label>
			<div class="relative">
				<svg
					class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.45 4.39l3.08 3.08a.75.75 0 1 1-1.06 1.06l-3.08-3.08A7 7 0 0 1 2 9Z"
						clip-rule="evenodd"
					/>
				</svg>
				<input
					id="product-search"
					type="search"
					bind:value={query}
					placeholder="Filter products…"
					autocomplete="off"
					class="w-full rounded-lg border border-edge bg-paper/60 py-2 pr-3 pl-9 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:ring-0 dark:border-edge-dark dark:bg-paper-dark dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500"
				/>
			</div>

			<button
				type="button"
				class="mt-3 flex w-full items-center justify-between rounded-lg px-1 py-1 text-sm font-medium text-stone-700 lg:hidden dark:text-stone-300"
				aria-expanded={tagsOpen}
				aria-controls="product-tags"
				onclick={() => (tagsOpen = !tagsOpen)}
			>
				<span>
					Browse by tag
					<span class="ml-1 font-normal text-stone-500 dark:text-stone-400"
						>· {activeTag ?? 'All'}</span
					>
				</span>
				<svg
					class={`h-4 w-4 transition-transform ${tagsOpen ? 'rotate-180' : ''}`}
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>

			<nav
				id="product-tags"
				aria-label="Filter products by tag"
				class={`${tagsOpen ? 'flex' : 'hidden'} mt-3 min-h-0 flex-col lg:mt-5 lg:flex`}
			>
				<h2
					class="mb-2 hidden px-2 text-xs font-semibold tracking-wider text-stone-500 uppercase lg:block dark:text-stone-400"
				>
					Browse by tag
				</h2>
				<ul
					class="subtle-scroll -mx-1 grid grid-cols-2 gap-0.5 overflow-y-auto px-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1"
				>
					{#each [[null, data.products.length], ...tagCounts] as [tag, count] (tag ?? '')}
						{@const active = activeTag === tag || (!tag && !activeTag)}
						<li>
							<a
								href={tagHref(tag)}
								aria-current={active ? 'true' : undefined}
								onclick={() => (tagsOpen = false)}
								class={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm capitalize transition-colors ${
									active
										? 'bg-stone-900 font-medium text-white dark:bg-stone-100 dark:text-stone-900'
										: 'text-stone-700 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800'
								}`}
							>
								<span class="truncate">{tag ?? 'All products'}</span>
								<span
									class={`rounded-full px-1.5 text-xs tabular-nums ${
										active
											? 'bg-white/20 dark:bg-stone-900/15'
											: 'bg-stone-200/70 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
									}`}>{count}</span
								>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>

		<div>
			{#if products.length === 0}
				<p class="mb-8 text-stone-600 dark:text-stone-400">
					{#if queryWords.length > 0}
						No products match &ldquo;{query.trim()}&rdquo;{activeTag ? ` in “${activeTag}”` : ''}.
						<button type="button" class="underline" onclick={() => (query = '')}
							>Clear search</button
						>.
					{:else if activeTag}
						No products tagged &ldquo;{activeTag}&rdquo; yet.
						<a href={tagHref(null)} class="underline">Clear filter</a>.
					{/if}
				</p>
			{/if}

			<div class="grid gap-5 sm:grid-cols-2">
				{#each products as product (product.slug)}
					<CoffeeProductCard {product} />
				{/each}
			</div>
		</div>
	</div>
{:else}
	<p class="text-sm text-stone-500">Gear write-ups are on the way.</p>
{/if}
