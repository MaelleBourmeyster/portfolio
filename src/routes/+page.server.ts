import type { PageServerLoad } from './$types';
import { getNavigationTree, getProjects } from '$lib/server/projects';

export const load: PageServerLoad = async () => {
	const navigationTree = await getNavigationTree();
	const projects = await getProjects();

	const categories = [];

	for (const domain of navigationTree) {
		for (const cat of domain.categories) {
			// Find latest project for this category
			const catProjects = projects.filter((p) => p.categorySlug === cat.slug && p.image);

			// Sort by year descending (robust extraction of first 4-digit year)
			catProjects.sort((a, b) => {
				const getYear = (y: string | undefined) => {
					const match = (y || '').match(/\d{4}/);
					return match ? parseInt(match[0], 10) : 0;
				};
				return getYear(b.year) - getYear(a.year);
			});

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
