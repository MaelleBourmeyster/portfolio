<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { resolve } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';
	import type { Project } from '$lib/data/projects';

	let { title, description, mainCategory, projects } = $props<{
		title: string;
		description: string;
		mainCategory: string;
		projects: Project[];
	}>();

	let t = $derived(translations[$language]);

	let filteredProjects = $derived(projects.filter((p: Project) => p.mainCategory === mainCategory));

	function getCategoryTitle(subCat: string) {
		const categories = t.categories as Record<string, string>;
		return categories[subCat] || subCat;
	}

	let subCategories = $derived([
		...new Set(filteredProjects.map((p: Project) => p.subCategory))
	] as string[]);

	let categories = $derived(
		subCategories.map((sub: string) => ({
			id: sub,
			title: getCategoryTitle(sub),
			projects: filteredProjects.filter((p: Project) => p.subCategory === sub)
		}))
	);
</script>

<svelte:head>
	<title>{title} - Maëlle Bourmeyster</title>
	<meta name="description" content={description} />
</svelte:head>

<div>
	<div class="border-b-2 border-black bg-white px-6 py-12">
		<h1 class="text-center text-5xl font-bold tracking-tighter break-words uppercase md:text-6xl">
			{title}
		</h1>
	</div>

	{#each categories as category, i (category.id)}
		{#if category.projects.length > 0}
			<section
				class="border-b-2 border-black px-6 py-16 last:border-b-0"
				class:bg-white={i % 2 !== 0}
			>
				<div class="mx-auto max-w-7xl">
					<h2
						class="mb-8 border-l-4 border-blue-600 pl-4 text-4xl font-bold tracking-tighter uppercase"
					>
						{category.title}
					</h2>

					<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{#each category.projects as project (project.slug)}
							<a
								href={resolve(`/${project.categorySlug}/${project.subCategory}/${project.slug}`)}
								class="block"
							>
								<ProjectCard {...project} />
							</a>
						{/each}
					</div>
				</div>
			</section>
		{/if}
	{/each}
</div>
