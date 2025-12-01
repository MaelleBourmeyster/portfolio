import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params }) => {
	const { domain, category } = params;

	const projects = await getProjects();
	const filteredProjects = projects.filter(
		(p) => p.domainSlug === domain && p.categorySlug === category
	);

	if (filteredProjects.length === 0) {
		error(404, {
			message: `No projects found in category "${category}"`
		});
	}

	// Get translation key from first project
	const translationKey = filteredProjects[0]?.translationKey || category;

	return {
		projects: filteredProjects,
		domainSlug: domain,
		categorySlug: category,
		translationKey
	};
};
