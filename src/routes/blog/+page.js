import { getAllPosts } from '$lib/content/blog.js';

export function load() {
	return { posts: getAllPosts() };
}
