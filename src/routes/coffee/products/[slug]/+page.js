import { error } from '@sveltejs/kit';
import { getCoffeeProductSlugs, loadCoffeeProduct } from '$lib/content/coffee.js';

export const prerender = true;

export function entries() {
	return getCoffeeProductSlugs().map((slug) => ({ slug }));
}

export async function load({ params }) {
	const product = await loadCoffeeProduct(params.slug);
	if (!product) error(404, 'Product not found');
	return product;
}
