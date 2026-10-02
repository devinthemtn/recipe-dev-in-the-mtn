// Blog posts are authored as markdown (.svx) files with frontmatter in
// src/lib/content/blog. Metadata is loaded eagerly (cheap, small),
// while the rendered component for a single post is loaded on demand.
const metaModules = import.meta.glob('/src/lib/content/blog/*.svx', { eager: true });
const componentModules = import.meta.glob('/src/lib/content/blog/*.svx');

function slugFromPath(path) {
	return path
		.split('/')
		.pop()
		.replace(/\.svx$/, '');
}

/** @returns {Array<{ slug: string } & Record<string, any>>} */
export function getAllPosts() {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.metadata }))
		.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** @returns {string[]} */
export function getPostSlugs() {
	return Object.entries(metaModules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path]) => slugFromPath(path));
}

/** @param {string} slug */
export async function loadPost(slug) {
	const path = `/src/lib/content/blog/${slug}.svx`;
	const importModule = componentModules[path];
	if (!importModule) return null;

	const mod = await importModule();
	if (mod.metadata.draft) return null;

	return { slug, meta: mod.metadata, Content: mod.default };
}
