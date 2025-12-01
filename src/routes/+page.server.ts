import type { PageServerLoad } from './$types';
import { getNavigationTree, getProjects } from '$lib/server/projects';
import type { HomeCategory } from '$lib/types';

export const load: PageServerLoad = async () => {
	const projects = await getProjects();
	const navigationTree = await getNavigationTree(projects);

	// Optimization: Group projects by category for O(1) lookup
	const projectsByCategory = new Map<string, typeof projects>();
	for (const p of projects) {
		if (p.image) {
			const existing = projectsByCategory.get(p.categorySlug) || [];
			existing.push(p);
			projectsByCategory.set(p.categorySlug, existing);
		}
	}

	// Helper for year extraction (defined once)
	const getYearValue = (yearStr: string | undefined): number => {
		if (!yearStr) return 0;
		const match = yearStr.match(/\d{4}/);
		return match ? parseInt(match[0], 10) : 0;
	};

	const categories: HomeCategory[] = [];

	for (const domain of navigationTree) {
		for (const cat of domain.categories) {
			const catProjects = projectsByCategory.get(cat.slug) || [];

			// Sort by year descending
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

	return {
		categories
	};
};
