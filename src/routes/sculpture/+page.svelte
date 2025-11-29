<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  import { projects } from '$lib/data/projects';
  
  // Group projects by their 'group' property
  const categories = [
    { title: 'Wood', projects: projects.filter(p => p.group === 'Wood') },
    { title: 'Clay', projects: projects.filter(p => p.group === 'Clay') },
    { title: 'Plastiline', projects: projects.filter(p => p.group === 'Plastiline') },
    { title: 'Bronze', projects: projects.filter(p => p.group === 'Bronze') },
    { title: 'Plaster', projects: projects.filter(p => p.group === 'Plaster') }
  ];
</script>

<svelte:head>
  <title>Sculpture - Maëlle Bourmeyster</title>
  <meta name="description" content="Discover Maëlle Bourmeyster's sculpture works in wood, clay, plastiline, bronze, and plaster." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">Sculpture</h1>
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
