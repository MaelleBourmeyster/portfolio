import type { LayoutServerLoad } from './$types';
import { getProjects, getNavigationTree } from '$lib/server/projects';

export const load: LayoutServerLoad = async () => {
    const projects = getProjects();
    const navigationTree = getNavigationTree();
    return {
        projects,
        navigationTree
    };
};
