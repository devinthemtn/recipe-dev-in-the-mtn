<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';

	let { children } = $props();

	const nav = [
		{ path: '/', label: 'Home' },
		{ path: '/recipes', label: 'Recipes' },
		{ path: '/ingrts', label: 'Ingredients' },
		{ path: '/prods', label: 'Products' },
		{ path: '/blog', label: 'Blog' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<GoogleAnalytics />

<div class="flex min-h-screen flex-col bg-white text-stone-800 dark:bg-stone-950 dark:text-stone-200">
	<header class="border-b border-stone-200 dark:border-stone-800">
		<div class="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4">
			<a
				href={resolve('/')}
				class="flex items-center gap-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50"
			>
				<img src={favicon} alt="" class="h-8 w-8" />
				Mountain Kitchen
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
			<div class="ml-auto md:ml-0">
				<ThemeToggle />
			</div>
		</div>
	</header>

	<main class="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
		{@render children()}
	</main>

	<footer class="border-t border-stone-200 dark:border-stone-800">
		<div class="mx-auto max-w-4xl px-4 py-6 text-sm text-stone-500 dark:text-stone-500">
			&copy; {new Date().getFullYear()} Mountain Kitchen. Recipes and notes from a small kitchen.
		</div>
	</footer>
</div>
