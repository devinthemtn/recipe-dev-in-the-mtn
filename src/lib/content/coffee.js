// Coffee reviews are authored as markdown (.svx) files with frontmatter in
// src/lib/content/coffee/reviews. Metadata is loaded eagerly (cheap, small),
// while the rendered component for a single review is loaded on demand.
// The recommended videos and channels live in ./coffee/videos.js.
const metaModules = import.meta.glob('/src/lib/content/coffee/reviews/*.svx', { eager: true });
const componentModules = import.meta.glob('/src/lib/content/coffee/reviews/*.svx');

function slugFromPath(path) {
	return path
		.split('/')
		.pop()
		.replace(/\.svx$/, '');
}

/** @returns {Array<{ slug: string } & Record<string, any>>} */
export function getAllCoffeeReviews() {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.metadata }))
		.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** @returns {string[]} */
export function getCoffeeReviewSlugs() {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path]) => slugFromPath(path));
}

/** @param {string} slug */
export async function loadCoffeeReview(slug) {
	const path = `/src/lib/content/coffee/reviews/${slug}.svx`;
	const importModule = componentModules[path];
	if (!importModule) return null;

	const mod = await importModule();
	if (mod.metadata.draft) return null;

	return { slug, meta: mod.metadata, Content: mod.default };
}
