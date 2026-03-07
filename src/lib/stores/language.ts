import { writable } from 'svelte/store';
import { persistLanguage, resolveInitialLanguage, type Language } from './language-persistence';

export type { Language };

function createLanguageStore() {
	const { subscribe, set, update } = writable<Language>('en');

	return {
		subscribe,
		set: (lang: Language) => {
			set(lang);
			persistLanguage(lang);
		},
		toggle: () =>
			update((l) => {
				const newLang = l === 'en' ? 'fr' : 'en';
				persistLanguage(newLang);
				return newLang;
			}),
		init: () => {
			const lang = resolveInitialLanguage();
			set(lang);
			persistLanguage(lang);
		}
	};
}

export const language = createLanguageStore();
