import path from 'path';
import { promises as fs } from 'fs';
import { dev } from '$app/environment';
import { translations } from '$lib/data/translations';
import { DEFAULTS } from '$lib/constants';
import { z } from 'zod';
import { ProjectDetailsSchema, type Project } from './schema';
import { parseProjectStructure, getTranslationKey } from './structure';
import { discoverMedia, resolveImagePath, fileExists } from './media';

const logger = {
	error: (msg: string, data?: unknown) => {
		if (dev) {
			console.error(msg, data);
		}
	}
};

type ProjectDetailsJson = z.infer<typeof ProjectDetailsSchema>;

async function readAndValidateDetails(projectDir: string): Promise<ProjectDetailsJson | null> {
	const detailsPath = path.join(projectDir, 'details.json');
	try {
		let content = await fs.readFile(detailsPath, 'utf-8');
		if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
		const rawJson = JSON.parse(content);
		const result = ProjectDetailsSchema.safeParse(rawJson);
		if (!result.success) {
			logger.error(`Validation error in ${detailsPath}:`, result.error.format());
			return null;
		}
		return result.data;
	} catch {
		return null;
	}
}

async function resolveMainImage(
	projectDir: string,
	urlPath: string,
	jsonImage: string | undefined,
	discoveredImages: string[]
): Promise<string> {
	if (jsonImage) {
		return resolveImagePath(projectDir, urlPath, jsonImage);
	}
	return discoveredImages.length > 0 ? discoveredImages[0] : '';
}

async function resolveThumbnail(
	projectDir: string,
	urlPath: string,
	jsonThumbnail: string | undefined,
	mainImage: string
): Promise<string> {
	if (jsonThumbnail) {
		return resolveImagePath(projectDir, urlPath, jsonThumbnail);
	}
	return mainImage;
}

function mapCategoryTranslations(subCategory: string): { en: string; fr: string } {
	const categoriesEn = translations.en.categories as Record<string, string>;
	const categoriesFr = translations.fr.categories as Record<string, string>;
	return {
		en: categoriesEn[subCategory] || subCategory,
		fr: categoriesFr[subCategory] || subCategory
	};
}

export async function loadProject(projectDir: string, rootDir: string): Promise<Project | null> {
	const slug = path.basename(projectDir);
	const structure = parseProjectStructure(projectDir, rootDir);

	if (!structure) {
		return null;
	}

	const json = await readAndValidateDetails(projectDir);
	if (!json) {
		logger.error(`Error reading project ${slug}`);
		return null;
	}

	const urlPath = structure.relative.replace(/\\/g, '/');

	const [images, videos] = await Promise.all([
		discoverMedia(projectDir, urlPath, 'images'),
		discoverMedia(projectDir, urlPath, 'videos')
	]);

	const mainImage = await resolveMainImage(projectDir, urlPath, json.image, images);
	const thumbnail = await resolveThumbnail(projectDir, urlPath, json.thumbnail, mainImage);
	const category = mapCategoryTranslations(structure.subCategory);

	return {
		slug,
		domain: structure.domain,
		domainSlug: structure.domainSlug,
		mainCategory: structure.mainCategory,
		categorySlug: structure.categorySlug,
		subCategory: structure.subCategory,
		category,
		year: json.year ?? DEFAULTS.YEAR,
		images,
		videos,
		image: mainImage,
		thumbnail,
		title: json.title,
		description: json.description,
		group: json.group ?? structure.subCategory,
		translationKey: getTranslationKey(structure.categorySlug)
	};
}

export async function findProjects(dir: string, rootDir: string): Promise<Project[]> {
	let results: Project[] = [];

	try {
		const list = await fs.readdir(dir);
		list.sort();

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

export { getTranslationKey } from './structure';
