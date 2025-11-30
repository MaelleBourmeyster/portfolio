<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';
  import type { PageData } from './$types';
  import type { Project } from '$lib/data/projects';

  let { data } = $props<{ data: PageData }>();
  let projects = $derived(data.projects as Project[]);
  let t = $derived(translations[$language]);

  let groupedProjects = $derived.by(() => {
    const groups: Record<string, Project[]> = {};
    projects.forEach(p => {
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
    return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }
</script>

<div class="min-h-screen">
  <!-- Header -->
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-5xl md:text-6xl font-bold uppercase tracking-tighter text-center break-words">
      {getCategoryName(data.categorySlug)}
    </h1>
  </div>

  <!-- Projects Sections -->
  {#each Object.entries(groupedProjects) as [subCat, groupProjects], i}
    <section class="py-16 {i % 2 !== 0 ? 'bg-white border-y-2 border-black' : ''}">
        <div class="mx-auto max-w-7xl px-6">
            <h2 class="text-3xl font-bold uppercase mb-8 border-l-4 border-blue-600 pl-4">
                {getSubCategoryName(subCat)}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each groupProjects as project}
                <a href="{base}/{project.domainSlug}/{project.categorySlug}/{project.subCategory}/{project.slug}" class="block">
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
