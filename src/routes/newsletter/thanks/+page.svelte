<script>
	import { resolve } from '$app/paths';
</script>

<!-- Where the email provider sends people after they subscribe or confirm. -->
<svelte:head>
	<title>Thanks for subscribing | Mountain Kitchen</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
	Thanks for subscribing!
</h1>
<p class="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
	If you haven't yet, check your inbox for a confirmation email and click the link inside. Once
	you're confirmed, new recipes will come straight to you.
</p>
<p class="mt-6">
	<a
		href={resolve('/recipes')}
		class="font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
		>Browse the recipes &rarr;</a
	>
</p>
