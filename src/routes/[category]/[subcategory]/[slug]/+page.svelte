<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';

  let { data } = $props<{ data: PageData }>();
  let project = $derived(data.project);

  let t = $derived(translations[$language]);
  let currentImageIndex = $state(0);

  // Helper to get string
  function getStr(val: string | { en: string; fr: string }, lang: 'en' | 'fr') {
    if (typeof val === 'string') return val;
    return val[lang];
  }
</script>

<svelte:head>
  <title>{getStr(project.title, $language)} - Maëlle Bourmeyster</title>
  <meta name="description" content={getStr(project.description, $language) || t.project.noDesc} />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Back Button -->
  <div class="px-6 py-6 border-b-2 border-black">
    <div class="mx-auto max-w-7xl">
      <button onclick={() => history.back()} class="inline-flex items-center gap-2 font-bold uppercase hover:text-blue-600 transition-colors cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t.project.back}
      </button>
    </div>
  </div>

  <div class="mx-auto max-w-7xl px-6 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      <!-- Image Section -->
      <!-- Image Section -->
      <div class="space-y-6">
        {#if project.videos && project.videos.length > 0}
            <div class="border-2 border-black p-4 shadow-[8px_8px_0px_#000] bg-white relative group mb-8">
                <div class="w-full overflow-hidden border-2 border-black bg-gray-100 relative">
                    <VideoPlayer src={project.videos[0]} />
                </div>
            </div>
        {/if}

        {#if project.images && project.images.length > 0}
            {@const images = project.images}
            <div class="border-2 border-black p-4 shadow-[8px_8px_0px_#000] bg-white relative group">
              <div class="w-full overflow-hidden border-2 border-black bg-gray-100 relative">
                <img src={images[currentImageIndex]} alt={getStr(project.title, $language)} class="w-full h-auto object-cover" />
                
                {#if images.length > 1}
                    <button 
                        type="button"
                        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_#000] hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                        onclick={() => currentImageIndex = (currentImageIndex - 1 + images.length) % images.length}
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button 
                        type="button"
                        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_#000] hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                        onclick={() => currentImageIndex = (currentImageIndex + 1) % images.length}
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    
                    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {#each images as _, i}
                            <button 
                                type="button"
                                class="w-3 h-3 border-2 border-black {i === currentImageIndex ? 'bg-blue-600' : 'bg-white'} cursor-pointer"
                                onclick={() => currentImageIndex = i}
                                aria-label="Go to image {i + 1}"
                            ></button>
                        {/each}
                    </div>
                {/if}
              </div>
            </div>
        {:else if project.image}
            <div class="border-2 border-black p-4 shadow-[8px_8px_0px_#000] bg-white">
              <div class="w-full overflow-hidden border-2 border-black bg-gray-100">
                <img src={project.image} alt={getStr(project.title, $language)} class="w-full h-auto object-cover" />
              </div>
            </div>
        {:else if (!project.videos || project.videos.length === 0)}
          <div class="border-2 border-black p-4 shadow-[8px_8px_0px_#000] bg-white">
            <div class="flex h-64 w-full items-center justify-center bg-gray-200 text-gray-400 border-2 border-black">
              NO IMAGE
            </div>
          </div>
        {/if}
      </div>

      <!-- Content Section -->
      <div class="space-y-8">
        <div>
          <div class="inline-block border-2 border-black bg-blue-600 px-3 py-1 text-sm font-bold text-white uppercase mb-4 shadow-[4px_4px_0px_#000]">
            {getStr(project.category, $language)}
          </div>
          <h1 class="text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
            {getStr(project.title, $language)}
          </h1>
          <p class="font-mono text-xl text-gray-500">{project.year}</p>
        </div>

        <div class="border-t-2 border-black pt-8">
          <h2 class="text-2xl font-bold uppercase mb-4">{t.project.about}</h2>
          <p class="text-lg text-gray-700 leading-relaxed">
            {getStr(project.description, $language) || t.project.noDesc}
          </p>
        </div>

        <div class="border-t-2 border-black pt-8">
          <h2 class="text-2xl font-bold uppercase mb-4">{t.project.details}</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="border-2 border-black p-4 bg-[#fdfbf7]">
              <span class="block text-xs font-bold uppercase text-gray-500 mb-1">{t.project.year}</span>
              <span class="font-bold">{project.year}</span>
            </div>
            <div class="border-2 border-black p-4 bg-[#fdfbf7]">
              <span class="block text-xs font-bold uppercase text-gray-500 mb-1">{t.project.category}</span>
              <span class="font-bold">{getStr(project.category, $language)}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
