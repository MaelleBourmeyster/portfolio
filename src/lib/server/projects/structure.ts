import path from 'path';
import { formatSlugToTitle } from '$lib/utils';

export function getTranslationKey(slug: string): string {
	return slug.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export interface ProjectStructure {
	domainSlug: string;
	categorySlug: string;
	subCategory: string;
	relative: string;
	domain: string;
	mainCategory: string;
}

export function parseProjectStructure(
	projectDir: string,
	rootDir: string
): ProjectStructure | null {
	const relative = path.relative(rootDir, projectDir).replace(/\\/g, '/');
	const parts = relative.split('/');

	// We expect: domain / category / subcategory / slug
	if (parts.length < 4) {
		return null;
	}

	const [domainSlug, categorySlug, subCategory] = parts;

	return {
		domainSlug,
		categorySlug,
		subCategory,
		relative,
		domain: formatSlugToTitle(domainSlug),
		mainCategory: formatSlugToTitle(categorySlug)
	};
}
