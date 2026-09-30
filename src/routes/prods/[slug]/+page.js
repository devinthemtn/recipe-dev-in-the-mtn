import { error } from '@sveltejs/kit';
import { getProductSlugs, loadProduct } from '$lib/content/prods.js';

export const prerender = true;

export function entries() {
	return getProductSlugs().map((slug) => ({ slug }));
}

export async function load({ params }) {
	const product = await loadProduct(params.slug);
	if (!product) error(404, 'Product not found');
	return product;
}
