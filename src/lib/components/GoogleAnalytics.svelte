<script>
	import { env } from '$env/dynamic/public';

	const gaId = env.PUBLIC_GA_MEASUREMENT_ID;

	// The standard gtag snippet, rendered into the prerendered HTML (rather than
	// injected from JS after load) so Google's tag checker and other crawlers can
	// see it. Every page is prerendered, so this runs once on the initial load.
	//
	// The config call sends the initial pageview. Later client-side route changes
	// are picked up by GA4's enhanced measurement ("Page changes based on browser
	// history events", on by default), so we don't send page_view events
	// ourselves — doing both would count every navigation twice.
	const snippet = gaId
		? `<script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}"></` +
			`script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', ${JSON.stringify(gaId)});</` +
			`script>`
		: '';
</script>

<svelte:head>
	{#if snippet}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- static gtag snippet built from our own env var -->
		{@html snippet}
	{/if}
</svelte:head>
