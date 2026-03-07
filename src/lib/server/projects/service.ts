import path from 'path';
import { dev } from '$app/environment';
import type { NavigationItem, HomeCategory } from '$lib/types';
import type { Project } from './schema';
import { findProjects } from './data';
import { getProjectsSignature } from './signature';
import { buildNavigationTree } from './navigation';
import { buildHomeCategories } from './categories';

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

	return inFlight;
}

export async function getNavigationTree(projects?: Project[]): Promise<NavigationItem[]> {
	const allProjects = projects ?? (await getProjects());
	return buildNavigationTree(allProjects);
}

export async function getHomeCategories(): Promise<HomeCategory[]> {
	const projects = await getProjects();
	const navigationTree = buildNavigationTree(projects);
	return buildHomeCategories(navigationTree, projects);
}
