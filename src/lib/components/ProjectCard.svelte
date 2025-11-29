<script lang="ts">
  import { language } from '$lib/stores/language';
  
  export let title: string | { en: string; fr: string };
  export let category: string | { en: string; fr: string };
  export let image: string;
  export let year: string;

  // Helper to get string
  function getStr(val: string | { en: string; fr: string }, lang: 'en' | 'fr') {
    if (typeof val === 'string') return val;
    return val[lang];
  }
</script>

<div class="group relative bg-white border-2 border-black p-4 transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_#000] shadow-[4px_4px_0px_#000]">
  <!-- Image Container -->
  <div class="relative aspect-[4/3] w-full overflow-hidden border-2 border-black bg-gray-100 mb-4">
    {#if image}
      <img src={image} alt={getStr(title, $language)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" />
    {:else}
      <div class="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
        NO IMAGE
      </div>
    {/if}
    
    <!-- Overlay Tag -->
    <div class="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold uppercase">
      {year}
    </div>
  </div>

  <!-- Content -->
  <div class="flex items-start justify-between">
    <div>
      <h3 class="text-xl font-bold uppercase leading-none mb-1 group-hover:text-blue-600 transition-colors">{getStr(title, $language)}</h3>
      <p class="text-sm text-gray-500 font-mono">{getStr(category, $language)}</p>
    </div>
    <div class="h-8 w-8 flex items-center justify-center rounded-full border-2 border-black group-hover:bg-black group-hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </div>
  </div>
</div>
