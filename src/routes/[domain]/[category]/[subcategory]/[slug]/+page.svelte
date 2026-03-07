<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/translations';
	import { getAbsoluteUrl, getProjectPath } from '$lib/url';
	import { siteConfig } from '$lib/config';
	import { getStr } from '$lib/utils';
	import { buildCreativeWorkJsonLd } from '$lib/seo';
	import VideoPlayer from '$lib/components/VideoPlayer.svelte';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import ProjectContent from '$lib/components/ProjectContent.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';

	let { data } = $props<{ data: PageData }>();
	let project = $derived(data.project);
	let currentImageIndex = $state(0);

	let projectTitle = $derived(getStr(project.title, $language));
	let projectDescription = $derived(getStr(project.description, $language) || $t.project.noDesc);
	let projectPath = $derived(getProjectPath(project));
	let projectImage = $derived(project.image || siteConfig.defaultImage);
	let articleMeta = $derived({
		'article:author': siteConfig.author,
		'article:published_time': `${project.year}-01-01T00:00:00Z`
	});
	let projectJsonLd = $derived(
		buildCreativeWorkJsonLd({
			title: projectTitle,
			description: projectDescription,
			image: projectImage,
			url: getAbsoluteUrl(projectPath),
			author: siteConfig.author,
			datePublished: `${project.year}-01-01T00:00:00Z`,
			genre: getStr(project.category, $language)
		})
	);

	let galleryImages = $derived(
		project.images && project.images.length > 0
			? project.images
			: project.image
				? [project.image]
				: []
	);
	let showPlaceholder = $derived(
		galleryImages.length === 0 && (!project.videos || project.videos.length === 0)
	);
</script>

<PageMeta
	title={projectTitle}
	description={projectDescription}
	path={projectPath}
	image={projectImage}
	imageAlt={projectTitle}
	ogType="article"
	{articleMeta}
	jsonLd={projectJsonLd}
/>

<svelte:head>
	{#if galleryImages.length > 0 && (!project.videos || project.videos.length === 0)}
		<link rel="preload" as="image" href={galleryImages[0]} fetchpriority="high" />
	{/if}
</svelte:head>

<div class="min-h-[100dvh] bg-pk-white">
	<div class="border-b-2 border-pk-ink px-6 py-6">
		<div class="mx-auto max-w-7xl">
			<a
				href={resolve(`/${project.domainSlug}/${project.categorySlug}`)}
				class="inline-flex items-center gap-2 font-bold uppercase transition-colors hover:text-blue-600"
			>
				<ArrowLeftIcon />
				{$t.project.back}
			</a>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-6 py-12">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<div class="space-y-6">
				{#if project.videos && project.videos.length > 0}
					<div class="group relative mb-8 border-2 border-pk-ink bg-pk-white p-4 shadow-pk-lg">
						<div class="relative w-full overflow-hidden border-2 border-pk-ink bg-gray-100">
							<VideoPlayer src={project.videos[0]} />
						</div>
					</div>
				{/if}

				{#if galleryImages.length > 0}
					<ImageGallery
						images={galleryImages}
						alt={projectTitle}
						bind:currentIndex={currentImageIndex}
					/>
				{:else if showPlaceholder}
					<ImageGallery images={[]} alt={projectTitle} />
				{/if}
			</div>

			<div class="content-visibility-auto">
				<ProjectContent
					title={project.title}
					category={project.category}
					year={project.year}
					description={project.description}
				/>
			</div>
		</div>
	</div>
</div>
