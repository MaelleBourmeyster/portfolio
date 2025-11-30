<script lang="ts">
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	export let title: string | { en: string; fr: string };
	export let category: string | { en: string; fr: string };
	export let image: string;
	export let thumbnail: string | undefined = undefined;
	export let year: string;

	// Helper to get string
	function getStr(val: string | { en: string; fr: string }, lang: 'en' | 'fr') {
		if (typeof val === 'string') return val;
		return val[lang];
	}
</script>

<div
	class="group relative border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_#000]"
>
	<!-- Image Container -->
	<div class="relative mb-4 aspect-[4/3] w-full overflow-hidden border-2 border-black bg-gray-100">
		{#if thumbnail || image}
			{@const src = thumbnail || image}
			{#if src.match(/\.(mp4|webm|ogg|mov)$/i)}
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
				<img {src} alt={getStr(title, $language)} class="h-full w-full object-cover" />
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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="h-4 w-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
				/>
			</svg>
		</div>
	</div>
</div>
