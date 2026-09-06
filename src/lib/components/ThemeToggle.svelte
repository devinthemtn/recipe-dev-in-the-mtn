<script>
	let isDark = $state(false);

	$effect(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		const next = !document.documentElement.classList.contains('dark');
		document.documentElement.classList.toggle('dark', next);
		try {
			localStorage.setItem('theme', next ? 'dark' : 'light');
		} catch (e) {
			// ignore (e.g. storage disabled)
		}
		isDark = next;
	}
</script>

<button
	type="button"
	onclick={toggle}
	class="rounded-full border border-stone-300 px-3 py-1 text-sm font-medium text-stone-600 hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-stone-100"
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{isDark ? '☀️ Light' : '🌙 Dark'}
</button>
