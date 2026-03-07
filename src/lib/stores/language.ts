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
			// Priority 1: ?lang= in URL (for hreflang / shared links)
			if (typeof window !== 'undefined') {
				const params = new URLSearchParams(window.location.search);
				const langParam = params.get('lang');
				if (langParam === 'en' || langParam === 'fr') {
					set(langParam);
					if (typeof localStorage !== 'undefined') {
						localStorage.setItem('language', langParam);
					}
					setLangAttribute(langParam);
					return;
				}
			}

			// Priority 2: localStorage
			if (typeof localStorage !== 'undefined') {
				const stored = localStorage.getItem('language') as Language;
				if (stored && (stored === 'en' || stored === 'fr')) {
					set(stored);
					setLangAttribute(stored);
					return;
				}
			}

			// Priority 3: Browser language
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
