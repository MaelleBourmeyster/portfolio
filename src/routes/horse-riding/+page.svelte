<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  
  const projects = [
    { title: 'Show Jumping', category: 'Competition', year: '2024', image: '/images/sculpture/bronze/horse_head/bronzetêtecheval1125.png' },
    { title: 'Trail Riding', category: 'Leisure', year: '2023', image: '/images/sculpture/plastiline/cheval_11_25.png' }
  ];
</script>

<svelte:head>
  <title>Horse Riding - Maëlle Bourmeyster</title>
  <meta name="description" content="Follow Maëlle Bourmeyster's equestrian journey, from show jumping competitions to trail riding." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">Horse Riding</h1>
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
