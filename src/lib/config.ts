import { dev } from '$app/environment';
import { URLS, DEFAULTS } from '$lib/constants';

export const siteConfig = {
	url: dev ? URLS.DEVELOPMENT : URLS.PRODUCTION,
	name: 'Maëlle Bourmeyster Portfolio',
	author: 'Maëlle Bourmeyster',
	email: 'maelle.bourmeyster@gmail.com',
	defaultImage: DEFAULTS.IMAGE,
	defaultDescription: DEFAULTS.DESCRIPTION,
	address: {
		locality: 'Lyon',
		country: 'FR'
	},
	locationDisplay: 'Lyon, France',
	socialHandle: '@maellebourmeyster',
	sameAs: ['https://x.com/maellebourmeyster', 'https://www.instagram.com/maellebourmeyster']
};
