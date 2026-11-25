import {
	getAllCoffeeGuides,
	getAllCoffeeProducts,
	getAllCoffeeReviews
} from '$lib/content/coffee.js';
import { getRecentVideos } from '$lib/content/coffee/videos.js';

/**
 * The most recently updated guide series (and standalone guides), one card each.
 * A series is represented by its overview, or its first part if it has none, so
 * the landing page never fills up with several parts of the same series.
 * @param {number} count
 */
function latestGuides(count) {
	const guides = getAllCoffeeGuides(); // newest first
	const seen = new Set();
	const picks = [];
	for (const guide of guides) {
		const key = guide.series ?? guide.slug;
		if (seen.has(key)) continue;
		seen.add(key);
		const lead = guide.series
			? guides
					.filter((g) => g.series === guide.series)
					.sort((a, b) => (a.part ?? 0) - (b.part ?? 0))[0]
			: guide;
		picks.push(lead);
		if (picks.length === count) break;
	}
	return picks;
}

// The landing page shows the most recently added entries from each sub-page.
export function load() {
	return {
		videos: getRecentVideos(4),
		guides: latestGuides(3),
		reviews: getAllCoffeeReviews().slice(0, 3),
		products: getAllCoffeeProducts().slice(0, 4)
	};
}
