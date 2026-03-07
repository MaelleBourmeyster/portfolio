/** @type {import('@lhci/cli').Config} */
export default {
	ci: {
		collect: {
			startServerCommand: 'npm run preview',
			url: [
				'http://localhost:4173/portfolio/',
				'http://localhost:4173/portfolio/about',
				'http://localhost:4173/portfolio/contact'
			],
			numberOfRuns: 3
		},
		assert: {
			assertions: {
				'categories:performance': ['warn', { minScore: 0.8 }],
				'categories:accessibility': ['warn', { minScore: 0.9 }],
				'categories:seo': ['warn', { minScore: 0.9 }]
			}
		},
		upload: {
			target: 'temporary-public-storage'
		}
	}
};
