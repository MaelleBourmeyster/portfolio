import type { PageServerLoad } from './$types';
import { getProjects, getTranslationKey } from '$lib/server/projects';

export const load: PageServerLoad = async ({ params }) => {
    const allProjects = await getProjects();
    const projects = allProjects.filter(p =>
        p.domainSlug === params.domain &&
        p.categorySlug === params.category
    );

    return {
        projects,
        categorySlug: params.category,
        domainSlug: params.domain,
        translationKey: getTranslationKey(params.category)
    };
};
