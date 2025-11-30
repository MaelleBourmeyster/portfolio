import sveltePlugin from 'prettier-plugin-svelte';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';

// Prettier v3 expects the embed function to expose getVisitorKeys. Patch the
// Svelte printer here so we don't have to touch node_modules.
const wrapVisitorKeys =
	(fn) =>
	(node, nonTraversableKeys = new Set()) =>
		fn(node, nonTraversableKeys);

const sveltePrinter = sveltePlugin.printers?.['svelte-ast'];
if (sveltePrinter?.embed && sveltePrinter.getVisitorKeys) {
	sveltePrinter.embed.getVisitorKeys = wrapVisitorKeys(sveltePrinter.getVisitorKeys);
}

const tailwindPrinter = tailwindPlugin.printers?.['svelte-ast'];
if (tailwindPrinter?.embed && tailwindPrinter.getVisitorKeys) {
	tailwindPrinter.embed.getVisitorKeys = wrapVisitorKeys(tailwindPrinter.getVisitorKeys);
}

/** @type {import('prettier').Config} */
const config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: [sveltePlugin, tailwindPlugin],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	],
	tailwindStylesheet: './src/routes/layout.css'
};

export default config;
