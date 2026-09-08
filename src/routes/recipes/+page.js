import { getAllRecipes } from '$lib/content/recipes.js';

export function load() {
	const recipes = getAllRecipes().sort((a, b) => a.title.localeCompare(b.title));
	return { recipes };
}
