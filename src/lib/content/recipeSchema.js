// Builds schema.org Recipe JSON-LD for a recipe page, so search engines can show
// it as a rich result (times, nutrition, ingredients). Times, servings and
// nutrition come from the frontmatter; ingredients and steps are parsed out of
// the markdown body's "## Ingredients" and "## Instructions" sections.
// Reference: https://developers.google.com/search/docs/appearance/structured-data/recipe

import { normalizeOrigin } from '$lib/site.js';

const SITE_NAME = 'Mountain Kitchen';

/** @type {Record<string, string>} */
const CUISINES = { ethiopian: 'Ethiopian', persian: 'Persian' };

/** @type {Record<string, string>} */
const CATEGORIES = {
	breakfast: 'Breakfast',
	lunch: 'Lunch',
	dinner: 'Dinner',
	side: 'Side dish',
	snack: 'Snack',
	dessert: 'Dessert',
	soup: 'Soup',
	salad: 'Salad',
	bread: 'Bread',
	sauce: 'Sauce',
	dip: 'Dip',
	'spice-blend': 'Spice blend'
};

/** @type {Record<string, string>} */
const DIETS = {
	'diabetic-friendly': 'https://schema.org/DiabeticDiet',
	'gluten-free': 'https://schema.org/GlutenFreeDiet',
	vegan: 'https://schema.org/VeganDiet',
	vegetarian: 'https://schema.org/VegetarianDiet'
};

/** @type {Record<string, string>} */
const NUTRITION = {
	calories: 'calories',
	carbs: 'carbohydrateContent',
	fiber: 'fiberContent',
	sugar: 'sugarContent',
	protein: 'proteinContent',
	fat: 'fatContent',
	sodium: 'sodiumContent'
};

/** @type {Array<[RegExp, 'D' | 'H' | 'M']>} */
const UNITS = [
	[/^(?:days?|d)$/, 'D'],
	[/^(?:hours?|hrs?|h)$/, 'H'],
	[/^(?:minutes?|mins?|m)$/, 'M']
];

/**
 * Converts a frontmatter time like "1 hr 20 min" or "35 min + 4 hr marinating"
 * to an ISO 8601 duration ("PT1H20M"). Returns undefined when the text has
 * anything that can't be measured ("overnight", "plus cooling", "2–4 days"),
 * because a wrong time in search results is worse than none.
 * @param {unknown} text
 */
export function toIsoDuration(text) {
	if (typeof text !== 'string') return undefined;
	const totals = { D: 0, H: 0, M: 0 };
	let found = false;

	const residue = text
		.toLowerCase()
		.replace(
			/(\d+(?:\.\d+)?)\s*([a-z]+)(?:\s+(?:chilling|marinating|resting|rising))?/g,
			(match, n, unit) => {
				const entry = UNITS.find(([re]) => re.test(unit));
				if (!entry) return match;
				totals[entry[1]] += Number(n);
				found = true;
				return '';
			}
		)
		.replace(/\+|\bplus\b|\band\b/g, '')
		.trim();

	if (!found || residue) return undefined;

	// Normalise to whole minutes, then split back into days/hours/minutes.
	let minutes = Math.round(totals.D * 1440 + totals.H * 60 + totals.M);
	const days = Math.floor(minutes / 1440);
	minutes -= days * 1440;
	const hours = Math.floor(minutes / 60);
	minutes -= hours * 60;

	const time = (hours ? `${hours}H` : '') + (minutes ? `${minutes}M` : '');
	if (!days && !time) return 'PT0M';
	return `P${days ? `${days}D` : ''}${time ? `T${time}` : ''}`;
}

/**
 * Strips inline markdown/HTML so only the readable text is left.
 * @param {string} md
 */
