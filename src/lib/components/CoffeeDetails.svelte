<script>
	/** @type {{ meta: Record<string, any> }} */
	let { meta } = $props();

	const labels = {
		roaster: 'Roaster',
		origin: 'Origin',
		producer: 'Producer',
		variety: 'Variety',
		process: 'Process',
		roast: 'Roast',
		price: 'Price'
	};

	/** @param {string | string[] | undefined} value */
	const list = (value) => (Array.isArray(value) ? value.join(', ') : value);
</script>

<aside
	class="print-keep rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900"
>
	<h2 class="text-sm font-semibold tracking-wide text-stone-900 uppercase dark:text-stone-100">
		The Coffee
	</h2>
	{#if meta.rating !== undefined}
		<p class="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-50">
			{meta.rating}<span class="text-sm font-normal text-stone-500"> / 5</span>
		</p>
	{/if}
	<dl class="mt-3 flex flex-col gap-2 text-sm">
		{#each Object.entries(labels) as [key, label] (key)}
			{#if meta[key]}
				<div class="border-b border-stone-200 pb-1 dark:border-stone-800">
					<dt class="text-xs text-stone-500">{label}</dt>
					<dd class="font-medium text-stone-900 dark:text-stone-100">{meta[key]}</dd>
				</div>
			{/if}
		{/each}
		{#if meta.notes}
			<div class="border-b border-stone-200 pb-1 dark:border-stone-800">
				<dt class="text-xs text-stone-500">Roaster's notes</dt>
				<dd class="font-medium text-stone-900 dark:text-stone-100">{list(meta.notes)}</dd>
			</div>
		{/if}
		{#if meta.brewedWith}
			<div class="border-b border-stone-200 pb-1 dark:border-stone-800">
				<dt class="text-xs text-stone-500">Brewed with</dt>
				<dd class="font-medium text-stone-900 dark:text-stone-100">{list(meta.brewedWith)}</dd>
			</div>
		{/if}
	</dl>
	{#if meta.buyUrl}
		<!-- eslint-disable svelte/no-navigation-without-resolve -- external link, nothing to resolve() -->
		<a
			href={meta.buyUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-4 block rounded-md bg-stone-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300 print:hidden"
			>Where to buy &rarr;</a
		>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{/if}
</aside>
