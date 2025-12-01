export function getStr(val: string | { en: string; fr: string }, lang: 'en' | 'fr') {
	if (typeof val === 'string') return val;
	return val[lang];
}
