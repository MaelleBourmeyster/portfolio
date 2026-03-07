import { promises as fs } from 'fs';
import path from 'path';
import { base } from '$app/paths';
import { FILE_EXTENSIONS } from '$lib/constants';

export async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

export async function discoverMedia(
	projectDir: string,
	urlPath: string,
	type: 'images' | 'videos'
): Promise<string[]> {
	const mediaDir = path.join(projectDir, type);
	if (!(await fileExists(mediaDir))) return [];

	const extensions = type === 'images' ? FILE_EXTENSIONS.IMAGES : FILE_EXTENSIONS.VIDEOS;

	const files = await fs.readdir(mediaDir);
	files.sort();
	return files
		.filter((file) => extensions.test(file))
		.map((file) => `${base}/projects/${urlPath}/${type}/${file}`);
}

export async function resolveImagePath(
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

	const results = await Promise.all(
		candidates.map(async (c) => {
			const exists = await fileExists(path.join(projectDir, c.path));
			return exists ? c.url : null;
		})
	);

	return results.find((url) => url !== null) || `${base}/projects/${urlPath}/${imageName}`;
}
