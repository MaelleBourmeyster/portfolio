import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params }) => {
	const { domain, category, subcategory, slug } = params;

	const projects = await getProjects();
	const project = projects.find(
		(p) =>
			p.domainSlug === domain &&
			p.categorySlug === category &&
			p.subCategory === subcategory &&
			p.slug === slug
	);

	if (!project) {
		error(404, {
			message: `Project "${slug}" not found in ${category}/${subcategory}`
		});
	}

	return { project };
};
