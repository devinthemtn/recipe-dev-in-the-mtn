import { getAllCoffeeProducts } from '$lib/content/coffee.js';

export function load() {
	return { products: getAllCoffeeProducts() };
}
