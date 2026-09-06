import { error } from '@sveltejs/kit';
import { getPostSlugs, loadPost } from '$lib/content/blog.js';

export const prerender = true;

export function entries() {
	return getPostSlugs().map((slug) => ({ slug }));
}

export async function load({ params }) {
	const post = await loadPost(params.slug);
	if (!post) error(404, 'Post not found');
	return post;
}
