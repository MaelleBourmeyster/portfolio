<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  
  const categories = [
    {
      title: 'Painting',
      projects: [
        { title: 'Artwork 1', category: 'Painting', year: '2024', image: '/project1.png' },
        { title: 'Artwork 2', category: 'Painting', year: '2024', image: '/project1.png' }
      ]
    },
    {
      title: 'Manga',
      projects: [
        { title: 'Panel 1', category: 'Manga', year: '2023', image: '/project1.png' }
      ]
    },
    {
      title: 'Pencils & Markers',
      projects: [
        { title: 'Illustration', category: 'Pencils', year: '2023', image: '/project1.png' }
      ]
    },
    {
      title: 'Sketches',
      projects: [
        { title: 'Study', category: 'Sketch', year: '2024', image: '/project1.png' }
      ]
    }
  ];
</script>

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
