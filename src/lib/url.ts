import qs from 'qs';

export interface Service {
	domain: string;
	shortNames: string[];
	color: string;
	subDomains?: string[];
	searchParam?: string;
	additionalSearchParams?: Record<string, string>;
	isHttp?: boolean;
}

export class Url {
	private url: string;
	private http = 'https://';
	private subdomains: string[] = [];
	private additionalSearchParams: Record<string, string> = {};
	private searchParam = '';
	public shortNames: string[];
	public color: string;
	public name: string;

	constructor(service: Service) {
		if (service.isHttp) this.http = 'http://';
		if (service.subDomains) this.subdomains = service.subDomains;
		if (service.additionalSearchParams)
			this.additionalSearchParams = service.additionalSearchParams;
		if (service.searchParam) this.searchParam = service.searchParam;

		this.name = service.domain;
		this.color = service.color;
		this.shortNames = service.shortNames;
		this.url = service.domain
			.replace(/https?:\/\//, '')
			.replace('www.', '')
			.replace(/\/$/, '');
	}

	private searchParamsToString(query?: string) {
		return '?' + qs.stringify({ ...this.additionalSearchParams, [this.searchParam]: query });
	}

	private subdomainsToString() {
		return this.subdomains.reduce((acc, curr) => acc + '/' + curr, '');
	}

	get homepage() {
		return this.http + this.url;
	}

	searchLink(query: string) {
		return this.http + this.url + this.subdomainsToString() + this.searchParamsToString(query);
	}
}

export class Services {
	services: Url[];

	findByShortName(name: string): Url | undefined {
		return this.services.find((s) => s.shortNames.includes(name));
	}
}

export const services = new Services();
services.services = [
	new Url({
		domain: 'youtube.com',
		subDomains: ['results'],
		searchParam: 'search_query',
		shortNames: ['y', 'yt'],
		color: '#ff1a1a'
	}),
	new Url({
		domain: 'github.com/aleksanderbrymora',
		additionalSearchParams: { tab: 'repositories' },
		searchParam: 'q',
		shortNames: ['ghr'],
		color: '#383838'
	}),
	new Url({
		domain: 'localhost:3000',
		shortNames: ['l'],
		isHttp: true,
		color: '#636363'
	}),
	new Url({
		domain: 'notion.so',
		shortNames: ['not', 'notion'],
		color: '#535353'
	}),
	new Url({
		domain: 'drive.google.com',
		shortNames: ['drive'],
		color: '#ffff37'
	}),
	new Url({
		domain: 'twitter.com',
		shortNames: ['t'],
		color: '#37c3ff'
	}),
	new Url({
		domain: 'linkedin.com',
		shortNames: ['li'],
		color: '#5ab0f7'
	}),
	new Url({
		domain: 'mail.google.com/mail/u/1',
		shortNames: ['mwork', 'm1'],
		color: '#cd3b2f'
	}),
	new Url({
		domain: 'mail.google.com/mail/u/0',
		shortNames: ['m', 'm0'],
		color: '#cd3b2f'
	}),
	new Url({
		domain: 'calendar.google.com',
		shortNames: ['cal'],
		color: '#3f3fff'
	}),
	new Url({
		domain: 'figma.com',
		shortNames: ['figma', 'fig'],
		color: '#ad37ff'
	}),
	new Url({
		domain: 'developer.mozilla.org',
		subDomains: ['en-US', 'search'],
		searchParam: 'q',
		shortNames: ['mdn', ';'],
		color: '#6a6a6a'
	}),
	new Url({
		domain: 'github.com',
		subDomains: ['search'],
		searchParam: 'q',
		shortNames: ['gh'],
		color: '#383838'
	}),
	new Url({
		domain: 'npmjs.com',
		subDomains: ['search'],
		searchParam: 'q',
		shortNames: ['npm'],
		color: '#c9305b'
	})
];
