<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Contact from '$lib/components/Contact.svelte';

  import { base } from '$app/paths';

  const categories = [
    {
      title: 'Drawing',
      category: 'Gallery',
      year: '2025',
      image: `${base}/images/sculpture/argile/andrea_cavalcanti%202.png`,
      href: `${base}/drawing`
    },
    {
      title: 'Sculpture',
      category: 'Gallery',
      year: '2025',
      image: `${base}/images/sculpture/bois/coupeapexlegend/coupeface.png`,
      href: `${base}/sculpture`
    },
    {
      title: 'Digital',
      category: 'Gallery',
      year: '2025',
      image: `${base}/images/sculpture/bois/fictionnalcharacters/stitch.png`,
      href: `${base}/digital`
    },
    {
      title: 'Bakery',
      category: 'Gallery',
      year: '2025',
      image: `${base}/images/sculpture/bois/ustensiles%20de%20cusine/cuillère1.png`,
      href: `${base}/bakery`
    },
    {
      title: 'Horse Riding',
      category: 'Gallery',
      year: '2025',
      image: `${base}/images/sculpture/bronze/horse_head/bronzetêtecheval1125.png`,
      href: `${base}/horse-riding`
    }
  ];
</script>

<svelte:head>
  <title>Maëlle Bourmeyster - Portfolio 2025</title>
  <meta name="description" content="Explore the multidisciplinary portfolio of Maëlle Bourmeyster, featuring Fine Arts, Digital Creation, and Craftsmanship." />
</svelte:head>

<Hero />

<section id="work" class="py-20 px-6 border-t-2 border-black bg-white">
  <div class="mx-auto max-w-7xl">
    <div class="flex items-end justify-between mb-12">
      <div>
        <h2 class="text-4xl font-bold uppercase tracking-tighter">Explore Work</h2>
        <p class="text-gray-500 font-mono mt-2">Discover the different facets of my creativity.</p>
      </div>
      <div class="hidden md:block text-right font-mono text-sm">
        CATEGORIES: 01 - 0{categories.length}
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each categories as cat}
        <a href={cat.href} class="block">
          <ProjectCard title={cat.title} category={cat.category} year={cat.year} image={cat.image} />
        </a>
      {/each}
    </div>
  </div>
</section>
