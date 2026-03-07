<script lang="ts">
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/translations';
	import { getStr } from '$lib/utils';

	let {
		title,
		category,
		year,
		description
	}: {
		title: string | { en: string; fr: string };
		category: string | { en: string; fr: string };
		year: string;
		description: string | { en: string; fr: string } | undefined;
	} = $props();
</script>

<div class="space-y-8">
	<div>
		<div
			class="mb-4 inline-block border-2 border-pk-ink bg-blue-600 px-3 py-1 text-sm font-bold text-white uppercase shadow-pk"
		>
			{getStr(category, $language)}
		</div>
		<h1 class="mb-4 text-5xl leading-none font-bold tracking-tighter uppercase md:text-6xl">
			{getStr(title, $language)}
		</h1>
		<p class="font-mono text-xl text-gray-500">{year}</p>
	</div>

	<div class="border-t-2 border-pk-ink pt-8">
		<h2 class="mb-4 text-2xl font-bold uppercase">{$t.project.about}</h2>
		<p class="text-lg leading-relaxed text-gray-700">
			{description ? getStr(description, $language) : $t.project.noDesc}
		</p>
	</div>

	<div class="border-t-2 border-pk-ink pt-8">
		<h2 class="mb-4 text-2xl font-bold uppercase">{$t.project.details}</h2>
		<div class="grid grid-cols-2 gap-4">
			<div class="border-2 border-pk-ink bg-pk-bg p-4">
				<span class="mb-1 block text-xs font-bold text-gray-500 uppercase">{$t.project.year}</span>
				<span class="font-bold">{year}</span>
			</div>
			<div class="border-2 border-pk-ink bg-pk-bg p-4">
				<span class="mb-1 block text-xs font-bold text-gray-500 uppercase"
					>{$t.project.category}</span
				>
				<span class="font-bold">{getStr(category, $language)}</span>
			</div>
		</div>
	</div>
</div>
