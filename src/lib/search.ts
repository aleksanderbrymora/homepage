interface Search {
	domain: string;
	searchParam?: string;
	searchSubDomain?: string;
	additionalSearchParams?: Record<string, string>;
}

export const searchDict: Record<string, Search> = {
	y: { domain: 'https://youtube.com/', searchSubDomain: 'results', searchParam: 'search_query' },
	yt: { domain: 'https://youtube.com/', searchSubDomain: 'results', searchParam: 'search_query' },
	npm: { domain: 'https://www.npmjs.com/', searchSubDomain: 'search', searchParam: 'q' },
	gh: { domain: 'https://github.com/', searchSubDomain: 'search', searchParam: 'q' },
	figma: { domain: 'https://www.figma.com/' },
	fig: { domain: 'https://www.figma.com/' },
	cal: { domain: 'https://calendar.google.com/' },
	ghr: {
		domain: 'https://github.com/',
		searchSubDomain: 'aleksanderbrymora',
		searchParam: 'q',
		additionalSearchParams: { tab: 'repositories' }
	},
	mdn: {
		domain: 'https://developer.mozilla.org/en-US/',
		searchSubDomain: 'search',
		searchParam: 'q'
	}
};
