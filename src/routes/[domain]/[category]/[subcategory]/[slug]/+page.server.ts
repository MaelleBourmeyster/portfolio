import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadProject } from '$lib/server/projects';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
	const { domain, category, subcategory, slug } = params;
	const slugPattern = /^[a-z0-9-]+$/;
	if (![domain, category, subcategory, slug].every((part) => slugPattern.test(part))) {
		throw error(404, 'Not found');
	}

	const projectsDir = path.resolve('static/projects');
	const projectDir = path.resolve(projectsDir, domain, category, subcategory, slug);

	// Guard against path traversal when resolving
	if (!projectDir.startsWith(projectsDir)) {
		throw error(400, 'Invalid path');
	}

	const project = await loadProject(projectDir, projectsDir);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		project
	};
};
