import { error } from '@sveltejs/kit';
import { getRecipeSlugs, loadRecipe } from '$lib/content/recipes.js';

export const prerender = true;

export function entries() {
	return getRecipeSlugs().map((slug) => ({ slug }));
}

export async function load({ params, data }) {
	const recipe = await loadRecipe(params.slug);
	if (!recipe) error(404, 'Recipe not found');
	return { ...data, ...recipe };
}
