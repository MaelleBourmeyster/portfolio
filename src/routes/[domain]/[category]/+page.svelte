<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { resolve } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';
	import { getAbsoluteUrl, getImageUrl } from '$lib/config';
	import type { PageData } from './$types';
	import type { Project } from '$lib/server/projects';

	let { data } = $props<{ data: PageData }>();
	let projects = $derived(data.projects as Project[]);
	let t = $derived(translations[$language]);

	let groupedProjects = $derived.by(() => {
		const groups: Record<string, Project[]> = {};
		projects.forEach((p) => {
			if (!groups[p.subCategory]) {
				groups[p.subCategory] = [];
			}
			groups[p.subCategory].push(p);
		});
		return groups;
	});

	function getCategoryName(slug: string) {
		const key = data.translationKey;
		if (key && t.nav[key as keyof typeof t.nav]) {
			return t.nav[key as keyof typeof t.nav];
		}
		return slug.charAt(0).toUpperCase() + slug.slice(1);
	}

	function getSubCategoryName(slug: string) {
		// Try to find in categories translations
		if (t.categories[slug as keyof typeof t.categories]) {
			return t.categories[slug as keyof typeof t.categories];
		}
		// Fallback to capitalizing slug
		return slug
			.split('-')
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join(' ');
	}

	let categoryName = $derived(getCategoryName(data.categorySlug));
	let pageUrl = $derived(getAbsoluteUrl(`${data.domainSlug}/${data.categorySlug}`));
	let firstProjectImage = $derived(
		projects.length > 0 && projects[0].image
			? getImageUrl(projects[0].image)
			: getImageUrl('/images/maelle/maelle-1.png')
	);
</script>

<svelte:head>
	<title>{categoryName} - Maëlle Bourmeyster</title>
	<meta
		name="description"
		content="Explore {categoryName} projects by Maëlle Bourmeyster, a multidisciplinary artist."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content="{categoryName} - Maëlle Bourmeyster" />
	<meta
		property="og:description"
		content="Explore {categoryName} projects by Maëlle Bourmeyster, a multidisciplinary artist."
	/>
	<meta property="og:image" content={firstProjectImage} />
	<meta property="og:locale" content={$language === 'en' ? 'en_US' : 'fr_FR'} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={pageUrl} />
	<meta name="twitter:title" content="{categoryName} - Maëlle Bourmeyster" />
	<meta
		name="twitter:description"
		content="Explore {categoryName} projects by Maëlle Bourmeyster, a multidisciplinary artist."
	/>
	<meta name="twitter:image" content={firstProjectImage} />

	<!-- Canonical URL -->
	<link rel="canonical" href={pageUrl} />
</svelte:head>

<div class="min-h-screen">
	<!-- Header -->
	<div class="border-b-2 border-black bg-white px-6 py-12">
		<h1 class="text-center text-5xl font-bold tracking-tighter break-words uppercase md:text-6xl">
			{getCategoryName(data.categorySlug)}
		</h1>
	</div>

	<!-- Projects Sections -->
	{#each Object.entries(groupedProjects) as [subCat, groupProjects], i (subCat)}
		<section class="py-16 {i % 2 !== 0 ? 'border-y-2 border-black bg-white' : ''}">
			<div class="mx-auto max-w-7xl px-6">
				<h2 class="mb-8 border-l-4 border-blue-600 pl-4 text-3xl font-bold uppercase">
					{getSubCategoryName(subCat)}
				</h2>
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each groupProjects as project (project.slug)}
						<a
							href={resolve(
								`/${project.domainSlug}/${project.categorySlug}/${project.subCategory}/${project.slug}`
							)}
							class="block"
						>
							<ProjectCard
								title={project.title}
								category={project.category}
								year={project.year}
								image={project.image || project.thumbnail || ''}
							/>
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/each}
</div>
