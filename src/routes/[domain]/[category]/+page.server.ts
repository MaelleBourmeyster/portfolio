import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTranslationKey } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params, parent }) => {
	const slugPattern = /^[a-z0-9-]+$/;
	const { domain, category } = params;

	if (!slugPattern.test(domain) || !slugPattern.test(category)) {
		throw error(404, 'Not found');
	}

	const { navigationTree, projects: parentProjects = [] } = await parent();

	const domainNode = navigationTree.find((d) => d.slug === domain);
	if (!domainNode) {
		throw error(404, 'Domain not found');
	}

	const categoryNode = domainNode.categories.find((c) => c.slug === category);
	if (!categoryNode) {
		throw error(404, 'Category not found');
	}

	const projects = parentProjects.filter(
		(p) => p.domainSlug === domain && p.categorySlug === category
	);

	if (projects.length === 0) {
		throw error(404, 'No projects found');
	}

	return {
		projects,
		categorySlug: category,
		domainSlug: domain,
		translationKey: getTranslationKey(category)
	};
};
