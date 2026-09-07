<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { env } from '$env/dynamic/public';

	const gaId = env.PUBLIC_GA_MEASUREMENT_ID;

	onMount(() => {
		if (!gaId) return;

		window.dataLayer = window.dataLayer || [];
		window.gtag = function () {
			window.dataLayer.push(arguments);
		};

		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
		document.head.appendChild(script);

		window.gtag('js', new Date());
		// This sends the initial pageview. Later client-side route changes
		// (which don't reload the page) are tracked in afterNavigate below.
		window.gtag('config', gaId);
	});

	afterNavigate((navigation) => {
		if (!browser || !gaId || !window.gtag || navigation.type === 'enter') return;
		window.gtag('event', 'page_view', {
			page_path: page.url.pathname + page.url.search,
			page_title: document.title
		});
	});
</script>
