import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params }) => {
    const projects = await getProjects();
    const project = projects.find((p) =>
        p.slug === params.slug &&
        p.domainSlug === params.domain &&
        p.categorySlug === params.category &&
        p.subCategory === params.subcategory
    );

    if (!project) {
        throw error(404, 'Project not found');
    }

    return {
        project
    };
};
