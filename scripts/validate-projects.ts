import path from 'path';
import { access, readdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { ProjectDetailsSchema } from '../src/lib/server/projects/schema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.resolve(__dirname, '../static/projects');

interface ValidationError {
	path: string;
	message: string;
}

async function findProjectDirs(dir: string, root: string): Promise<string[]> {
	const results: string[] = [];
	const entries = await readdir(dir, { withFileTypes: true });

	const hasDetails = entries.some((e) => e.isFile() && e.name === 'details.json');
	if (hasDetails) {
		results.push(dir);
		return results;
	}

	for (const entry of entries) {
		if (entry.isDirectory()) {
			results.push(...(await findProjectDirs(path.join(dir, entry.name), root)));
		}
	}

	return results;
}

function validateStructure(projectDir: string, rootDir: string): boolean {
	const relative = path.relative(rootDir, projectDir).replace(/\\/g, '/');
	const parts = relative.split('/');
	return parts.length >= 4;
}

async function validateProject(projectDir: string, rootDir: string): Promise<ValidationError[]> {
	const errors: ValidationError[] = [];
	const relative = path.relative(rootDir, projectDir);

	if (!validateStructure(projectDir, rootDir)) {
		errors.push({
			path: relative,
			message: 'Invalid structure: expected domain/category/subcategory/slug (min 4 levels)'
		});
		return errors;
	}

	const detailsPath = path.join(projectDir, 'details.json');
	let content: string;

	try {
		content = await readFile(detailsPath, 'utf-8');
	} catch (e) {
		errors.push({ path: relative, message: `Cannot read details.json: ${(e as Error).message}` });
		return errors;
	}

	if (content.charCodeAt(0) === 0xfeff) {
		content = content.slice(1);
	}

	let raw: unknown;
	try {
		raw = JSON.parse(content);
	} catch (e) {
		errors.push({ path: relative, message: `Invalid JSON: ${(e as Error).message}` });
		return errors;
	}

	const result = ProjectDetailsSchema.safeParse(raw);
	if (!result.success) {
		const formatted = result.error.format();
		const messages = Object.entries(formatted)
			.filter(([k]) => k !== '_errors')
			.flatMap(([k, v]) => {
				const err = v as { _errors?: string[] };
				return (err._errors || []).map((msg) => `${k}: ${msg}`);
			});
		errors.push({
			path: relative,
			message: messages.length > 0 ? messages.join('; ') : 'Schema validation failed'
		});
	}

	return errors;
}

async function main(): Promise<void> {
	try {
		await access(projectsDir);
	} catch {
		console.error(`Projects directory not found: ${projectsDir}`);
		process.exit(1);
	}

	const projectDirs = await findProjectDirs(projectsDir, projectsDir);
	const allErrors: ValidationError[] = [];

	for (const dir of projectDirs) {
		const errs = await validateProject(dir, projectsDir);
		allErrors.push(...errs);
	}

	if (allErrors.length > 0) {
		console.error('Validation failed:\n');
		for (const err of allErrors) {
			console.error(`  ${err.path}: ${err.message}`);
		}
		process.exit(1);
	}

	console.log(`Validated ${projectDirs.length} project(s) successfully.`);
}

main();
