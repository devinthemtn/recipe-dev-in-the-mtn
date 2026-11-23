// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	/** The build's date in the site's time zone, "YYYY-MM-DD". Set in vite.config.js. */
	const __BUILD_DATE__: string;

	interface Window {
		/** Set by the Google Analytics snippet, when analytics is enabled. */
		gtag?: (...args: unknown[]) => void;
	}
}

export {};
