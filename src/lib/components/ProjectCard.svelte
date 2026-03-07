<script lang="ts">
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/translations';
	import { FILE_EXTENSIONS } from '$lib/constants';
	import { getStr } from '$lib/utils';

	import ArrowUpRightIcon from '$lib/components/icons/ArrowUpRightIcon.svelte';

	let {
		title,
		category,
		image,
		thumbnail = undefined,
		year,
		priority = false
	} = $props<{
		title: string | { en: string; fr: string };
		category: string | { en: string; fr: string };
		image: string;
		thumbnail?: string;
		year: string;
		priority?: boolean;
	}>();
</script>

<div
	class="group relative border-2 border-pk-ink bg-pk-white p-4 shadow-pk transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pk-lg"
>
	<!-- Image Container -->
	<div class="relative mb-4 aspect-[4/3] w-full overflow-hidden border-2 border-pk-ink bg-gray-100">
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
					loading={priority ? 'eager' : 'lazy'}
					fetchpriority={priority ? 'high' : undefined}
					decoding="async"
				/>
			{/if}
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
				{$t.project.noImage}
			</div>
		{/if}

		<!-- Overlay Tag -->
		<div
			class="absolute top-2 right-2 border-2 border-pk-ink bg-pk-white px-2 py-1 text-xs font-bold uppercase"
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
			class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-pk-ink transition-colors group-hover:bg-pk-ink group-hover:text-pk-white"
		>
			<ArrowUpRightIcon class="h-4 w-4" />
		</div>
	</div>
</div>
