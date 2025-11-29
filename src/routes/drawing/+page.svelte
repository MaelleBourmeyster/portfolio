<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  
  const categories = [
    {
      title: 'Painting',
      projects: [
        { title: 'Artwork 1', category: 'Painting', year: '2024', image: `${base}/images/sculpture/argile/andrea_cavalcanti%202.png` },
        { title: 'Artwork 2', category: 'Painting', year: '2024', image: `${base}/images/sculpture/argile/andrea_cavalcanti%202.png` }
      ]
    },
    {
      title: 'Manga',
      projects: [
        { title: 'Panel 1', category: 'Manga', year: '2023', image: `${base}/images/sculpture/bois/fictionnalcharacters/totoro.png` }
      ]
    },
    {
      title: 'Pencils & Markers',
      projects: [
        { title: 'Illustration', category: 'Pencils', year: '2023', image: `${base}/images/sculpture/bois/fictionnalcharacters/stitch.png` }
      ]
    },
    {
      title: 'Sketches',
      projects: [
        { title: 'Study', category: 'Sketch', year: '2024', image: `${base}/images/sculpture/bois/coupeapexlegend/coupeprofil-2.png` }
      ]
    }
  ];
</script>

<svelte:head>
  <title>Drawing - Maëlle Bourmeyster</title>
  <meta name="description" content="Explore Maëlle Bourmeyster's drawings, including paintings, manga, pencil sketches, and markers." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">Drawing</h1>
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
