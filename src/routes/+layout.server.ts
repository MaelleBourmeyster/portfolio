import type { LayoutServerLoad } from './$types';
import { getProjects, getNavigationTree } from '$lib/server/projects';

export const load: LayoutServerLoad = async () => {
	const projects = await getProjects();
	const navigationTree = await getNavigationTree(projects);
	return {
		projects,
		navigationTree
	};
};
