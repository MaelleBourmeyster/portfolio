import { getAbsoluteUrl } from '$lib/url';
import type { Project } from './projects/schema';

export interface SitemapUrlEntry {
	loc: string;
	lastmod: string;
	changefreq?: string;
	priority?: string;
}

function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

function getAlternateUrls(loc: string): { en: string; fr: string } {
	const separator = loc.includes('?') ? '&' : '?';
	return {
		en: `${loc}${separator}lang=en`,
		fr: `${loc}${separator}lang=fr`
	};
}

function yearToDate(year: string | undefined): Date {
	if (!year) return new Date();
	const numericYear = Number.parseInt(year, 10);
	if (Number.isNaN(numericYear) || year === '0000') return new Date();
	return new Date(`${numericYear}-01-01T00:00:00Z`);
}

export function buildSitemapUrls(projects: Project[]): SitemapUrlEntry[] {
	const today = new Date();
	const urls: SitemapUrlEntry[] = [];

	const addUrl = (path: string, lastmod: Date, options?: Partial<SitemapUrlEntry>) => {
		urls.push({
			loc: getAbsoluteUrl(path),
			lastmod: formatDate(lastmod),
			changefreq: options?.changefreq,
			priority: options?.priority
		});
	};

	addUrl('', today, { changefreq: 'weekly', priority: '1.0' });
	addUrl('about', today, { changefreq: 'monthly', priority: '0.8' });
	addUrl('contact', today, { changefreq: 'monthly', priority: '0.8' });
	addUrl('legal', today, { changefreq: 'yearly', priority: '0.5' });

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

	for (const project of projects) {
		addUrl(
			`/${project.domainSlug}/${project.categorySlug}/${project.subCategory}/${project.slug}`,
			yearToDate(project.year),
			{ changefreq: 'monthly', priority: '0.6' }
		);
	}

	return urls;
}

export function renderSitemapXml(urls: SitemapUrlEntry[]): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
	.map((url) => {
		const { en, fr } = getAlternateUrls(url.loc);
		return `  <url>
    <loc>${url.loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${fr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
    <lastmod>${url.lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
	})
	.join('\n')}
</urlset>`;
}
