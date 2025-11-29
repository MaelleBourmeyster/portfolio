<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  
  const projects = [
    { title: 'Sourdough Bread', category: 'Bakery', year: '2024', image: `${base}/images/sculpture/bois/ustensiles%20de%20cusine/couteauàbeurre.png` },
    { title: 'Croissants', category: 'Pastry', year: '2024', image: `${base}/images/sculpture/bois/ustensiles%20de%20cusine/cuillère1.png` }
  ];
</script>

<svelte:head>
  <title>Bakery - Maëlle Bourmeyster</title>
  <meta name="description" content="Taste the creations of Maëlle Bourmeyster, from sourdough bread to delicate pastries." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">Bakery</h1>
  </div>

  <section class="py-16 px-6">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each projects as project}
          <ProjectCard {...project} />
        {/each}
      </div>
    </div>
  </section>
</div>
