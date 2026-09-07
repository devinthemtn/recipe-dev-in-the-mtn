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
		{ path: '/blog', label: 'Blog' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<GoogleAnalytics />

<div class="flex min-h-screen flex-col bg-white text-stone-800 dark:bg-stone-950 dark:text-stone-200">
	<header class="border-b border-stone-200 dark:border-stone-800">
		<div class="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
			<a
				href={resolve('/')}
				class="flex items-center gap-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50"
			>
				<img src={favicon} alt="" class="h-8 w-8" />
				Mountain Kitchen
			</a>
			<div class="flex items-center gap-6">
				<nav class="flex gap-6 text-sm font-medium text-stone-600 dark:text-stone-400">
					{#each nav as item (item.path)}
						<a href={resolve(item.path)} class="hover:text-stone-900 dark:hover:text-stone-100"
							>{item.label}</a
						>
					{/each}
				</nav>
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
