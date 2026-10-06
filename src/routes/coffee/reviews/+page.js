import { getAllCoffeeReviews } from '$lib/content/coffee.js';

export function load() {
	return { reviews: getAllCoffeeReviews() };
}
