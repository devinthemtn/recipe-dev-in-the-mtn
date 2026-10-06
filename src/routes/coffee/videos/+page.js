import { getChannels, getVideoGroups } from '$lib/content/coffee/videos.js';

export function load() {
	return { groups: getVideoGroups(), channels: getChannels() };
}
