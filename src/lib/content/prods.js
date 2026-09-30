// Products are authored as markdown (.svx) files with frontmatter in
// src/lib/content/prods. Metadata is loaded eagerly (cheap, small),
// while the rendered component for a single product is loaded on demand.
const metaModules = import.meta.glob('/src/lib/content/prods/*.svx', { eager: true });
const componentModules = import.meta.glob('/src/lib/content/prods/*.svx');

function slugFromPath(path) {
	return path
		.split('/')
		.pop()
		.replace(/\.svx$/, '');
}

/** @returns {Array<{ slug: string } & Record<string, any>>} */
export function getAllProducts() {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.metadata }))
		.sort((a, b) => a.title.localeCompare(b.title));
}

/** @returns {string[]} */
export function getProductSlugs() {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path]) => slugFromPath(path));
}

/** @param {string} slug */
export async function loadProduct(slug) {
	const path = `/src/lib/content/prods/${slug}.svx`;
	const importModule = componentModules[path];
	if (!importModule) return null;

	const mod = await importModule();
	if (mod.metadata.draft) return null;

	return { slug, meta: mod.metadata, Content: mod.default };
}
