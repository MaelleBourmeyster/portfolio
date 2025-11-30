import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params }) => {
    const allProjects = getProjects();
    const projects = allProjects.filter(p =>
        p.domainSlug === params.domain &&
        p.categorySlug === params.category
    );

    return {
        projects,
        categorySlug: params.category,
        domainSlug: params.domain
    };
};
