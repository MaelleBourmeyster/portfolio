import { getAbsoluteUrl, getImageUrl } from '$lib/url';
import { siteConfig } from '$lib/config';

export interface PersonJsonLdInput {
	jobTitle: string;
	description: string;
}

export function buildPersonJsonLd(input: PersonJsonLdInput): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteConfig.author,
		url: getAbsoluteUrl(),
		image: getImageUrl(siteConfig.defaultImage),
		jobTitle: input.jobTitle,
		description: input.description,
		sameAs: siteConfig.sameAs,
		address: {
			'@type': 'PostalAddress',
			addressLocality: siteConfig.address.locality,
			addressCountry: siteConfig.address.country
		},
		email: siteConfig.email
	};
}

export interface CreativeWorkJsonLdInput {
	title: string;
	description: string;
	image: string;
	url: string;
	author: string;
	datePublished: string;
	genre?: string;
}

export function buildCreativeWorkJsonLd(input: CreativeWorkJsonLdInput): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: input.title,
		description: input.description,
		image: getImageUrl(input.image),
		url: input.url,
		author: {
			'@type': 'Person',
			name: input.author
		},
		datePublished: input.datePublished,
		...(input.genre && { genre: input.genre })
	};
}
