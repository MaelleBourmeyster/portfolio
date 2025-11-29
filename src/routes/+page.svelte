<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Contact from '$lib/components/Contact.svelte';

  const categories = [
    {
      title: 'Drawing',
      category: 'Gallery',
      year: '2025',
      image: '/project1.png',
      href: '/dessin'
    },
    {
      title: 'Sculpture',
      category: 'Gallery',
      year: '2025',
      image: '/project1.png',
      href: '/sculpture'
    },
    {
      title: 'Digital',
      category: 'Gallery',
      year: '2025',
      image: '/project1.png',
      href: '/numerique'
    },
    {
      title: 'Bakery',
      category: 'Gallery',
      year: '2025',
      image: '/project1.png',
      href: '/boulangerie'
    },
    {
      title: 'Horse Riding',
      category: 'Gallery',
      year: '2025',
      image: '/project1.png',
      href: '/equitation'
    }
  ];
</script>

<div class="min-h-screen flex flex-col">
  
  <main class="flex-grow">
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


    <Contact />
  </main>

  <footer class="border-t-2 border-black bg-white py-8 px-6 text-center">
    <p class="font-mono text-sm text-gray-500">
      © 2025 MAELLE BOURMEYSTER.
    </p>
  </footer>
</div>
