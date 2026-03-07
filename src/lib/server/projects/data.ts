import path from 'path';
import { promises as fs } from 'fs';
import { dev } from '$app/environment';
import { translations } from '$lib/data/translations';
import { DEFAULTS } from '$lib/constants';
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

export async function loadProject(projectDir: string, rootDir: string): Promise<Project | null> {
	const slug = path.basename(projectDir);
	const structure = parseProjectStructure(projectDir, rootDir);

	if (!structure) {
		return null;
	}

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

		const json = result.data;
		const urlPath = structure.relative.replace(/\\/g, '/');

		const [images, videos] = await Promise.all([
			discoverMedia(projectDir, urlPath, 'images'),
			discoverMedia(projectDir, urlPath, 'videos')
		]);

		const year = json.year ?? DEFAULTS.YEAR;

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
			thumbnail = mainImage;
		}

		const group = json.group ?? structure.subCategory;

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
