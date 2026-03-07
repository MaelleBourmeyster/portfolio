import { base } from '$app/paths';
import { siteConfig } from '$lib/config';

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
