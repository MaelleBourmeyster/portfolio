<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  
  const categories = [
    {
      title: 'Wood',
      projects: [
        { title: 'Wood Sculpture 1', category: 'Wood', year: '2024', image: '/project1.png' }
      ]
    },
    {
      title: 'Clay',
      projects: [
        { title: 'Modeling 1', category: 'Clay', year: '2023', image: '/project1.png' }
      ]
    },
    {
      title: 'Plastiline',
      projects: [
        { title: 'Plastiline Study', category: 'Plastiline', year: '2023', image: '/project1.png' }
      ]
    },
    {
      title: 'Bronze',
      projects: [
        { title: 'Cast Bronze', category: 'Bronze', year: '2022', image: '/project1.png' }
      ]
    },
    {
      title: 'Plaster',
      projects: [
        { title: 'Plaster Cast', category: 'Plaster', year: '2024', image: '/project1.png' }
      ]
    }
  ];
</script>

<div class="pt-20">
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">Sculpture</h1>
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
