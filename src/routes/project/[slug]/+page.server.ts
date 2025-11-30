import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params }) => {
    const projects = getProjects();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        throw error(404, 'Project not found');
    }

    return {
        project
    };
};
