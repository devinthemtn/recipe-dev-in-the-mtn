import { getAllRecipes } from '$lib/content/recipes.js';
import { getAllPosts } from '$lib/content/blog.js';

export function load() {
	return {
		recipes: getAllRecipes().slice(0, 3),
		posts: getAllPosts().slice(0, 2)
	};
}
