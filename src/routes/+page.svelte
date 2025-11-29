<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Contact from '$lib/components/Contact.svelte';

  const projects = [
    {
      title: 'Neural Architecture',
      category: 'Generative Art',
      year: '2024',
      image: '/project1.png'
    },
    {
      title: 'Void Structure',
      category: '3D Modeling',
      year: '2023',
      image: '/project1.png' // Reusing for demo
    },
    {
      title: 'Binary Flow',
      category: 'Interactive Installation',
      year: '2023',
      image: '/project1.png' // Reusing for demo
    }
  ];
</script>

<div class="min-h-screen flex flex-col">
  <Navbar />
  
  <main class="flex-grow">
    <Hero />
    
    <section id="work" class="py-20 px-6 border-t-2 border-black bg-white">
      <div class="mx-auto max-w-7xl">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-4xl font-bold uppercase tracking-tighter">Selected Works</h2>
            <p class="text-gray-500 font-mono mt-2">A curation of digital experiments.</p>
          </div>
          <div class="hidden md:block text-right font-mono text-sm">
            INDEX: 01 - 0{projects.length}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each projects as project}
            <ProjectCard {...project} />
          {/each}
        </div>
      </div>
    </section>

    <section id="about" class="py-20 px-6 border-t-2 border-black bg-[#fdfbf7]">
      <div class="mx-auto max-w-4xl text-center space-y-8">
        <h2 class="text-4xl font-bold uppercase tracking-tighter">About The Process</h2>
        <p class="text-xl leading-relaxed font-medium text-gray-800">
          "I believe in the intersection of <span class="bg-blue-600 text-white px-1">logic</span> and <span class="bg-black text-white px-1">emotion</span>. 
          My work explores how rigid structures can give rise to organic chaos, using code as a medium for expression."
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div class="p-4 border-2 border-black bg-white text-sm font-bold uppercase">Creative Coding</div>
          <div class="p-4 border-2 border-black bg-white text-sm font-bold uppercase">Web Design</div>
          <div class="p-4 border-2 border-black bg-white text-sm font-bold uppercase">3D Motion</div>
          <div class="p-4 border-2 border-black bg-white text-sm font-bold uppercase">Interaction</div>
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
