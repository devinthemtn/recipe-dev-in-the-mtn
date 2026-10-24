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

	interface Window {
		/** Set by the Google Analytics snippet, when analytics is enabled. */
		gtag?: (...args: unknown[]) => void;
	}
}

export {};
