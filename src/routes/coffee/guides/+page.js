import { getAllCoffeeGuides } from '$lib/content/coffee.js';

export function load() {
	return { guides: getAllCoffeeGuides() };
}
