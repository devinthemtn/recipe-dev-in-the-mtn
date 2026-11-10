<script>
	import { draw } from 'svelte/transition';
	import { prefersReducedMotion, Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { historyEras } from '$lib/content/coffee/historyEras.js';
	import { land, places, viewBox } from '$lib/content/coffee/worldMap.js';

	// How coffee spread around the world, by era of the "A History of Coffee"
	// series. `era` is an index into historyEras. A move with `from` draws an
	// arrow; one without is a dot for something that happened in that place.
	// `legend` moves are popular stories without good records behind them, and
	// `tea` marks tea's arrival, the one move here that isn't coffee.
	const moves = [
		{
			era: 0,
			from: 'ethiopia',
			to: 'yemen',
			when: '1400s',
			text: 'Coffee crosses the Red Sea to Yemen, where Sufis brew it'
		},

		{ era: 1, from: 'yemen', to: 'mecca', when: '~1500', text: 'Pilgrims carry it to Mecca' },
		{
			era: 1,
			from: 'mecca',
			to: 'cairo',
			when: '1500s',
			text: 'Traders take it up the Red Sea to Cairo'
		},
		{ era: 1, from: 'cairo', to: 'damascus', when: '1530s', text: 'Coffeehouses open in Damascus' },
		{
			era: 1,
			from: 'damascus',
			to: 'constantinople',
			when: '1554',
			text: 'The first coffeehouses open in Constantinople'
		},

		{
			era: 2,
			from: 'constantinople',
			to: 'venice',
			when: '1600s',
			text: 'Venetian traders bring it to Europe; Venice gets coffeehouses by the 1680s'
		},
		{
			era: 2,
			from: 'constantinople',
			to: 'paris',
			when: '1669',
			text: 'An Ottoman envoy makes it fashionable in Paris'
		},
		{
			era: 2,
			from: 'constantinople',
			to: 'marseille',
			when: '1671',
			text: "Marseille's first coffeehouse opens"
		},
		{
			era: 2,
			from: 'constantinople',
			to: 'vienna',
			when: '1685',
			text: "Vienna's first coffeehouse is licensed"
		},

		{
			era: 3,
			from: 'constantinople',
			to: 'london',
			when: '1650s',
			text: 'Traders bring it to Oxford (1650) and London (1652)'
		},

		{
			era: 4,
			from: 'canton',
			to: 'london',
			when: '1657',
			text: 'Tea arrives in London from China, and slowly takes over',
			tea: true
		},

		{
			era: 5,
			from: 'yemen',
			to: 'india',
			when: '1600s',
			text: 'Baba Budan smuggles seven seeds to southern India',
			legend: true
		},
		{
			era: 5,
			from: 'yemen',
			to: 'amsterdam',
			when: '1616',
			text: 'A Dutch merchant takes coffee plants from Mocha to Amsterdam'
		},
		{ era: 5, from: 'india', to: 'java', when: '1690s', text: 'The Dutch plant coffee on Java' },
		{
			era: 5,
			from: 'java',
			to: 'amsterdam',
			when: '1706',
			text: "A plant from Java reaches Amsterdam's botanical garden"
		},
		{
			era: 5,
			from: 'amsterdam',
			to: 'guianas',
			when: '1718',
			text: 'The Dutch and French plant coffee in the Guianas'
		},
		{
			era: 5,
			from: 'amsterdam',
			to: 'paris',
			when: '1714',
			text: 'Amsterdam gives a plant to Louis XIV, the ancestor of Typica'
		},
		{
			era: 5,
			from: 'yemen',
			to: 'reunion',
			when: '1715',
			text: 'The French plant coffee on Bourbon (Réunion), the start of the Bourbon variety'
		},
		{
			era: 5,
			from: 'paris',
			to: 'martinique',
			when: '~1723',
			text: 'Gabriel de Clieu carries a seedling to Martinique'
		},
		{ era: 5, from: 'guianas', to: 'belem', when: '1727', text: 'Coffee is smuggled into Brazil' },
		{
			era: 5,
			from: 'martinique',
			to: 'haiti',
			when: '1700s',
			text: "Coffee spreads across the Caribbean; Saint-Domingue becomes the world's biggest grower"
		},
		{
			era: 5,
			from: 'haiti',
			to: 'boston',
			when: '1773',
			text: 'After the Boston Tea Party, Caribbean coffee helps Americans switch from tea'
		},
		{
			era: 5,
			from: 'belem',
			to: 'brazil',
			when: '1800s',
			text: "Farms spread south and Brazil becomes the world's biggest grower"
		},
		{
			era: 5,
			from: 'haiti',
			to: 'costarica',
			when: '1800s',
			text: 'Coffee spreads through Central America'
		},
		{
			era: 5,
			from: 'haiti',
			to: 'colombia',
			when: '1800s',
			text: 'Colombia becomes a major grower'
		},
		{
			era: 5,
			from: 'brazil',
			to: 'hawaii',
			when: '1828',
			text: 'Coffee from Brazil, by way of Oʻahu, is planted in Kona, Hawaii'
		},
		{
			era: 5,
			to: 'ceylon',
			when: '1869',
			text: 'Leaf rust wipes out coffee in Ceylon, which turns to tea'
		},
		{ era: 5, to: 'congo', when: '1890s', text: 'Robusta is found growing wild in central Africa' },
		{
			era: 5,
			from: 'reunion',
			to: 'kenya',
			when: '1890s',
			text: 'French missionaries bring Bourbon coffee to Kenya'
		},

		{
			era: 6,
			from: 'ethiopia',
			to: 'panama',
			when: '1930s–2004',
			text: 'Gesha seeds collected in Ethiopia end up in Panama, and set auction records in 2004'
		},
		{
			era: 6,
			to: 'vietnam',
			when: '1990s',
			text: 'Vietnam becomes the second-largest grower, mostly robusta'
		},
		{ era: 6, to: 'costarica', when: '2012', text: 'Leaf rust hits Central America hard' }
	];

	// Map labels, and which side of the dot they sit on.
	/** @type {Record<string, [string, string]>} */
	const names = {
		ethiopia: ['Ethiopia', 'end'],
		yemen: ['Yemen', 'start'],
		mecca: ['Mecca', 'end'],
		cairo: ['Cairo', 'end'],
		damascus: ['Damascus', 'start'],
		constantinople: ['Constantinople', 'start'],
		venice: ['Venice', 'start'],
		marseille: ['Marseille', 'end'],
		paris: ['Paris', 'end'],
		vienna: ['Vienna', 'start'],
		amsterdam: ['Amsterdam', 'start'],
		london: ['London', 'end'],
		india: ['India', 'end'],
		ceylon: ['Ceylon', 'start'],
		java: ['Java', 'start'],
		reunion: ['Réunion', 'start'],
		martinique: ['Martinique', 'start'],
		haiti: ['Saint-Domingue', 'end'],
		guianas: ['Guianas', 'start'],
		belem: ['Brazil', 'start'],
		brazil: ['São Paulo', 'start'],
		costarica: ['Costa Rica', 'end'],
		colombia: ['Colombia', 'start'],
		hawaii: ['Hawaii', 'start'],
		kenya: ['Kenya', 'start'],
		congo: ['Congo', 'end'],
		vietnam: ['Vietnam', 'start'],
		panama: ['Panama', 'end'],
		boston: ['Boston', 'start'],
		canton: ['China', 'start']
	};

	/** A gentle arc from one place to another, bowed toward the top of the map. */
	function arc(/** @type {string} */ from, /** @type {string} */ to) {
		const [x0, y0] = places[from];
		const [x1, y1] = places[to];
		const dx = x1 - x0;
		const dy = y1 - y0;
		let nx = -dy;
		let ny = dx;
		if (ny > 0) [nx, ny] = [-nx, -ny];
		const len = Math.hypot(nx, ny) || 1;
		const bow = 0.2;
		const cx = (x0 + x1) / 2 + (nx / len) * Math.hypot(dx, dy) * bow;
		const cy = (y0 + y1) / 2 + (ny / len) * Math.hypot(dx, dy) * bow;
		return `M${x0},${y0} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x1},${y1}`;
	}

	const uid = $props.id();

	/** The era being shown, or null to show everything at once. */
	let selected = $state(/** @type {number | null} */ (null));
	let playing = $state(false);

	const visible = $derived(moves.filter((m) => selected === null || m.era <= selected));
	const current = $derived(selected === null ? [] : moves.filter((m) => m.era === selected));
	const labelled = $derived([...new Set(current.map((m) => m.to))]);
	const drawDuration = $derived(prefersReducedMotion.current ? 0 : 700);

	// The first four eras all happen between Ethiopia and England, which is a small
	// corner of a world map, so the map zooms in on it for those. The zoomed box
	// keeps the full map's shape so the page doesn't jump.
	const world = viewBox.split(' ').map(Number);
	const oldWorld = [270, 38, 540, (540 * world[3]) / world[2]];
	const zoomed = $derived(selected !== null && selected <= 3);
	const view = new Tween(world, { duration: 800, easing: cubicInOut });
	$effect(() => {
		view.set(zoomed ? oldWorld : world, { duration: prefersReducedMotion.current ? 0 : 800 });
	});
	// Scale lines, dots and labels with the zoom so they stay the same size on screen.
	const k = $derived(view.current[2] / world[2]);

	$effect(() => {
		if (!playing) return;
		const timer = setInterval(() => {
			if (selected === null || selected >= historyEras.length - 1) {
				playing = false;
			} else {
				selected += 1;
			}
		}, 2200);
		return () => clearInterval(timer);
	});

	function play() {
		if (playing) {
			playing = false;
			return;
		}
		selected = 0;
		playing = true;
	}

	/** @param {number | null} era */
	function choose(era) {
		playing = false;
		selected = era;
	}

	/** @param {{ era: number }} move */
	function opacity(move) {
		if (selected === null || move.era === selected) return 1;
		return 0.3;
	}
</script>

<figure class="not-prose my-8">
	<div
		class="flex flex-wrap items-center gap-2 print:hidden"
		role="group"
		aria-label="Choose an era"
	>
		<button
			type="button"
			onclick={play}
			class="flex items-center gap-2 rounded-full bg-stone-800 px-3 py-1 text-sm font-medium text-stone-50 hover:bg-stone-700 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
			><svg viewBox="0 0 10 10" class="size-2.5 fill-current" aria-hidden="true"
				>{#if playing}<path d="M1,0h3v10h-3zM6,0h3v10h-3z" />{:else}<path
						d="M1,0L10,5L1,10z"
					/>{/if}</svg
			>{playing ? 'Pause' : 'Play through time'}</button
		>
		<button
			type="button"
			onclick={() => choose(null)}
			aria-pressed={selected === null}
			class="rounded-full border px-3 py-1 text-sm {selected === null
				? 'border-stone-700 text-stone-900 dark:border-stone-300 dark:text-stone-100'
				: 'border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-600'}"
			>All</button
		>
		{#each historyEras as era, i (era.slug)}
			<button
				type="button"
				onclick={() => choose(i)}
				aria-pressed={selected === i}
				title="{era.name}, {era.span}"
				class="flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm {selected === i
					? 'border-stone-700 text-stone-900 dark:border-stone-300 dark:text-stone-100'
					: 'border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-600'}"
			>
				<span class="size-2 rounded-full {era.dot}" aria-hidden="true"></span>
				<span class="sr-only">Part </span>{era.part}<span class="sr-only">: {era.name}</span>
			</button>
		{/each}
	</div>

	<svg
		viewBox={view.current.join(' ')}
		class="mt-4 h-auto w-full"
		role="img"
		aria-label={selected === null
			? 'World map of how coffee spread from Ethiopia, across Arabia and Europe, to plantations in Asia, the Caribbean and the Americas'
			: `World map showing how coffee spread up to ${historyEras[selected].name}, ${historyEras[selected].span}`}
	>
		<defs>
			{#each historyEras as era, i (era.slug)}
				<marker
					id="{uid}-arrow-{i}"
					viewBox="0 0 10 10"
					refX="8"
					refY="5"
					markerWidth="5"
					markerHeight="5"
					orient="auto-start-reverse"
				>
					<path d="M0,0 L10,5 L0,10 z" class={era.fill} />
				</marker>
			{/each}
		</defs>

		<path d={land} class="fill-stone-200 dark:fill-stone-800" />

		{#each visible as move (move.era + move.to + (move.from ?? '') + move.when)}
			{@const era = historyEras[move.era]}
			<g opacity={opacity(move)} class="transition-opacity duration-500">
				{#if move.from}
					<path
						d={arc(move.from, move.to)}
						fill="none"
						stroke-width={2 * k}
						stroke-linecap="round"
						stroke-dasharray={move.tea
							? `${k} ${5 * k}`
							: move.legend
								? `${6 * k} ${5 * k}`
								: undefined}
						marker-end="url(#{uid}-arrow-{move.era})"
						class={era.stroke}
						transition:draw={{ duration: drawDuration }}
					/>
				{:else}
					<circle
						cx={places[move.to][0]}
						cy={places[move.to][1]}
						r={6 * k}
						fill="none"
						stroke-width={2 * k}
						class={era.stroke}
					/>
				{/if}
			</g>
		{/each}

		<!-- Where it all started. -->
		<circle cx={places.ethiopia[0]} cy={places.ethiopia[1]} r={5 * k} class={historyEras[0].fill} />

		{#each labelled as place (place)}
			{@const [x, y] = places[place]}
			{@const [label, anchor] = names[place]}
			<text
				x={anchor === 'end' ? x - 8 * k : x + 8 * k}
				y={y + 4 * k}
				font-size={13 * k}
				text-anchor={anchor}
				class="hidden fill-stone-800 stroke-paper font-medium sm:block dark:fill-stone-100 dark:stroke-paper-dark"
				style="paint-order: stroke; stroke-width: {3 * k}px; stroke-linejoin: round;">{label}</text
			>
		{/each}
	</svg>

	<div class="mt-3 min-h-24" aria-live="polite">
		{#if selected === null}
			<p class="text-sm text-stone-600 dark:text-stone-400">
				Starting from the dot in Ethiopia, each arrow is a step in coffee's journey, colored by era.
				Press play, or pick an era to see what happened when.
			</p>
		{:else}
			{@const era = historyEras[selected]}
			<p class="text-sm font-semibold text-stone-900 dark:text-stone-100">
				Part {era.part}: {era.name}
				<span class="font-normal text-stone-500">· {era.span}</span>
			</p>
			<ul class="mt-2 space-y-1.5">
				{#each current as move (move.to + move.when)}
					<li class="flex gap-2 text-sm text-stone-700 dark:text-stone-300">
						<span class="mt-1.5 size-2 shrink-0 rounded-full {era.dot}" aria-hidden="true"></span>
						<span>
							<span class="font-semibold text-stone-900 tabular-nums dark:text-stone-100"
								>{move.when}</span
							>
							{move.text}
							{#if move.legend}<span class="text-stone-500">(legend)</span>{/if}
						</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<figcaption class="mt-3 text-xs text-stone-500">
		Routes are simplified to show the general direction coffee traveled, not exact trade routes.
		Dashed lines are legends; the dotted line is tea, not coffee.
	</figcaption>
</figure>
