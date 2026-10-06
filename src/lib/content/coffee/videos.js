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

/** @type {Array<{ title: string, url: string, channel: string, category: string, note?: string, draft?: boolean }>} */
export const videos = [
	// {
	// 	title: 'The video title',
	// 	url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
	// 	channel: 'Channel name',
	// 	category: 'Brewing',
	// 	note: 'Why I keep coming back to this one.'
	// }
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

export function getChannels() {
	return channels.filter((c) => !c.draft);
}
