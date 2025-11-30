import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

function getProjectEntries() {
	const projectsDir = path.resolve('static/projects');
	if (!fs.existsSync(projectsDir)) return [];

	const categories = new Set();
	const projects = new Set();

	const walk = (dir) => {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		const hasDetails = entries.some((entry) => entry.isFile() && entry.name === 'details.json');

		for (const entry of entries) {
			if (entry.isDirectory()) {
				walk(path.join(dir, entry.name));
			}
		}

		if (!hasDetails) return;

		const relative = path.relative(projectsDir, dir).replace(/\\/g, '/');
		const parts = relative.split('/');

		if (parts.length < 4) return;

		const [domain, category, subcategory, slug] = parts.slice(-4);
		categories.add(`/${domain}/${category}`);
		projects.add(`/${domain}/${category}/${subcategory}/${slug}`);
	};

	walk(projectsDir);

	return [...new Set([...categories, ...projects])].sort();
}

const prerenderEntries = ['*', ...getProjectEntries()];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: prerenderEntries
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/portfolio' : ''
		}
	}
};

export default config;
