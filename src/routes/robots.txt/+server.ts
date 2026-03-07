import type { RequestHandler } from '@sveltejs/kit';
import { getAbsoluteUrl } from '$lib/url';

export const prerender = true;

export const GET: RequestHandler = () => {
	const sitemapUrl = getAbsoluteUrl('sitemap.xml');
	const body = `User-agent: *
Disallow:

Sitemap: ${sitemapUrl}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
