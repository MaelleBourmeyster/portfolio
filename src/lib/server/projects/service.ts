import path from 'path';
import { dev } from '$app/environment';
import type { NavigationItem } from '$lib/types';
import type { Project } from './schema';
import { findProjects, getProjectsSignature, formatName, getTranslationKey } from './data';

// --- Caching State ---
let cachedProjects: Project[] | null = null;
let cachedSignature: string | null = null;
let inFlight: Promise<Project[]> | null = null;

function sortProjects(projects: Project[]): void {
	projects.sort((a, b) => {
		return (
			a.domainSlug.localeCompare(b.domainSlug) ||
			a.categorySlug.localeCompare(b.categorySlug) ||
			a.subCategory.localeCompare(b.subCategory) ||
			a.slug.localeCompare(b.slug)
		);
	});
}

export async function getProjects(): Promise<Project[]> {
	const projectsDir = path.resolve('static/projects');

	// In dev, we might want to skip caching or handle it differently,
	// but keeping the signature check is good practice even in dev
	// to avoid unnecessary re-scans if nothing changed.
	// However, the original code forced a re-scan in dev.
	if (dev) {
		const projects = await findProjects(projectsDir, projectsDir);
		sortProjects(projects);
		return projects;
	}

	const signature = await getProjectsSignature(projectsDir);

	if (cachedProjects && cachedSignature === signature) {
		return cachedProjects;
	}

	if (inFlight) return inFlight;

	inFlight = (async () => {
		try {
			const projects = await findProjects(projectsDir, projectsDir);
			sortProjects(projects);

			cachedProjects = projects;
			cachedSignature = signature;

			return projects;
		} finally {
			inFlight = null;
		}
	})();

	const result = await inFlight;

	return result;
}

export async function getNavigationTree(): Promise<NavigationItem[]> {
	const projects = await getProjects();
	const domains = new Map<string, Set<string>>();

	projects.forEach((p) => {
		if (!domains.has(p.domainSlug)) {
			domains.set(p.domainSlug, new Set());
		}
		domains.get(p.domainSlug)?.add(p.categorySlug);
	});

	const tree = Array.from(domains.entries()).map(([domainSlug, categories]) => {
		return {
			name: formatName(domainSlug),
			slug: domainSlug,
			translationKey: getTranslationKey(domainSlug),
			categories: Array.from(categories).map((catSlug) => ({
				name: formatName(catSlug),
				slug: catSlug,
				href: `/${domainSlug}/${catSlug}`,
				translationKey: getTranslationKey(catSlug)
			}))
		};
	});

	return tree;
}
