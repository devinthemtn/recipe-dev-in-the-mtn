import { error } from '@sveltejs/kit';
import { showCoffee } from '$lib/site.js';

// Keeps the draft coffee section out of production builds (see `showCoffee`).
// The prerenderer still visits /coffee pages, but they 404 here, and vite.config.js
// skips 404s under /coffee instead of failing, so no pages are written to build/.
export function load() {
	if (!showCoffee) error(404, 'Not found');
}
