// Coffee reviews and coffee products are authored as markdown (.svx) files with
// frontmatter in src/lib/content/coffee/reviews and src/lib/content/coffee/products.
// Metadata is loaded eagerly (cheap, small), while the rendered component for a
// single entry is loaded on demand. Both are listed newest first.
// The recommended videos and channels live in ./coffee/videos.js.
const reviewMeta = import.meta.glob('/src/lib/content/coffee/reviews/*.svx', { eager: true });
const reviewComponents = import.meta.glob('/src/lib/content/coffee/reviews/*.svx');
const productMeta = import.meta.glob('/src/lib/content/coffee/products/*.svx', { eager: true });
const productComponents = import.meta.glob('/src/lib/content/coffee/products/*.svx');

function slugFromPath(path) {
	return path
		.split('/')
		.pop()
		.replace(/\.svx$/, '');
}

/**
 * @param {Record<string, any>} metaModules
 * @returns {Array<{ slug: string } & Record<string, any>>}
 */
function getAll(metaModules) {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.metadata }))
		.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * @param {Record<string, any>} metaModules
 * @returns {string[]}
 */
function getSlugs(metaModules) {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path]) => slugFromPath(path));
}

/**
 * @param {Record<string, () => Promise<any>>} componentModules
 * @param {string} folder
 * @param {string} slug
 */
async function loadOne(componentModules, folder, slug) {
	const importModule = componentModules[`/src/lib/content/coffee/${folder}/${slug}.svx`];
	if (!importModule) return null;

	const mod = await importModule();
	if (mod.metadata.draft) return null;

	return { slug, meta: mod.metadata, Content: mod.default };
}

export const getAllCoffeeReviews = () => getAll(reviewMeta);
export const getCoffeeReviewSlugs = () => getSlugs(reviewMeta);
/** @param {string} slug */
export const loadCoffeeReview = (slug) => loadOne(reviewComponents, 'reviews', slug);

export const getAllCoffeeProducts = () => getAll(productMeta);
export const getCoffeeProductSlugs = () => getSlugs(productMeta);
/** @param {string} slug */
export const loadCoffeeProduct = (slug) => loadOne(productComponents, 'products', slug);
