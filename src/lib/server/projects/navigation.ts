import type { NavigationItem } from '$lib/types';
import type { Project } from './schema';
import { formatName, getTranslationKey } from './structure';

export function buildNavigationTree(projects: Project[]): NavigationItem[] {
	const domains = new Map<string, Set<string>>();

	projects.forEach((p) => {
		if (!domains.has(p.domainSlug)) {
			domains.set(p.domainSlug, new Set());
		}
		domains.get(p.domainSlug)?.add(p.categorySlug);
	});

	return Array.from(domains.entries()).map(([domainSlug, categories]) => ({
		name: formatName(domainSlug),
		slug: domainSlug,
		translationKey: getTranslationKey(domainSlug),
		categories: Array.from(categories).map((catSlug) => ({
			name: formatName(catSlug),
			slug: catSlug,
			href: `/${domainSlug}/${catSlug}`,
			translationKey: getTranslationKey(catSlug)
		}))
	}));
}
