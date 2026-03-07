import { describe, expect, it } from 'vitest';
import { getStr, formatTime, formatSlugToTitle } from '$lib/utils';
import { translations } from '$lib/data/translations';
import { getCategoryName, getSubCategoryName } from '$lib/utils';

describe('getStr', () => {
	it('returns string as-is when given a string', () => {
		expect(getStr('hello', 'en')).toBe('hello');
		expect(getStr('bonjour', 'fr')).toBe('bonjour');
	});

	it('returns localized value from object', () => {
		expect(getStr({ en: 'Hello', fr: 'Bonjour' }, 'en')).toBe('Hello');
		expect(getStr({ en: 'Hello', fr: 'Bonjour' }, 'fr')).toBe('Bonjour');
	});
});

describe('formatTime', () => {
	it('formats seconds as M:SS', () => {
		expect(formatTime(0)).toBe('0:00');
		expect(formatTime(65)).toBe('1:05');
		expect(formatTime(125)).toBe('2:05');
		expect(formatTime(3661)).toBe('61:01');
	});

	it('floors fractional seconds', () => {
		expect(formatTime(65.9)).toBe('1:05');
	});
});

describe('formatSlugToTitle', () => {
	it('converts slug to title case', () => {
		expect(formatSlugToTitle('visual-arts')).toBe('Visual Arts');
		expect(formatSlugToTitle('horse-riding')).toBe('Horse Riding');
	});
});

describe('getCategoryName', () => {
	it('returns translated category when key exists', () => {
		expect(getCategoryName(translations.en, 'sculpture', 'sculpture')).toBe('Sculpture');
	});

	it('returns formatted slug when no translation exists', () => {
		expect(getCategoryName(translations.en, 'unknown', 'sculpture')).toBe('Sculpture');
	});
});

describe('getSubCategoryName', () => {
	it('returns translated subcategory when available', () => {
		expect(getSubCategoryName(translations.en, 'wood')).toBe('Wood');
	});
});
