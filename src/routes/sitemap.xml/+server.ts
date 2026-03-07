import type { RequestHandler } from '@sveltejs/kit';
import { getProjects } from '$lib/server/projects';
import { buildSitemapUrls, renderSitemapXml } from '$lib/server/sitemap';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const projects = await getProjects();
	const urls = buildSitemapUrls(projects);
	const xml = renderSitemapXml(urls);

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
