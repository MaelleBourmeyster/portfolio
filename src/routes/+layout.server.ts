import type { LayoutServerLoad } from './$types';
import { getProjects } from '$lib/server/projects';

export const load: LayoutServerLoad = async () => {
    const projects = getProjects();
    return {
        projects
    };
};
