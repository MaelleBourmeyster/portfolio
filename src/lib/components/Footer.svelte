<script lang="ts">
	import { resolve } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	let t = $derived(translations[$language]);
</script>

<footer class="mt-auto border-t-2 border-black bg-white px-6 py-8 text-center">
	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
		<p class="font-mono text-sm text-gray-500">
			{t.footer.copyright}
		</p>
		<a
			href={resolve('/legal')}
			class="font-mono text-sm text-gray-500 hover:text-black hover:underline"
		>
			{t.footer.legal}
		</a>
	</div>
</footer>
