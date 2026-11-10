import { getAllCoffeeGuides } from '$lib/content/coffee.js';

export function load() {
	const guides = getAllCoffeeGuides();

	// Group guides into their series. Series are listed newest first (by their most
	// recent guide, since guides arrive newest first); within a series the overview
	// (part 0) leads and the rest follow in part order. Guides without a series are
	// collected separately.
	/** @type {Map<string, typeof guides>} */
	const bySeries = new Map();
	const standalone = [];
	for (const guide of guides) {
		if (!guide.series) {
			standalone.push(guide);
			continue;
		}
		if (!bySeries.has(guide.series)) bySeries.set(guide.series, []);
		bySeries.get(guide.series)?.push(guide);
	}

	const series = [...bySeries].map(([name, entries]) => {
		const sorted = [...entries].sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
		const overview = sorted.find((g) => !g.part) ?? null;
		const id = name
			.toLowerCase()
			.replace(/&/g, 'and')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
		return { name, id, overview, parts: sorted.filter((g) => g !== overview) };
	});

	return { series, standalone };
}
