/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const projectsDir = path.resolve('static/projects');

function formatDetailsFiles(dir) {
	const entries = fs
		.readdirSync(dir, { withFileTypes: true })
		.sort((a, b) => a.name.localeCompare(b.name));

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			formatDetailsFiles(fullPath);
		} else if (entry.isFile() && entry.name === 'details.json') {
			try {
				const content = fs.readFileSync(fullPath, 'utf8');
				const json = JSON.parse(content);
				fs.writeFileSync(fullPath, JSON.stringify(json, null, 4) + '\n');
				console.log(`Formatted ${fullPath}`);
			} catch (e) {
				console.error(`Error formatting ${fullPath}:`, e);
			}
		}
	}
}

if (fs.existsSync(projectsDir)) {
	formatDetailsFiles(projectsDir);
}
