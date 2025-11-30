import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadProject } from '$lib/server/projects';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
	const { domain, category, subcategory, slug } = params;
	const projectsDir = path.resolve('static/projects');
	const projectDir = path.join(projectsDir, domain, category, subcategory, slug);

	const project = await loadProject(projectDir, projectsDir);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		project
	};
};
