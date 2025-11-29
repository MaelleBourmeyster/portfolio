<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ project } = data);
</script>

<svelte:head>
  <title>{project.title} - Maëlle Bourmeyster</title>
  <meta name="description" content={project.description || `Details about ${project.title}`} />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <!-- Header / Title Section -->
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <div class="mx-auto max-w-7xl">
      <div class="mb-4">
        <a href="{base}/" class="text-sm font-mono text-gray-500 hover:text-black hover:underline uppercase">
          &larr; Back to Home
        </a>
      </div>
      <h1 class="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
        {project.title}
      </h1>
      <div class="flex gap-4 mt-4 font-mono text-sm uppercase">
        <span class="bg-blue-600 text-white px-2 py-1">{project.category}</span>
        <span class="border border-black px-2 py-1">{project.year}</span>
      </div>
    </div>
  </div>

  <!-- Content Section -->
  <main class="flex-grow py-16 px-6 bg-[#fdfbf7]">
    <div class="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      <!-- Main Image -->
      <div class="lg:col-span-2">
        <div class="border-2 border-black bg-white p-2 shadow-[8px_8px_0px_#000]">
          <img 
            src={project.image} 
            alt={project.title} 
            class="w-full h-auto object-cover border border-black"
          />
        </div>
      </div>

      <!-- Details / Sidebar -->
      <div class="lg:col-span-1 space-y-8">
        <div class="pk-card">
          <h3 class="text-xl font-bold uppercase mb-4 border-b-2 border-black pb-2">About Project</h3>
          <p class="text-gray-600 leading-relaxed">
            {project.description || 'No description available for this project.'}
          </p>
        </div>

        <!-- Navigation / Related (Placeholder) -->
        <div class="pk-card bg-blue-50">
          <h3 class="text-xl font-bold uppercase mb-4">Details</h3>
          <ul class="space-y-2 font-mono text-sm">
            <li class="flex justify-between border-b border-black/10 pb-1">
              <span class="text-gray-500">Year</span>
              <span>{project.year}</span>
            </li>
            <li class="flex justify-between border-b border-black/10 pb-1">
              <span class="text-gray-500">Category</span>
              <span>{project.category}</span>
            </li>
            <li class="flex justify-between border-b border-black/10 pb-1">
              <span class="text-gray-500">Medium</span>
              <span>{project.group || 'N/A'}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </main>
</div>
