import type { RequestHandler } from '@sveltejs/kit';
import { getProjects } from '$lib/server/projects';
import { getAbsoluteUrl } from '$lib/config';

export const prerender = true;

function formatDate(date: Date) {
	return date.toISOString().split('T')[0];
}

function yearToDate(year: string | undefined): Date {
	if (!year) return new Date();
	const numericYear = Number.parseInt(year, 10);
	if (Number.isNaN(numericYear) || year === '0000') return new Date();
	return new Date(`${numericYear}-01-01T00:00:00Z`);
}

export const GET: RequestHandler = async () => {
	const projects = await getProjects();
	const today = new Date();

	type UrlEntry = {
		loc: string;
		lastmod: string;
		changefreq?: string;
		priority?: string;
	};

	const urls: UrlEntry[] = [];

	const addUrl = (path: string, lastmod: Date, options?: Partial<UrlEntry>) => {
		urls.push({
			loc: getAbsoluteUrl(path),
			lastmod: formatDate(lastmod),
			changefreq: options?.changefreq,
			priority: options?.priority
		});
	};

	// Static pages
	addUrl('', today, { changefreq: 'weekly', priority: '1.0' });
	addUrl('about', today, { changefreq: 'monthly', priority: '0.8' });
	addUrl('contact', today, { changefreq: 'monthly', priority: '0.8' });
	addUrl('legal', today, { changefreq: 'yearly', priority: '0.5' });

	// Categories (domain/category)
	const categoryMap = new Map<string, Date>();
	for (const project of projects) {
		const key = `${project.domainSlug}/${project.categorySlug}`;
		const projectDate = yearToDate(project.year);
		const existing = categoryMap.get(key);
		if (!existing || projectDate > existing) {
			categoryMap.set(key, projectDate);
		}
	}

	for (const [key, lastmod] of categoryMap.entries()) {
		addUrl(`/${key}`, lastmod, { changefreq: 'weekly', priority: '0.8' });
	}

	// Individual projects
	for (const project of projects) {
		addUrl(
			`/${project.domainSlug}/${project.categorySlug}/${project.subCategory}/${project.slug}`,
			yearToDate(project.year),
			{ changefreq: 'monthly', priority: '0.6' }
		);
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
