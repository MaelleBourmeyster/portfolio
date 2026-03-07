import { base } from '$app/paths';
import { siteConfig } from '$lib/config';

export interface ProjectPathSegments {
	domainSlug: string;
	categorySlug: string;
	subCategory: string;
	slug: string;
}

/** Build relative project path (e.g. "domain/category/subcategory/slug") */
export function getProjectPath(project: ProjectPathSegments): string {
	return `${project.domainSlug}/${project.categorySlug}/${project.subCategory}/${project.slug}`;
}

/** Append lang param to URL; returns { en, fr } alternate URLs */
export function getAlternateUrls(baseUrl: string): { en: string; fr: string } {
	const separator = baseUrl.includes('?') ? '&' : '?';
	return {
		en: `${baseUrl}${separator}lang=en`,
		fr: `${baseUrl}${separator}lang=fr`
	};
}

/**
 * Constructs an absolute URL for the site
 * @param path - Relative path (e.g., 'contact', '/about', 'visual-arts/sculpture')
 * @returns Full absolute URL including base path
 */
export function getAbsoluteUrl(path: string = ''): string {
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	return `${siteConfig.url}${base}${cleanPath ? '/' + cleanPath : ''}`;
}

/**
 * Constructs an absolute URL for an image
 * @param imagePath - Path to image (relative or absolute)
 * @returns Full absolute URL for the image
 */
export function getImageUrl(imagePath: string): string {
	if (imagePath.startsWith('http')) return imagePath;
	const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

	if (base && normalizedPath.startsWith(`${base}/`)) {
		return `${siteConfig.url}${normalizedPath}`;
	}

	return `${siteConfig.url}${base}${normalizedPath}`;
}

/** Open Graph locale from language code */
export function getOgLocale(lang: 'en' | 'fr'): string {
	return lang === 'en' ? 'en_US' : 'fr_FR';
}
