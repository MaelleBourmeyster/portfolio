import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import type { PageLoad, EntryGenerator } from './$types';

export const load: PageLoad = ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        throw error(404, 'Project not found');
    }

    return {
        project
    };
};

export const entries: EntryGenerator = () => {
    return projects.map((project) => ({
        slug: project.slug
    }));
};
