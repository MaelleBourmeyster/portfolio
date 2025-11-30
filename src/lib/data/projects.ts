import { base } from '$app/paths';

export interface Project {
    slug: string;
    title: { en: string; fr: string };
    category: { en: string; fr: string };
    mainCategory: string; // e.g. 'Sculpture'
    subCategory: string;  // e.g. 'Bronze'
    year: string;
    image: string;
    thumbnail?: string; // Specific thumbnail for category page
    images?: string[]; // Auto-discovered images
    description: { en: string; fr: string };
    group: string; // Internal grouping identifier (Legacy, use subCategory)
}

export const projects: Project[] = [];
