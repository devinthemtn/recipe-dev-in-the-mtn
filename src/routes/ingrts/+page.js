import { getAllIngredients } from '$lib/content/ingrts.js';

export function load() {
	return { ingredients: getAllIngredients() };
}
