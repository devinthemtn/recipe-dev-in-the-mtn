import { error } from '@sveltejs/kit';
import { getAllCoffeeGuides, getCoffeeGuideSlugs, loadCoffeeGuide } from '$lib/content/coffee.js';

export const prerender = true;

export function entries() {
	return getCoffeeGuideSlugs().map((slug) => ({ slug }));
}

export async function load({ params }) {
	const guide = await loadCoffeeGuide(params.slug);
	if (!guide) error(404, 'Guide not found');

	// The other guides in the same series, in part order, for the series box.
	const series = guide.meta.series
		? getAllCoffeeGuides()
				.filter((g) => g.series === guide.meta.series)
				.sort((a, b) => (a.part ?? 0) - (b.part ?? 0))
		: [];
	return { ...guide, series };
}
