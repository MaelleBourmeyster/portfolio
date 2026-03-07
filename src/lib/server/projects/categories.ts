import type { HomeCategory, NavigationItem } from '$lib/types';
import type { Project } from './schema';
import { getYearValue } from '../utils';

export function buildHomeCategories(
	navigationTree: NavigationItem[],
	projects: Project[]
): HomeCategory[] {
	const projectsByCategory = new Map<string, Project[]>();
	for (const p of projects) {
		if (p.image) {
			const existing = projectsByCategory.get(p.categorySlug) || [];
			existing.push(p);
			projectsByCategory.set(p.categorySlug, existing);
		}
	}

	const categories: HomeCategory[] = [];

	for (const domain of navigationTree) {
		for (const cat of domain.categories) {
			const catProjects = projectsByCategory.get(cat.slug) || [];
			catProjects.sort((a, b) => getYearValue(b.year) - getYearValue(a.year));

			let image = '';
			let year = new Date().getFullYear().toString();

			if (catProjects.length > 0) {
				image = catProjects[0].image || '';
				year = catProjects[0].year || year;
			}

			categories.push({
				slug: cat.slug,
				translationKey: cat.translationKey,
				name: cat.name,
				href: cat.href,
				image,
				year
			});
		}
	}

	return categories;
}
