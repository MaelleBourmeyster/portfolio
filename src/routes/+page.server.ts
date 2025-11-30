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

			// Sort by year descending
			catProjects.sort((a, b) => parseInt(b.year || '0') - parseInt(a.year || '0'));

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
