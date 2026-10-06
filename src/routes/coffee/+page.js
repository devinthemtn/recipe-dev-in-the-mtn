import { getAllCoffeeReviews } from '$lib/content/coffee.js';
import { getVideoGroups } from '$lib/content/coffee/videos.js';

export function load() {
	return {
		reviews: getAllCoffeeReviews().slice(0, 3),
		videos: getVideoGroups()
			.flatMap((group) => group.videos)
			.slice(0, 4)
	};
}
