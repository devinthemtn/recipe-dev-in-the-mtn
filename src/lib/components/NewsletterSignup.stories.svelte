<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import '../../routes/layout.css';
	import NewsletterSignup from './NewsletterSignup.svelte';
	import { providers } from '$lib/newsletterProviders.js';

	// A fake form URL, so the form renders without a real provider configured.
	const config = { url: 'https://example.com/subscribe', ...providers.mailerlite };

	const { Story } = defineMeta({
		title: 'Components/NewsletterSignup',
		component: NewsletterSignup,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: { type: 'select' }, options: ['card', 'inline'] },
			status: { control: { type: 'select' }, options: ['idle', 'sending', 'success', 'error'] }
		},
		args: { config }
	});
</script>

<Story name="Card" />

<Story name="Inline" args={{ variant: 'inline', heading: 'Follow along by email' }} />

<Story name="Sending" args={{ status: 'sending' }} />

<Story name="Success" args={{ status: 'success' }} />

<Story name="Error" args={{ status: 'error' }} />
