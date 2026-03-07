import { promises as fs } from 'fs';
import path from 'path';
import { createHash } from 'crypto';

export async function getProjectsSignature(projectsDir: string): Promise<string> {
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
