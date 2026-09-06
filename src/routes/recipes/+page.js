import { getAllRecipes } from '$lib/content/recipes.js';

export function load() {
	return { recipes: getAllRecipes() };
}
