import { getAllRecipes } from '$lib/content/recipes.js';
import { getAllPosts } from '$lib/content/blog.js';

// The page is prerendered, so it can't know the screen size up front. Load
// enough for wide screens (double the usual) and let the page hide the extras
// on smaller ones.
export function load() {
	return {
		recipes: getAllRecipes().slice(0, 6),
		posts: getAllPosts().slice(0, 4)
	};
}
