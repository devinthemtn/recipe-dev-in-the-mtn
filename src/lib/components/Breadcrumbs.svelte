<script>
	import { page } from '$app/state';

	// Display names for URL segments. A segment not listed here is a slug, and
	// its crumb uses the page's frontmatter title (or a tidied-up slug).
	const labels = {
		recipes: 'Recipes',
		ingrts: 'Ingredients',
		prods: 'Products',
		coffee: 'Coffee',
		products: 'Products',
		reviews: 'Reviews',
		videos: 'Videos',
		blog: 'Blog',
		legal: 'Legal',
		newsletter: 'Newsletter',
		thanks: 'Thanks'
	};

	/** @param {string} slug */
	function prettify(slug) {
		const text = decodeURIComponent(slug).replace(/-/g, ' ');
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	// Every crumb links to a prefix of the current path, so hrefs already
	// include any base path and the trailing slash the site uses.
	const segments = $derived(page.url.pathname.split('/').filter(Boolean));
	// The site root, e.g. "/" (or "/base/" if the site is ever served from a subpath).
	const home = $derived(page.url.pathname.slice(0, page.url.pathname.indexOf(segments[0] ?? '')));
	const crumbs = $derived.by(() => {
		return segments.map((segment, i) => {
			const last = i === segments.length - 1;
			return {
				href: `${home}${segments.slice(0, i + 1).join('/')}/`,
				label: (last && page.data.meta?.title) || labels[segment] || prettify(segment)
			};
		});
	});
</script>

{#if crumbs.length > 0 && page.status === 200}
	<!-- eslint-disable svelte/no-navigation-without-resolve -- hrefs are prefixes of the current, already-resolved URL -->
	<nav aria-label="Breadcrumb" class="mb-6 print:hidden">
		<ol
			class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-stone-500 dark:text-stone-400"
		>
			<li>
				<a href={home} class="font-medium hover:text-stone-900 dark:hover:text-stone-100">Home</a>
			</li>
			{#each crumbs as crumb, i (crumb.href)}
				<li class="flex items-center gap-1.5">
					<span aria-hidden="true" class="text-stone-400 dark:text-stone-600">/</span>
					{#if i === crumbs.length - 1}
						<span aria-current="page" class="truncate text-stone-700 dark:text-stone-300"
							>{crumb.label}</span
						>
					{:else}
						<a href={crumb.href} class="font-medium hover:text-stone-900 dark:hover:text-stone-100"
							>{crumb.label}</a
						>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{/if}
