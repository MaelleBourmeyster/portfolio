import { writable } from 'svelte/store';

export type Language = 'en' | 'fr';

function createLanguageStore() {
    const { subscribe, set, update } = writable<Language>('en');

    return {
        subscribe,
        set: (lang: Language) => {
            set(lang);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('language', lang);
            }
        },
        toggle: () => update(l => l === 'en' ? 'fr' : 'en'),
        init: () => {
            if (typeof localStorage !== 'undefined') {
                const stored = localStorage.getItem('language') as Language;
                if (stored && (stored === 'en' || stored === 'fr')) {
                    set(stored);
                }
            }
        }
    };
}

export const language = createLanguageStore();
