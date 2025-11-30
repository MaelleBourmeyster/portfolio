<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';
  import type { PageData } from './$types';
  import type { Project } from '$lib/data/projects';

  let { data } = $props<{ data: PageData }>();
  // Access projects from the layout data (which is merged into page data)
  // However, layout data is available in $page.data or passed down.
  // In SvelteKit, parent data is merged.
  
  let projects = $derived((data.projects as Project[]) || []);

  let t = $derived(translations[$language]);
  
  // Filter for Sculpture projects
  let sculptureProjects = $derived(projects.filter(p => p.mainCategory === 'Sculpture'));

  // Group by subCategory
  // We need to map subCategory (e.g. 'Wood') to the translation key (e.g. 'wood')
  // The translation keys in translations.ts seem to be lowercase.
  // Let's check translations.ts to be sure about keys.
  
  function getCategoryTitle(subCat: string) {
      // @ts-ignore
      return t.categories[subCat] || subCat;
  }

  // Get unique subCategories present in the data
  let subCategories = $derived([...new Set(sculptureProjects.map(p => p.subCategory))]);

  let categories = $derived(subCategories.map(sub => ({
      title: getCategoryTitle(sub),
      projects: sculptureProjects.filter(p => p.subCategory === sub)
  })));
</script>

<svelte:head>
  <title>{t.nav.sculpture} - Maëlle Bourmeyster</title>
  <meta name="description" content="Discover Maëlle Bourmeyster's sculpture works in wood, clay, plastiline, bronze, and plaster." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">{t.nav.sculpture}</h1>
  </div>

  {#each categories as category}
    {#if category.projects.length > 0}
      <section class="py-16 px-6 border-b-2 border-black last:border-b-0">
        <div class="mx-auto max-w-7xl">
          <h2 class="text-4xl font-bold uppercase tracking-tighter mb-8 pl-4 border-l-4 border-blue-600">
            {category.title}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each category.projects as project}
              <a href="{base}/project/{project.slug}" class="block">
                <ProjectCard {...project} />
              </a>
            {/each}
          </div>
        </div>
      </section>
    {/if}
  {/each}
</div>
