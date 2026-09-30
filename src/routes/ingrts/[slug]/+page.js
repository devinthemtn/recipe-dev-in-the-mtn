import { error } from '@sveltejs/kit';
import { getIngredientSlugs, loadIngredient } from '$lib/content/ingrts.js';

export const prerender = true;

export function entries() {
	return getIngredientSlugs().map((slug) => ({ slug }));
}

export async function load({ params }) {
	const ingredient = await loadIngredient(params.slug);
	if (!ingredient) error(404, 'Ingredient not found');
	return ingredient;
}
