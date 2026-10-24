<script>
	import { resolve } from '$app/paths';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import { newsletterConfig } from '$lib/newsletter.js';

	const config = newsletterConfig();
</script>

<svelte:head>
	<title>Newsletter | Mountain Kitchen</title>
	<meta
		name="description"
		content="Get new low-carb, diabetic-friendly recipes from Mountain Kitchen by email."
	/>
</svelte:head>

<h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	The Mountain Kitchen newsletter
</h1>
<p class="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
	I'm learning to cook all over again after a diabetes diagnosis. Sign up and I'll email you new
	recipes as I post them, along with what's worked (and what hasn't) in my own kitchen.
</p>

<div class="mt-8 max-w-2xl">
	{#if config}
		<NewsletterSignup
			{config}
			heading="Sign up"
			blurb="One email when there's something new. No spam."
		/>
	{:else}
		<p class="text-stone-600 dark:text-stone-400">
			The newsletter isn't open yet. In the meantime, browse the
			<a href={resolve('/recipes')} class="underline underline-offset-2">recipes</a>.
		</p>
	{/if}
</div>
