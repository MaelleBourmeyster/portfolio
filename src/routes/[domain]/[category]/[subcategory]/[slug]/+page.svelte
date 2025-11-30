<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';
	import { getAbsoluteUrl, getImageUrl } from '$lib/config';
	import VideoPlayer from '$lib/components/VideoPlayer.svelte';

	let { data } = $props<{ data: PageData }>();
	let project = $derived(data.project);

	let t = $derived(translations[$language]);
	let currentImageIndex = $state(0);

	// Helper to get string
	function getStr(val: string | { en: string; fr: string }, lang: 'en' | 'fr') {
		if (typeof val === 'string') return val;
		return val[lang];
	}

	let projectTitle = $derived(getStr(project.title, $language));
	let projectDescription = $derived(getStr(project.description, $language) || t.project.noDesc);
	let pageUrl = $derived(
		getAbsoluteUrl(
			`${project.domainSlug}/${project.categorySlug}/${project.subCategory}/${project.slug}`
		)
	);
	let projectImageUrl = $derived(
		project.image ? getImageUrl(project.image) : getImageUrl('/images/maelle/maelle-1.png')
	);
</script>

<svelte:head>
	<title>{projectTitle} - Maëlle Bourmeyster</title>
	<meta name="description" content={projectDescription} />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content="{projectTitle} - Maëlle Bourmeyster" />
	<meta property="og:description" content={projectDescription} />
	<meta property="og:image" content={projectImageUrl} />
	<meta property="og:locale" content={$language === 'en' ? 'en_US' : 'fr_FR'} />
	<meta property="article:author" content="Maëlle Bourmeyster" />
	<meta property="article:published_time" content="{project.year}-01-01T00:00:00Z" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={pageUrl} />
	<meta name="twitter:title" content="{projectTitle} - Maëlle Bourmeyster" />
	<meta name="twitter:description" content={projectDescription} />
	<meta name="twitter:image" content={projectImageUrl} />

	<!-- Canonical URL -->
	<link rel="canonical" href={pageUrl} />
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Back Button -->
	<div class="border-b-2 border-black px-6 py-6">
		<div class="mx-auto max-w-7xl">
			<a
				href={resolve(`/${project.domainSlug}/${project.categorySlug}`)}
				class="inline-flex items-center gap-2 font-bold uppercase transition-colors hover:text-blue-600"
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
						d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					/>
				</svg>
				{t.project.back}
			</a>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-6 py-12">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<!-- Image Section -->
			<!-- Image Section -->
			<div class="space-y-6">
				{#if project.videos && project.videos.length > 0}
					<div
						class="group relative mb-8 border-2 border-black bg-white p-4 shadow-[8px_8px_0px_#000]"
					>
						<div class="relative w-full overflow-hidden border-2 border-black bg-gray-100">
							<VideoPlayer src={project.videos[0]} />
						</div>
					</div>
				{/if}

				{#if project.images && project.images.length > 0}
					{@const images = project.images}
					<div class="group relative border-2 border-black bg-white p-4 shadow-[8px_8px_0px_#000]">
						<div class="relative w-full overflow-hidden border-2 border-black bg-gray-100">
							<img
								src={images[currentImageIndex]}
								alt={getStr(project.title, $language)}
								class="h-auto w-full object-cover"
							/>

							{#if images.length > 1}
								<button
									type="button"
									class="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer border-2 border-black bg-white p-2 shadow-[4px_4px_0px_#000] transition-colors hover:bg-gray-100 active:bg-gray-200"
									onclick={() =>
										(currentImageIndex = (currentImageIndex - 1 + images.length) % images.length)}
									aria-label="Previous image"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.75 19.5L8.25 12l7.5-7.5"
										/>
									</svg>
								</button>
								<button
									type="button"
									class="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer border-2 border-black bg-white p-2 shadow-[4px_4px_0px_#000] transition-colors hover:bg-gray-100 active:bg-gray-200"
									onclick={() => (currentImageIndex = (currentImageIndex + 1) % images.length)}
									aria-label="Next image"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M8.25 4.5l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</button>

								<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
									{#each images as image, i (image)}
										<button
											type="button"
											class="h-3 w-3 border-2 border-black {i === currentImageIndex
												? 'bg-blue-600'
												: 'bg-white'} cursor-pointer"
											onclick={() => (currentImageIndex = i)}
											aria-label="Go to image {i + 1}"
										></button>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{:else if project.image}
					<div class="border-2 border-black bg-white p-4 shadow-[8px_8px_0px_#000]">
						<div class="w-full overflow-hidden border-2 border-black bg-gray-100">
							<img
								src={project.image}
								alt={getStr(project.title, $language)}
								class="h-auto w-full object-cover"
							/>
						</div>
					</div>
				{:else if !project.videos || project.videos.length === 0}
					<div class="border-2 border-black bg-white p-4 shadow-[8px_8px_0px_#000]">
						<div
							class="flex h-64 w-full flex-col items-center justify-center gap-4 border-2 border-black bg-gray-100 text-gray-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-16 w-16"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
								/>
							</svg>
							<p class="text-center font-bold uppercase">{t.project.noImage}</p>
						</div>
					</div>
				{/if}
			</div>

			<!-- Content Section -->
			<div class="space-y-8">
				<div>
					<div
						class="mb-4 inline-block border-2 border-black bg-blue-600 px-3 py-1 text-sm font-bold text-white uppercase shadow-[4px_4px_0px_#000]"
					>
						{getStr(project.category, $language)}
					</div>
					<h1 class="mb-4 text-5xl leading-none font-bold tracking-tighter uppercase md:text-6xl">
						{getStr(project.title, $language)}
					</h1>
					<p class="font-mono text-xl text-gray-500">{project.year}</p>
				</div>

				<div class="border-t-2 border-black pt-8">
					<h2 class="mb-4 text-2xl font-bold uppercase">{t.project.about}</h2>
					<p class="text-lg leading-relaxed text-gray-700">
						{getStr(project.description, $language) || t.project.noDesc}
					</p>
				</div>

				<div class="border-t-2 border-black pt-8">
					<h2 class="mb-4 text-2xl font-bold uppercase">{t.project.details}</h2>
					<div class="grid grid-cols-2 gap-4">
						<div class="border-2 border-black bg-[#fdfbf7] p-4">
							<span class="mb-1 block text-xs font-bold text-gray-500 uppercase"
								>{t.project.year}</span
							>
							<span class="font-bold">{project.year}</span>
						</div>
						<div class="border-2 border-black bg-[#fdfbf7] p-4">
							<span class="mb-1 block text-xs font-bold text-gray-500 uppercase"
								>{t.project.category}</span
							>
							<span class="font-bold">{getStr(project.category, $language)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
