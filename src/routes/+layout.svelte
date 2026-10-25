<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import InstallButton from '$lib/components/InstallButton.svelte';
	import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
	import { showCoffee } from '$lib/site.js';
	import { newsletterConfig } from '$lib/newsletter.js';
	import { animate, scroll } from 'motion';

	let { children } = $props();

	const nav = [
		{ path: '/', label: 'Home' },
		{ path: '/recipes', label: 'Recipes' },
		{ path: '/ingrts', label: 'Ingredients' },
		{ path: '/prods', label: 'Products' },
		...(showCoffee ? [{ path: '/coffee', label: 'Coffee' }] : []),
		{ path: '/blog', label: 'Blog' }
	];

	const brandClass =
		'flex items-center gap-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50';

	/** @type {HTMLElement | undefined} */
	let header = $state();
	/** @type {HTMLElement | undefined} */
	let watermark = $state();
	/** Where the header's logo and title sit on the page, once measured. */
	/** @type {{ top: number, left: number } | null} */
	let brandPos = $state(null);
	let scrollY = $state(0);
	let barShown = $state(false);
	let lastY = 0;

	// Slide the header bar in when scrolling up and out when scrolling down.
	// The small threshold ignores jitter from trackpads and momentum scrolling.
	$effect(() => {
		const y = scrollY;
		if (y <= 0) barShown = false;
		else if (y < lastY - 6) barShown = true;
		else if (y > lastY + 6) barShown = false;
		else return;
		lastY = y;
	});

	// Keep the watermark lined up with the header's logo and title, including
	// when the nav wraps or fonts load.
	$effect(() => {
		const link = header?.querySelector('a');
		if (!header || !link) return;
		const measure = () => {
			const r = link.getBoundingClientRect();
			brandPos = { top: r.top + window.scrollY, left: r.left };
		};
		const observer = new ResizeObserver(measure);
		observer.observe(header);
		return () => observer.disconnect();
	});

	/**
	 * The logo and title are pinned behind the page; as the page scrolls they
	 * grow, blur and fade into a faint backdrop, driven by scroll position (not
	 * time) across the track element this is attached to. Reduced-motion users
	 * get the fade alone.
	 * @param {HTMLElement | undefined} target
	 * @returns {import('svelte/attachments').Attachment<HTMLElement>}
	 */
	const dissolveOnScroll = (target) => (track) => {
		if (!target) return;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		return scroll(
			animate(
				target,
				reduce
					? { opacity: [1, 0.25] }
					: { scale: [1, 4], opacity: [1, 0.25], filter: ['blur(0px)', 'blur(2px)'] }
			),
			{ target: track, offset: ['start start', 'end start'] }
		);
	};
</script>

{#snippet brand()}
	<img src={favicon} alt="" class="h-8 w-8" />
	Mountain Kitchen
{/snippet}

<!-- `ghost` hides the logo and title (but keeps the link) while the watermark stands in for them. -->
{#snippet headerContents(ghost = false)}
	<div
		class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8"
	>
		<a href={resolve('/')} class={[brandClass, ghost && 'opacity-0']}>
			{@render brand()}
		</a>
		<!-- On small screens the nav drops to its own full-width row below the title and toggle. -->
		<nav
			class="order-last flex w-full flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-stone-600 md:order-none md:ml-auto md:w-auto md:gap-6 dark:text-stone-400"
		>
			{#each nav as item (item.path)}
				<a href={resolve(item.path)} class="hover:text-stone-900 dark:hover:text-stone-100"
					>{item.label}</a
				>
			{/each}
		</nav>
		<div class="ml-auto flex items-center gap-2 md:ml-0">
			<InstallButton />
			<ThemeToggle />
		</div>
	</div>
{/snippet}

<svelte:window bind:scrollY />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<GoogleAnalytics />

<div
	class="paper-grain flex min-h-screen flex-col bg-paper text-stone-800 dark:bg-paper-dark dark:text-stone-200 print:bg-white"
>
	<!-- The logo and title, pinned behind the page so they can dissolve into it. -->
	{#if brandPos}
		<div
			aria-hidden="true"
			class="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden"
		>
			<div
				bind:this={watermark}
				style:top="{brandPos.top}px"
				style:left="{brandPos.left}px"
				class={['absolute origin-top-left whitespace-nowrap', brandClass]}
			>
				{@render brand()}
			</div>
		</div>
	{/if}
	<header
		bind:this={header}
		class="relative z-10 border-b border-edge dark:border-edge-dark print:hidden"
	>
		{@render headerContents(brandPos !== null)}
	</header>
	<!-- Compact copy of the header that slides in when scrolling back up. -->
	<div
		inert={!barShown}
		class={[
			'fixed inset-x-0 top-0 z-30 border-b border-edge bg-paper/90 shadow-sm backdrop-blur transition-transform duration-300 motion-reduce:transition-none dark:border-edge-dark dark:bg-paper-dark/90 print:hidden',
			!barShown && '-translate-y-full'
		]}
	>
		{@render headerContents()}
	</div>
	<!-- Scroll distance over which the header dissolves into the backdrop. -->
	<div
		{@attach dissolveOnScroll(watermark)}
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-0 h-80"
	></div>
	<!-- Transparent so the faded logo and title show through behind the page. -->
	<div class="relative z-10 flex flex-1 flex-col">
		<main
			class="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8 print:max-w-none print:p-0"
		>
			{@render children()}
		</main>

		<footer class="border-t border-edge dark:border-edge-dark print:hidden">
			<div
				class="mx-auto max-w-7xl px-4 py-6 text-sm text-stone-500 sm:px-6 lg:px-8 dark:text-stone-500"
			>
				&copy; {new Date().getFullYear()} Mountain Kitchen. Recipes and notes from a small kitchen.
				<a
					href={resolve('/legal')}
					class="ml-1 underline-offset-2 hover:text-stone-900 hover:underline dark:hover:text-stone-100"
					>Privacy, disclosures &amp; disclaimer</a
				>
				{#if newsletterConfig()}
					<a
						href={resolve('/newsletter')}
						class="ml-1 underline-offset-2 hover:text-stone-900 hover:underline dark:hover:text-stone-100"
						>Newsletter</a
					>
				{/if}
			</div>
		</footer>
	</div>
</div>
