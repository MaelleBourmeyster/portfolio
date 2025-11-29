<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  import { projects } from '$lib/data/projects';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);
  
  const bakeryProjects = projects.filter(p => p.group === 'Bakery');
</script>

<svelte:head>
  <title>{t.nav.bakery} - Maëlle Bourmeyster</title>
  <meta name="description" content="Taste the creations of Maëlle Bourmeyster, from sourdough bread to delicate pastries." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">{t.nav.bakery}</h1>
  </div>

  <section class="py-16 px-6">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each bakeryProjects as project}
          <a href="{base}/project/{project.slug}" class="block">
            <ProjectCard {...project} />
          </a>
        {/each}
      </div>
    </div>
  </section>
</div>
