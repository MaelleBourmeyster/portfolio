export const TIMEOUTS = {
	VIDEO_CONTROLS_HIDE: 2000
} as const;

export const URLS = {
	PRODUCTION: 'https://maellebourmeyster.github.io',
	DEVELOPMENT: 'http://localhost:5173'
} as const;

export const FILE_EXTENSIONS = {
	IMAGES: /\.(png|jpg|jpeg|webp|gif)$/i,
	VIDEOS: /\.(mp4|webm|ogg|mov)$/i
} as const;

export const DEFAULTS = {
	YEAR: '0000',
	IMAGE: '/images/maelle/maelle-1.png',
	IMAGE_ALT: 'Maëlle Bourmeyster - Multidisciplinary Artist',
	DESCRIPTION: 'Multidisciplinary Artist - Sculpture, Drawing, Digital Arts'
} as const;

/** Recommended Open Graph image dimensions (1.91:1 ratio) */
export const OG_IMAGE = {
	WIDTH: 1200,
	HEIGHT: 630
} as const;
