<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  import { projects } from '$lib/data/projects';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);
  
  let categories = $derived([
    { title: t.categories.digitalPainting, projects: projects.filter(p => p.group === 'Digital Painting') },
    { title: t.categories.animation, projects: projects.filter(p => p.group === '2D Animation') },
    { title: t.categories.modeling, projects: projects.filter(p => p.group === '3D Modeling') }
  ]);
</script>

<svelte:head>
  <title>{t.nav.digital} - Maëlle Bourmeyster</title>
  <meta name="description" content="View Maëlle Bourmeyster's digital art portfolio, featuring digital painting, 2D animation, and 3D modeling." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">{t.nav.digital}</h1>
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
