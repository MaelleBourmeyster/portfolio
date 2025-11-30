import { writable } from 'svelte/store';

export type Language = 'en' | 'fr';

function setLangAttribute(lang: Language) {
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('lang', lang);
	}
}

function createLanguageStore() {
	const { subscribe, set, update } = writable<Language>('en');

	return {
		subscribe,
		set: (lang: Language) => {
			set(lang);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('language', lang);
			}
			setLangAttribute(lang);
		},
		toggle: () =>
			update((l) => {
				const newLang = l === 'en' ? 'fr' : 'en';
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('language', newLang);
				}
				setLangAttribute(newLang);
				return newLang;
			}),
		init: () => {
			if (typeof localStorage !== 'undefined') {
				const stored = localStorage.getItem('language') as Language;
				if (stored && (stored === 'en' || stored === 'fr')) {
					set(stored);
					setLangAttribute(stored);
					return;
				}
			}

			// Fallback to browser language when nothing stored
			if (typeof navigator !== 'undefined') {
				const browserLang = navigator.language?.startsWith('fr') ? 'fr' : 'en';
				set(browserLang);
				setLangAttribute(browserLang);
			} else {
				setLangAttribute('en');
			}
		}
	};
}

export const language = createLanguageStore();
