<script>
	// Offers to install the site as an app. Chrome/Edge/Android fire `beforeinstallprompt`,
	// which lets us show their native install dialog. iOS Safari has no such API, so there
	// we explain the Share → "Add to Home Screen" step instead. Hidden once installed.

	/** @type {any} */
	let deferredPrompt = $state(null);
	let isIos = $state(false);
	let showIosHint = $state(false);

	$effect(() => {
		const standalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			/** @type {any} */ (navigator).standalone === true;
		if (standalone) return;

		isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

		// The offer is caught by an early script in app.html, since it can arrive before
		// this component mounts.
		const w = /** @type {any} */ (window);
		const onPrompt = () => {
			deferredPrompt = w.__installPrompt;
		};
		const onInstalled = () => {
			deferredPrompt = w.__installPrompt = null;
			isIos = false;
		};
		if (w.__installPrompt) onPrompt();
		window.addEventListener('installpromptready', onPrompt);
		window.addEventListener('appinstalled', onInstalled);
		return () => {
			window.removeEventListener('installpromptready', onPrompt);
			window.removeEventListener('appinstalled', onInstalled);
		};
	});

	async function install() {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			await deferredPrompt.userChoice;
			deferredPrompt = /** @type {any} */ (window).__installPrompt = null;
		} else {
			showIosHint = !showIosHint;
		}
	}
</script>

{#if deferredPrompt || isIos}
	<div class="relative">
		<button
			type="button"
			onclick={install}
			class="rounded-full border border-stone-300 px-3 py-1 text-sm font-medium text-stone-600 hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-stone-100"
			aria-expanded={isIos ? showIosHint : undefined}
		>
			📲 Install app
		</button>
		{#if showIosHint}
			<p
				class="card absolute right-0 z-10 mt-2 w-60 p-3 text-sm text-stone-700 dark:text-stone-300"
			>
				Tap the <strong>Share</strong> button in Safari, then choose
				<strong>Add to Home Screen</strong>.
			</p>
		{/if}
	</div>
{/if}
