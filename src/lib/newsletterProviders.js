/**
 * Email providers the signup form knows how to post to. Each one gives you a
 * form URL that a plain HTML form can POST to, so the site needs no backend.
 * To switch providers, set PUBLIC_NEWSLETTER_PROVIDER and
 * PUBLIC_NEWSLETTER_FORM_URL in .env; the form fields and the privacy policy
 * follow automatically.
 *
 * - emailField: the name the provider expects on the email input.
 * - extraFields: hidden fields the provider's own embed code sends.
 * @type {Record<string, { name: string, privacyUrl: string, emailField: string, extraFields: Record<string, string> }>}
 */
export const providers = {
	mailerlite: {
		name: 'MailerLite',
		privacyUrl: 'https://www.mailerlite.com/legal/privacy-policy',
		emailField: 'fields[email]',
		extraFields: { 'ml-submit': '1', anticsrf: 'true' }
	},
	kit: {
		name: 'Kit',
		privacyUrl: 'https://kit.com/privacy',
		emailField: 'email_address',
		extraFields: {}
	},
	buttondown: {
		name: 'Buttondown',
		privacyUrl: 'https://buttondown.com/legal/privacy',
		emailField: 'email',
		extraFields: { embed: '1' }
	}
};
