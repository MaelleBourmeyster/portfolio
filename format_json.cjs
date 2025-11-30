/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const projectsDir = path.resolve('static/projects');

if (fs.existsSync(projectsDir)) {
	const projects = fs.readdirSync(projectsDir);
	projects.forEach((slug) => {
		const jsonPath = path.join(projectsDir, slug, 'details.json');
		if (fs.existsSync(jsonPath)) {
			try {
				const content = fs.readFileSync(jsonPath, 'utf8');
				const json = JSON.parse(content);
				// Write with 4 spaces indentation and a trailing newline
				fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4) + '\n');
				console.log(`Formatted ${jsonPath}`);
			} catch (e) {
				console.error(`Error formatting ${jsonPath}:`, e);
			}
		}
	});
}
