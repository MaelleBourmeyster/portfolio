export type Language = 'en' | 'fr';

const STORAGE_KEY = 'language';

function isStorageAvailable(): boolean {
	return typeof localStorage !== 'undefined';
}

function isDocumentAvailable(): boolean {
	return typeof document !== 'undefined';
}

function isWindowAvailable(): boolean {
	return typeof window !== 'undefined';
}

function isNavigatorAvailable(): boolean {
	return typeof navigator !== 'undefined';
}

export function setLangAttribute(lang: Language): void {
	if (isDocumentAvailable()) {
		document.documentElement.setAttribute('lang', lang);
	}
}

export function persistLanguage(lang: Language): void {
	if (isStorageAvailable()) {
		localStorage.setItem(STORAGE_KEY, lang);
	}
	setLangAttribute(lang);
}

export function getStoredLanguage(): Language | null {
	if (!isStorageAvailable()) return null;
	const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
	return stored && (stored === 'en' || stored === 'fr') ? stored : null;
}

export function resolveInitialLanguage(): Language {
	if (isWindowAvailable()) {
		const params = new URLSearchParams(window.location.search);
		const langParam = params.get('lang');
		if (langParam === 'en' || langParam === 'fr') {
			return langParam;
		}
	}

	const stored = getStoredLanguage();
	if (stored) return stored;

	if (isNavigatorAvailable()) {
		return navigator.language?.startsWith('fr') ? 'fr' : 'en';
	}

	return 'en';
}
