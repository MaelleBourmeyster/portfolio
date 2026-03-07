<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import { resolve } from '$app/paths';
	import { getProjectPath } from '$lib/url';
	import { t } from '$lib/stores/translations';
	import { siteConfig } from '$lib/config';
	import { getCategoryName, getSubCategoryName } from '$lib/utils';
	import type { PageData } from './$types';
	import type { Project } from '$lib/server/projects';

	let { data } = $props<{ data: PageData }>();
	let projects = $derived(data.projects as Project[]);

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

	let categoryName = $derived(getCategoryName($t, data.translationKey, data.categorySlug));
	let categoryDescription = $derived(
		$t.project.categoryMetaDescription.replace('{category}', categoryName)
	);
</script>

<PageMeta
	title={categoryName}
	description={categoryDescription}
	path={`${data.domainSlug}/${data.categorySlug}`}
	image={projects.length > 0 && projects[0].image ? projects[0].image : siteConfig.defaultImage}
	imageAlt={`${categoryName} - ${siteConfig.author}`}
/>

<div class="min-h-screen">
	<PageHeader title={categoryName} />

	<!-- Projects Sections -->
	{#if Object.keys(groupedProjects).length === 0}
		<section class="py-16">
			<div class="mx-auto max-w-7xl px-6 text-center">
				<div class="inline-block border-2 border-pk-ink bg-pk-white p-12 shadow-pk-lg">
					<h2 class="mb-4 text-2xl font-bold uppercase">{categoryName}</h2>
					<p class="text-lg text-gray-600">{$t.project.noProjectsInCategory}</p>
					<Button href={resolve('/')} class="mt-6 inline-block">
						{$t.project.backToHome}
					</Button>
				</div>
			</div>
		</section>
	{:else}
		{#each Object.entries(groupedProjects) as [subCat, groupProjects], i (subCat)}
			<section class="py-16 {i % 2 !== 0 ? 'border-y-2 border-pk-ink bg-pk-white' : ''}">
				<div class="mx-auto max-w-7xl px-6">
					<h2 class="mb-8 border-l-4 border-blue-600 pl-4 text-3xl font-bold uppercase">
						{getSubCategoryName($t, subCat)}
					</h2>
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{#each groupProjects as project, j (project.slug)}
							{@const isFirstCard = i === 0 && j === 0}
							<a
								href={resolve(
									`/${getProjectPath(project)}` as `/${string}/${string}/${string}/${string}`
								)}
								class="block"
							>
								<ProjectCard
									title={project.title}
									category={project.category}
									year={project.year}
									image={project.image || project.thumbnail || ''}
									priority={isFirstCard}
								/>
							</a>
						{/each}
					</div>
				</div>
			</section>
		{/each}
	{/if}
</div>
