// Ingredients are authored as markdown (.svx) files with frontmatter in
// src/lib/content/ingrts. Metadata is loaded eagerly (cheap, small),
// while the rendered component for a single ingredient is loaded on demand.
import { isVisible } from './drafts.js';

const metaModules = import.meta.glob('/src/lib/content/ingrts/*.svx', { eager: true });
const componentModules = import.meta.glob('/src/lib/content/ingrts/*.svx');

function slugFromPath(path) {
	return path
		.split('/')
		.pop()
		.replace(/\.svx$/, '');
}

/** @returns {Array<{ slug: string } & Record<string, any>>} */
export function getAllIngredients() {
	return Object.entries(metaModules)
		.filter(([, mod]) => isVisible(mod.metadata))
		.map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.metadata }))
		.sort((a, b) => a.title.localeCompare(b.title));
}

/** @returns {string[]} */
export function getIngredientSlugs() {
	return Object.entries(metaModules)
		.filter(([, mod]) => isVisible(mod.metadata))
		.map(([path]) => slugFromPath(path));
}

/** @param {string} slug */
export async function loadIngredient(slug) {
	const path = `/src/lib/content/ingrts/${slug}.svx`;
	const importModule = componentModules[path];
	if (!importModule) return null;

	const mod = await importModule();
	if (!isVisible(mod.metadata)) return null;

	return { slug, meta: mod.metadata, Content: mod.default };
}
