<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  
  const categories = [
    {
      title: 'Digital Painting',
      projects: [
        { title: 'Digital Painting', category: '2D', year: '2024', image: `${base}/images/sculpture/bois/fictionnalcharacters/lutins.png` }
      ]
    },
    {
      title: '2D Animation',
      projects: [
        { title: 'Short Film', category: 'Animation', year: '2023', image: `${base}/images/sculpture/bois/fictionnalcharacters/stitch.png` }
      ]
    },
    {
      title: '3D Modeling',
      projects: [
        { title: 'Character Model', category: '3D', year: '2024', image: `${base}/images/sculpture/plâtre/rhino.png` }
      ]
    }
  ];
</script>

<svelte:head>
  <title>Digital Art - Maëlle Bourmeyster</title>
  <meta name="description" content="View Maëlle Bourmeyster's digital art portfolio, featuring digital painting, 2D animation, and 3D modeling." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">Digital</h1>
  </div>

  {#each categories as category}
    <section class="py-16 px-6 border-b-2 border-black last:border-b-0">
      <div class="mx-auto max-w-7xl">
        <h2 class="text-4xl font-bold uppercase tracking-tighter mb-8 pl-4 border-l-4 border-blue-600">
          {category.title}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each category.projects as project}
            <ProjectCard {...project} />
          {/each}
        </div>
      </div>
    </section>
  {/each}
</div>
