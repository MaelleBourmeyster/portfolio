<script lang="ts">
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';
	import { FILE_EXTENSIONS } from '$lib/constants';
	import { getStr } from '$lib/utils';

	import ArrowUpRightIcon from '$lib/components/icons/ArrowUpRightIcon.svelte';

	let {
		title,
		category,
		image,
		thumbnail = undefined,
		year
	} = $props<{
		title: string | { en: string; fr: string };
		category: string | { en: string; fr: string };
		image: string;
		thumbnail?: string;
		year: string;
	}>();
</script>

<div class="pk-shadow pk-shadow-hover group relative border-2 border-black bg-white p-4">
	<!-- Image Container -->
	<div class="relative mb-4 aspect-[4/3] w-full overflow-hidden border-2 border-black bg-gray-100">
		{#if thumbnail || image}
			{@const src = thumbnail || image}
			{#if src.match(FILE_EXTENSIONS.VIDEOS)}
				<video
					{src}
					class="pointer-events-none h-full w-full object-cover"
					muted
					playsinline
					preload="metadata"
					onloadeddata={(e) => {
						e.currentTarget.currentTime = 0;
					}}
				></video>
			{:else}
				<img
					{src}
					alt={getStr(title, $language)}
					class="h-full w-full object-cover"
					loading="lazy"
					decoding="async"
				/>
			{/if}
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
				{translations[$language].project.noImage}
			</div>
		{/if}

		<!-- Overlay Tag -->
		<div
			class="absolute top-2 right-2 border-2 border-black bg-white px-2 py-1 text-xs font-bold uppercase"
		>
			{year}
		</div>
	</div>

	<!-- Content -->
	<div class="flex items-start justify-between">
		<div>
			<h3
				class="mb-1 text-xl leading-none font-bold uppercase transition-colors group-hover:text-blue-600"
			>
				{getStr(title, $language)}
			</h3>
			<p class="font-mono text-sm text-gray-500">{getStr(category, $language)}</p>
		</div>
		<div
			class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black transition-colors group-hover:bg-black group-hover:text-white"
		>
			<ArrowUpRightIcon class="h-4 w-4" />
		</div>
	</div>
</div>
