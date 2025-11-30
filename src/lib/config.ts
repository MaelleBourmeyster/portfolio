import { dev } from '$app/environment';
import { base } from '$app/paths';

export const siteConfig = {
	// Base URL according to environment
	url: dev ? 'http://localhost:5173' : 'https://maellebourmeyster.github.io',

	// Site information
	name: 'Maëlle Bourmeyster Portfolio',
	author: 'Maëlle Bourmeyster',
	email: 'maelle.bourmeyster@gmail.com',

	// Default OG image
	defaultImage: '/images/maelle/maelle-1.png',

	// Default description
	defaultDescription: 'Multidisciplinary Artist - Sculpture, Drawing, Digital Arts'
};

/**
 * Constructs an absolute URL for the site
 * @param path - Relative path (e.g., 'contact', '/about', 'visual-arts/sculpture')
 * @returns Full absolute URL including base path
 */
export function getAbsoluteUrl(path: string = ''): string {
	// Remove leading slash if present
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	// Build full URL with base path
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

	// If the path already contains the base (e.g. /portfolio/...), avoid duplicating it
	if (base && normalizedPath.startsWith(`${base}/`)) {
		return `${siteConfig.url}${normalizedPath}`;
	}

	return `${siteConfig.url}${base}${normalizedPath}`;
}
