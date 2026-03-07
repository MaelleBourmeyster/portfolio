import { translations } from '$lib/data/translations';

export function getStr(val: string | { en: string; fr: string }, lang: 'en' | 'fr'): string {
	if (typeof val === 'string') return val;
	return val[lang];
}

/** Format slug to title case (e.g. "visual-arts" -> "Visual Arts") */
export function formatSlugToTitle(slug: string): string {
	return slug
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join(' ');
}

type NavKey = keyof (typeof translations.en)['nav'];

export function isNavKey(key: string): key is NavKey {
	return key in translations.en.nav;
}

/** Resolve nav translation key to display name, with fallback */
export function getTranslatedNavName(
	t: (typeof translations)['en'],
	translationKey: string,
	fallback: string
): string {
	if (isNavKey(translationKey)) {
		return t.nav[translationKey];
	}
	return fallback;
}

/** Get category display name from slug and translation key */
export function getCategoryName(
	t: (typeof translations)['en'],
	translationKey: string | undefined,
	slug: string
): string {
	if (translationKey && isNavKey(translationKey)) {
		return t.nav[translationKey];
	}
	return formatSlugToTitle(slug);
}

/** Get subcategory display name from slug */
export function getSubCategoryName(t: (typeof translations)['en'], slug: string): string {
	const categories = t.categories as Record<string, string>;
	if (categories[slug]) {
		return categories[slug];
	}
	return formatSlugToTitle(slug);
}