function plainText(md) {
	return md
		.replace(/<[^>]+>/g, '')
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/(\*\*|__)(.+?)\1/g, '$2')
		.replace(/(\*|_)(.+?)\1/g, '$2')
		.replace(/`([^`]*)`/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Splits the markdown body into its "## " sections, keyed by lowercase heading.
 * @param {string} raw the full .svx source
 */
function sections(raw) {
	const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/<script[\s\S]*?<\/script>/g, '');
	/** @type {Record<string, string[]>} */
	const out = {};
	let current = null;
	for (const line of body.split('\n')) {
		const heading = line.match(/^##\s+(.+?)\s*$/);
		if (heading) {
			current = heading[1].toLowerCase();
			out[current] = [];
		} else if (current) {
			out[current].push(line);
		}
	}
	return out;
}

/**
 * Collects list items, grouped under any "### " subheadings. Indented lines
 * and nested sub-items that follow an item are folded into it, e.g.
 * "In a large bowl mix: oats, flour, salt". With `paragraphs`, loose lines of
 * text (like "Preheat oven to 350°F") are kept as items too.
 * @param {string[]} lines
 * @param {{ paragraphs?: boolean }} [options]
 */
function listGroups(lines, { paragraphs = false } = {}) {
	/** @type {Array<{ name?: string, items: string[] }>} */
	const groups = [{ items: [] }];
	let nested = false;
	for (const line of lines) {
		const sub = line.match(/^###\s+(.+?)\s*$/);
		const item = line.match(/^(\s*)(?:[-*+]|\d+\.)\s+(.*)$/);
		const group = groups[groups.length - 1];
		const last = group.items.length - 1;
		if (sub) {
			groups.push({ name: plainText(sub[1]), items: [] });
		} else if (item && item[1].length >= 2 && last >= 0) {
			group.items[last] += `${nested ? ',' : ''} ${item[2]}`;
			nested = true;
		} else if (item) {
			group.items.push(item[2]);
			nested = false;
		} else if (/^\s+\S/.test(line) && last >= 0) {
			group.items[last] += ` ${line.trim()}`;
		} else if (paragraphs && line.trim()) {
			group.items.push(line);
			nested = false;
		}
	}
	return groups
		.map((g) => ({ ...g, items: g.items.map(plainText).filter(Boolean) }))
		.filter((g) => g.items.length);
}

/** @param {string[]} items */
function steps(items) {
	return items.map((text) => ({ '@type': 'HowToStep', text }));
}

/**
 * @param {{
 *   slug: string,
 *   meta: Record<string, any>,
 *   raw: string,
 *   siteUrl?: string
 * }} recipe
 */
export function buildRecipeSchema({ slug, meta, raw, siteUrl }) {
	const site = normalizeOrigin(siteUrl);
	const tags = Array.isArray(meta.tags) ? meta.tags : [];
	const body = sections(raw);

	const ingredients = listGroups(body.ingredients ?? []).flatMap((g) => g.items);

	// Instructions split into "### " subheadings become HowToSections; a plain
	// numbered list becomes a flat list of steps.
	const instructionGroups = listGroups(body.instructions ?? [], { paragraphs: true });
	const instructions = instructionGroups.some((g) => g.name)
		? instructionGroups
				.map((g) =>
					g.name
						? { '@type': 'HowToSection', name: g.name, itemListElement: steps(g.items) }
						: steps(g.items)
				)
				.flat()
		: steps(instructionGroups.flatMap((g) => g.items));

	const servings = String(meta.servings ?? '').match(/\d+/)?.[0];

	/** @type {Record<string, string> | undefined} */
	let nutrition;
	if (meta.nutrition) {
		nutrition = { '@type': 'NutritionInformation' };
		for (const [key, prop] of Object.entries(NUTRITION)) {
			const value = meta.nutrition[key];
			if (value === undefined || value === null || value === '') continue;
			nutrition[prop] = key === 'calories' ? `${value} calories` : String(value);
		}
	}

	const image = typeof meta.image === 'string' ? meta.image : undefined;
	const absolute = (/** @type {string} */ path) =>
		/^https?:\/\//.test(path) || !site ? path : `${site}${path}`;

	/** @type {Record<string, any>} */
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Recipe',
		name: meta.title,
		description: meta.description,
		image: image ? [absolute(image)] : undefined,
		url: site ? `${site}/recipes/${slug}/` : undefined,
		author: { '@type': 'Organization', name: SITE_NAME, url: site ? `${site}/` : undefined },
		datePublished: meta.date,
		prepTime: toIsoDuration(meta.prepTime),
		cookTime: toIsoDuration(meta.cookTime),
		totalTime: toIsoDuration(meta.totalTime),
		recipeYield: servings ? [servings, `${servings} servings`] : undefined,
		recipeCategory: CATEGORIES[tags.find((t) => CATEGORIES[t])],
		recipeCuisine: tags.filter((t) => CUISINES[t]).map((t) => CUISINES[t]),
		suitableForDiet: tags.filter((t) => DIETS[t]).map((t) => DIETS[t]),
		keywords: tags.join(', ') || undefined,
		nutrition,
		recipeIngredient: ingredients,
		recipeInstructions: instructions
	};

	// Drop empty fields so the output stays clean for validators.
	for (const [key, value] of Object.entries(schema)) {
		if (value === undefined || (Array.isArray(value) && !value.length)) delete schema[key];
	}
	return schema;
}

/**
 * Serialises JSON-LD for inlining in a <script> tag. Escaping "<" keeps a
 * stray "</script>" in recipe text from closing the tag early.
 * @param {object} schema
 */
export function jsonLdScript(schema) {
	return (
		`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</` +
		'script>'
	);
}
