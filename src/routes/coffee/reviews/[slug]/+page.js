import { error } from '@sveltejs/kit';
import { getCoffeeReviewSlugs, loadCoffeeReview } from '$lib/content/coffee.js';

export const prerender = true;

export function entries() {
	return getCoffeeReviewSlugs().map((slug) => ({ slug }));
}

export async function load({ params }) {
	const review = await loadCoffeeReview(params.slug);
	if (!review) error(404, 'Review not found');
	return review;
}
