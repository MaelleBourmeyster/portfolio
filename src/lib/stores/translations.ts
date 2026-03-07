import { derived } from 'svelte/store';
import { language } from './language';
import { translations } from '$lib/data/translations';

export type TranslationSet = (typeof translations)['en'];

export const t = derived(language, ($lang) => translations[$lang]);
