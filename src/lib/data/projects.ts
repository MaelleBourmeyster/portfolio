import { base } from '$app/paths';

export interface Project {
    slug: string;
    title: { en: string; fr: string };
    category: { en: string; fr: string };
    domain: string; // e.g. 'Visual Arts'
    domainSlug: string; // e.g. 'visual-arts'
    mainCategory: string; // e.g. 'Sculpture'
    categorySlug: string; // e.g. 'sculpture'
    subCategory: string;  // e.g. 'Bronze'
    year: string;
    image: string;
    thumbnail?: string; // Specific thumbnail for category page
    images?: string[]; // Auto-discovered images
    videos?: string[]; // Auto-discovered videos
    description: { en: string; fr: string };
    group: string; // Internal grouping identifier (Legacy, use subCategory)
}

export const projects: Project[] = [];
