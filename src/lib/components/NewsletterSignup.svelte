<script>
	import { resolve } from '$app/paths';

	/**
	 * @type {{
	 *   variant?: 'inline' | 'card',
	 *   heading?: string,
	 *   blurb?: string,
	 *   config: ReturnType<typeof import('$lib/newsletter.js').newsletterConfig>,
	 *   status?: 'idle' | 'sending' | 'success' | 'error'
	 * }}
	 */
	let {
		variant = 'card',
		heading = 'Get new recipes by email',
		blurb = "New low-carb, diabetic-friendly recipes and what I'm learning in the kitchen, sent when they're posted.",
		config,
		status = $bindable('idle')
	} = $props();

	const id = $props.id();

	/**
	 * Without JavaScript the form posts straight to the provider. With it, we
	 * post in the background and show the result here instead. The request is
	 * sent with mode 'no-cors' because providers don't all allow cross-origin
	 * reads, so a response we can't read counts as success; the provider's
	 * confirmation email is the real check.
	 * @param {SubmitEvent} event
	 */
	async function submit(event) {
		event.preventDefault();
		if (!config) return;
		const form = /** @type {HTMLFormElement} */ (event.currentTarget);
		const data = new FormData(form);

		// Bots fill in every field; people never see this one. Pretend it worked.
		if (data.get('website')) {
			status = 'success';
			return;
		}
		data.delete('website');

		status = 'sending';
		try {
			await fetch(config.url, { method: 'POST', body: data, mode: 'no-cors' });
			status = 'success';
			window.gtag?.('event', 'sign_up', { method: 'newsletter' });
		} catch {
			status = 'error';
		}
	}
</script>

{#if config}
	<section
		class={[
			'print:hidden',
			variant === 'card'
				? 'rounded-lg border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900'
				: 'border-t border-stone-200 pt-8 dark:border-stone-800'
		]}
		aria-labelledby="{id}-heading"
	>
		<h2 id="{id}-heading" class="text-xl font-semibold text-stone-900 dark:text-stone-50">
			{heading}
		</h2>

		{#if status === 'success'}
			<p class="mt-2 text-stone-700 dark:text-stone-300" role="status">
				Thanks! Check your inbox and click the link to confirm your subscription.
			</p>
		{:else}
			<p class="mt-2 text-stone-600 dark:text-stone-400">{blurb}</p>

			<form method="post" action={config.url} class="mt-4" onsubmit={submit}>
				{#each Object.entries(config.extraFields) as [name, value] (name)}
					<input type="hidden" {name} {value} />
				{/each}
				<div class="hidden" aria-hidden="true">
					<label
						>Leave this empty <input
							type="text"
							name="website"
							tabindex="-1"
							autocomplete="off"
						/></label
					>
				</div>

				<label for="{id}-email" class="sr-only">Email address</label>
				<div class="flex flex-col gap-2 sm:flex-row">
					<input
						id="{id}-email"
						type="email"
						name={config.emailField}
						required
						autocomplete="email"
						placeholder="you@example.com"
						class="w-full rounded-md border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:border-stone-500 focus:ring-stone-500 sm:max-w-xs dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
					/>
					<button
						type="submit"
						disabled={status === 'sending'}
						class="rounded-md bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-700 disabled:opacity-60 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
					>
						{status === 'sending' ? 'Subscribing…' : 'Subscribe'}
					</button>
				</div>

				{#if status === 'error'}
					<p class="mt-2 text-sm text-red-700 dark:text-red-400" role="alert">
						Something went wrong. Check your connection and try again.
					</p>
				{/if}

				<p class="mt-3 text-xs text-stone-500">
					No spam, unsubscribe anytime. See the
					<a
						href="{resolve('/legal')}#privacy"
						class="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-100"
						>privacy policy</a
					>.
				</p>
			</form>
		{/if}
	</section>
{/if}
