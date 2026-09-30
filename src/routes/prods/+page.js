import { getAllProducts } from '$lib/content/prods.js';

export function load() {
	return { products: getAllProducts() };
}
