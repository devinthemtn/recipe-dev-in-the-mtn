// YouTube videos and channels recommended on /coffee/videos. Add an entry to
// either list and it shows up on the next build. Set `draft: true` to hide one
// without deleting it.
//
// Videos are grouped on the page by `category`, in the order of `categories`
// below; a category not listed there is shown at the end.
//
// Video fields:
//   title    — the video's title (or your own short name for it)
//   url      — any YouTube link: youtube.com/watch?v=…, youtu.be/…, or /shorts/…
//   channel  — who made it
//   category — one of `categories` below
//   date     — the date you added it ("2026-10-25"); the newest show first on /coffee
//   note     — optional: why it's worth watching
//
// Channel fields: name, url, note (optional).

export const categories = [
	'Brewing',
	'Espresso',
	'Grinders & gear',
	'Beans & roasting',
	'Deep dives'
];

/** @type {Array<{ title: string, url: string, channel: string, category: string, date: string, note?: string, draft?: boolean }>} */
export const videos = [
	// {
	// 	title: 'The video title',
	// 	url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
	// 	channel: 'Channel name',
	// 	category: 'Brewing',
	// 	date: '2026-10-25',
	// 	note: 'Why I keep coming back to this one.'
	// },
	{
		title: 'One Of These Coffee Robots Just Beat Keurig',
		url: 'https://youtu.be/En-YPVqqr6k',
		channel: 'Daddy Got Coffee',
		category: 'Grinders & gear',
		date: '2026-10-25',
		note: 'Three automatic pour-over machines head to head: the xBloom Studio, Cosori Juni and Breville Spiral Luxe. The Breville wins on convenience.'
	},
    {
        title: 'Hoffmann - The best Milk Foamer for coffee',
        url: 'https://youtu.be/cFdTzo6fVec?si=wN5F8dvSyTQ6Jnes',
        channel: "James Hoffmann",
        category: 'Milk Foamer',
        date: '2026-10-29',
        note: 'Hoffmann looks at a few diffrent kinds of milk foamers/steamers'
    },
	{
		title: 'Nespresso Should Have Made This',
		url: 'https://youtu.be/Zcs5JVUZvZg?si=2bFTRlAF3afZp8g1',
		channel: 'Daddy Got Coffee',
		category: 'Espresso',
		date: '2026-10-29',
		note: 'A look at the Milton Coffee Co. Line1, a $475 all-metal espresso machine for Nespresso OriginalLine capsules.'
	}
];

/** @type {Array<{ name: string, url: string, note?: string, draft?: boolean }>} */
export const channels = [
	// {
	// 	name: 'Channel name',
	// 	url: 'https://www.youtube.com/@handle',
	// 	note: 'What they cover and why I watch.'
	// }
];

/**
 * The 11-character video id from a YouTube URL, or undefined if it isn't one.
 * @param {string} url
 */
export function youtubeId(url) {
	const match = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
	return match?.[1];
}

export function getVideoGroups() {
	const published = videos.filter((v) => !v.draft);
	const order = [...categories, ...new Set(published.map((v) => v.category))].filter(
		(c, i, all) => all.indexOf(c) === i
	);
	return order
		.map((category) => ({
			category,
			videos: published
				.filter((v) => v.category === category)
				.map((v) => ({ ...v, id: youtubeId(v.url) }))
		}))
		.filter((group) => group.videos.length > 0);
}

/**
 * The most recently added videos, newest first.
 * @param {number} count
 */
export function getRecentVideos(count) {
	return videos
		.filter((v) => !v.draft)
		.map((v) => ({ ...v, id: youtubeId(v.url) }))
		.sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0))
		.slice(0, count);
}

export function getChannels() {
	return channels.filter((c) => !c.draft);
}
