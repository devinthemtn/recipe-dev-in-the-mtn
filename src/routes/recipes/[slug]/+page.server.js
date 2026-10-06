import { loadRecipe } from '$lib/content/recipes.js';
import { buildRecipeSchema } from '$lib/content/recipeSchema.js';
import { siteOrigin } from '$lib/site.js';

// The raw markdown is only needed to build the Recipe JSON-LD, so it's read here
// on the server (at prerender time) and never ends up in the client bundle.
const rawModules = import.meta.glob('/src/lib/content/recipes/*.svx', {
	query: '?raw',
	import: 'default'
});

export async function load({ params }) {
	const recipe = await loadRecipe(params.slug);
	const importRaw = rawModules[`/src/lib/content/recipes/${params.slug}.svx`];
	// +page.js handles the 404 for missing and draft recipes.
	if (!recipe || !importRaw) return {};

	return {
		schema: buildRecipeSchema({
			slug: params.slug,
			meta: recipe.meta,
			raw: await importRaw(),
			siteUrl: siteOrigin()
		})
	};
}
