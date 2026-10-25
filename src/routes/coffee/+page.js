import { getAllCoffeeProducts, getAllCoffeeReviews } from '$lib/content/coffee.js';
import { getRecentVideos } from '$lib/content/coffee/videos.js';

// The landing page shows the most recently added entries from each sub-page.
export function load() {
	return {
		videos: getRecentVideos(4),
		reviews: getAllCoffeeReviews().slice(0, 3),
		products: getAllCoffeeProducts().slice(0, 4)
	};
}
