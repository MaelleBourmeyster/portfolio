<script lang="ts">
	import { t } from '$lib/stores/translations';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import ImagePlaceholderIcon from '$lib/components/icons/ImagePlaceholderIcon.svelte';

	let {
		images,
		alt,
		currentIndex = $bindable(0)
	}: {
		images: string[];
		alt: string;
		currentIndex?: number;
	} = $props();
</script>

{#if images.length > 0}
	<div class="group relative border-2 border-pk-ink bg-pk-white p-4 shadow-pk-lg">
		<div class="relative w-full overflow-hidden border-2 border-pk-ink bg-gray-100">
			<img
				src={images[currentIndex]}
				{alt}
				class="h-auto w-full object-cover"
				loading={currentIndex === 0 ? 'eager' : 'lazy'}
				fetchpriority={currentIndex === 0 ? 'high' : undefined}
				decoding="async"
			/>

			{#if images.length > 1}
				<button
					type="button"
					class="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer border-2 border-pk-ink bg-pk-white p-2 shadow-pk transition-colors hover:bg-gray-100 active:bg-gray-200"
					onclick={() => (currentIndex = (currentIndex - 1 + images.length) % images.length)}
					aria-label="Previous image"
				>
					<ChevronLeftIcon class="h-6 w-6" />
				</button>
				<button
					type="button"
					class="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer border-2 border-pk-ink bg-pk-white p-2 shadow-pk transition-colors hover:bg-gray-100 active:bg-gray-200"
					onclick={() => (currentIndex = (currentIndex + 1) % images.length)}
					aria-label="Next image"
				>
					<ChevronRightIcon class="h-6 w-6" />
				</button>

				<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
					{#each images as image, i (image + i)}
						<button
							type="button"
							class="h-3 w-3 border-2 border-pk-ink {i === currentIndex
								? 'bg-blue-600'
								: 'bg-pk-white'} cursor-pointer"
							onclick={() => (currentIndex = i)}
							aria-label="Go to image {i + 1}"
						></button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="border-2 border-pk-ink bg-pk-white p-4 shadow-pk-lg">
		<div
			class="flex h-64 w-full flex-col items-center justify-center gap-4 border-2 border-pk-ink bg-gray-100 text-gray-500"
		>
			<ImagePlaceholderIcon />
			<p class="text-center font-bold uppercase">{$t.project.noImage}</p>
		</div>
	</div>
{/if}
