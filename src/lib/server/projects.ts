import { promises as fs } from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { base } from '$app/paths';
import { dev } from '$app/environment';
import { translations } from '$lib/data/translations';
import { z } from 'zod';

// Dev-only logger to avoid polluting production logs
const logger = {
	error: (msg: string, data?: unknown) => {
		if (dev) {
			console.error(msg, data);
		}
	}
};

// --- Zod Schema ---
const LocalizedStringSchema = z.union([
	z.string(),
	z.object({
		en: z.string(),
		fr: z.string()
	})
]);

const ProjectDetailsSchema = z.object({
	title: LocalizedStringSchema,
	description: LocalizedStringSchema,
	year: z.string().optional(),
	image: z.string().optional(),
	thumbnail: z.string().optional(),
	group: z.string().optional()
});

type ProjectDetails = Omit<
	z.infer<typeof ProjectDetailsSchema>,
	'year' | 'image' | 'thumbnail' | 'group'
> & {
	year: string;
	image: string;
	thumbnail: string;
	group: string;
};

export type Project = ProjectDetails & {
	slug: string;
	domain: string;
	domainSlug: string;
	mainCategory: string;
	categorySlug: string;
	subCategory: string;
	category: { en: string; fr: string };
	images: string[];
	videos: string[];
	translationKey: string;
};

// --- Helper Functions ---

export function getTranslationKey(slug: string): string {
	return slug.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function formatName(slug: string): string {
	return slug
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join(' ');
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function discoverMedia(
	projectDir: string,
	urlPath: string,
	type: 'images' | 'videos'
): Promise<string[]> {
	const mediaDir = path.join(projectDir, type);
	if (!(await fileExists(mediaDir))) return [];

	const extensions = type === 'images' ? /\.(png|jpg|jpeg|webp|gif)$/i : /\.(mp4|webm|ogg|mov)$/i;

	const files = await fs.readdir(mediaDir);
	files.sort(); // ensure deterministic ordering
	return files
		.filter((file) => extensions.test(file))
		.map((file) => `${base}/projects/${urlPath}/${type}/${file}`);
}

import type { NavigationItem } from '$lib/types';

async function resolveImagePath(
	projectDir: string,
	urlPath: string,
	imageName: string | undefined
): Promise<string> {
	if (!imageName) return '';
	if (imageName.startsWith('http') || imageName.startsWith('/')) return imageName;

	const candidates = [
		{ path: imageName, url: `${base}/projects/${urlPath}/${imageName}` },
		{
			path: path.join('images', imageName),
			url: `${base}/projects/${urlPath}/images/${imageName}`
		},
		{ path: path.join('videos', imageName), url: `${base}/projects/${urlPath}/videos/${imageName}` }
	];

	// Check all candidates in parallel
	const results = await Promise.all(
		candidates.map(async (c) => {
			const exists = await fileExists(path.join(projectDir, c.path));
			return exists ? c.url : null;
		})
	);

	// Return the first one that exists
	return results.find((url) => url !== null) || `${base}/projects/${urlPath}/${imageName}`;
}

// --- Main Logic ---

function parseProjectStructure(projectDir: string, rootDir: string) {
	const relative = path.relative(rootDir, projectDir).replace(/\\/g, '/');
	const parts = relative.split('/');

	// We expect: domain / category / subcategory / slug
	if (parts.length < 4) {
		return null;
	}

	const [domainSlug, categorySlug, subCategory] = parts;

	return {
		domainSlug,
		categorySlug,
		subCategory,
		relative,
		domain: formatName(domainSlug),
		mainCategory: formatName(categorySlug)
	};
}

export async function loadProject(projectDir: string, rootDir: string): Promise<Project | null> {
	const slug = path.basename(projectDir);
	const structure = parseProjectStructure(projectDir, rootDir);

	if (!structure) {
		return null;
	}

	const detailsPath = path.join(projectDir, 'details.json');

	try {
		let content = await fs.readFile(detailsPath, 'utf-8');
		// Handle BOM
		if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);

		const rawJson = JSON.parse(content);

		// Validate with Zod
		const result = ProjectDetailsSchema.safeParse(rawJson);

		if (!result.success) {
			logger.error(`Validation error in ${detailsPath}:`, result.error.format());
			return null;
		}

		const json = result.data;
		const urlPath = structure.relative.replace(/\\/g, '/');

		// Media Discovery
		const [images, videos] = await Promise.all([
			discoverMedia(projectDir, urlPath, 'images'),
			discoverMedia(projectDir, urlPath, 'videos')
		]);

		const year = json.year ?? '0000';

		// Image Resolution
		let mainImage = json.image ?? '';
		if (!mainImage && images.length > 0) {
			mainImage = images[0];
		} else {
			mainImage = await resolveImagePath(projectDir, urlPath, mainImage);
		}

		let thumbnail = json.thumbnail ?? '';
		if (thumbnail) {
			thumbnail = await resolveImagePath(projectDir, urlPath, thumbnail);
		} else {
			// Fallback to main image if no thumbnail
			thumbnail = mainImage;
		}

		const group = json.group ?? structure.subCategory;

		// Translations
		const categoriesEn = translations.en.categories as Record<string, string>;
		const categoriesFr = translations.fr.categories as Record<string, string>;
		const catEn = categoriesEn[structure.subCategory] || structure.subCategory;
		const catFr = categoriesFr[structure.subCategory] || structure.subCategory;

		return {
			slug,
			domain: structure.domain,
			domainSlug: structure.domainSlug,
			mainCategory: structure.mainCategory,
			categorySlug: structure.categorySlug,
			subCategory: structure.subCategory,
			category: { en: catEn, fr: catFr },
			year,
			images,
			videos,
			image: mainImage,
			thumbnail,
			title: json.title,
			description: json.description,
			group,
			translationKey: getTranslationKey(structure.categorySlug)
		};
	} catch (e) {
		logger.error(`Error reading project ${slug}`, e);
		return null;
	}
}

async function findProjects(dir: string, rootDir: string): Promise<Project[]> {
	let results: Project[] = [];

	try {
		const list = await fs.readdir(dir);
		list.sort(); // deterministic traversal

		const promises = list.map(async (file) => {
			const filePath = path.join(dir, file);
			const stat = await fs.stat(filePath);

			if (stat.isDirectory()) {
				const detailsPath = path.join(filePath, 'details.json');
				if (await fileExists(detailsPath)) {
					const project = await loadProject(filePath, rootDir);
					if (project) return [project];
				} else {
					return findProjects(filePath, rootDir);
				}
			}
			return [];
		});

		const nestedResults = await Promise.all(promises);
		results = nestedResults.flat();
	} catch (e) {
		logger.error(`Error scanning directory ${dir}`, e);
	}

	return results;
}

async function getProjectsSignature(projectsDir: string): Promise<string> {
	const hash = createHash('sha1');

	async function walk(dir: string) {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		entries.sort((a, b) => a.name.localeCompare(b.name));

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			const rel = path.relative(projectsDir, fullPath).replace(/\\/g, '/');

			if (entry.isDirectory()) {
				hash.update(`dir:${rel}`);
				await walk(fullPath);
			} else if (entry.isFile()) {
				const stat = await fs.stat(fullPath);
				hash.update(`file:${rel}:${stat.mtimeMs}:${stat.size}`);
			}
		}
	}

	await walk(projectsDir);
	return hash.digest('hex');
}

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
	if (!(await fileExists(projectsDir))) return [];

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
