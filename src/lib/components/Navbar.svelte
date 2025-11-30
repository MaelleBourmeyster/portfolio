<script lang="ts">
  import { base } from '$app/paths';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let { navigationTree } = $props<{ navigationTree: any[] }>();

  let t = $derived(translations[$language]);

  let isMenuOpen = $state(false);
  // Track open state for each dropdown by slug
  let openDropdowns = $state<Record<string, boolean>>({});

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function toggleLanguage() {
    language.toggle();
  }

  function getTranslatedName(slug: string, fallback: string) {
    // Try to find translation in nav keys
    // Convert slug to camelCase for key matching if needed, or just use mapped keys
    const keyMap: Record<string, string> = {
        'visual-arts': 'visualArts',
        'living-arts': 'livingArts',
        'drawing': 'drawing',
        'sculpture': 'sculpture',
        'digital': 'digital',
        'bakery': 'bakery',
        'horse-riding': 'horseRiding'
    };
    const key = keyMap[slug];
    if (key && t.nav[key as keyof typeof t.nav]) {
        return t.nav[key as keyof typeof t.nav];
    }
    return fallback;
  }
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-4">
  <div class="mx-auto flex max-w-7xl items-center justify-between">
    
    <!-- Desktop Menu (Left Aligned) -->
    <div class="hidden md:flex gap-8 items-center">
      <!-- Home Link -->
      <a href="{base}/" class="nav-link">
        {t.nav.home}
      </a>

      <!-- About Link -->
      <a href="{base}/about" class="nav-link">
        {t.nav.about}
      </a>
      
      <!-- Dynamic Dropdowns -->
      {#each navigationTree as domain}
        <div 
            class="relative group"
            onmouseenter={() => openDropdowns[domain.slug] = true}
            onmouseleave={() => openDropdowns[domain.slug] = false}
            role="group"
        >
            <button class="text-lg font-bold hover:text-blue-600 hover:underline decoration-2 underline-offset-4 decoration-blue-600 flex items-center gap-1 uppercase">
            {getTranslatedName(domain.slug, domain.name)}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            </button>

            <div class="absolute top-full left-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
            <div class="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col">
                {#each domain.categories as cat}
                <a href={cat.href} class="px-4 py-3 font-bold hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 last:border-0 transition-colors">
                    {getTranslatedName(cat.slug, cat.name)}
                </a>
                {/each}
            </div>
            </div>
        </div>
      {/each}

      <!-- Contact Link -->
      <a href="{base}/contact" class="nav-link">
        {t.nav.contact}
      </a>
    </div>

    <!-- Language Toggle (Desktop - Right Aligned) -->
    <button 
      type="button"
      onclick={toggleLanguage}
      class="hidden md:block pk-btn !px-3 !py-1 ml-auto"
    >
      {$language}
    </button>

    <!-- Mobile Header (Controls) -->
    <div class="flex md:hidden w-full justify-between items-center">
      <button 
        type="button"
        onclick={toggleLanguage}
        class="pk-btn !px-3 !py-1"
      >
        {$language}
      </button>
      
      <button class="pk-btn !px-3 !py-1" onclick={toggleMenu}>
        {isMenuOpen ? t.nav.close : t.nav.menu}
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div class="absolute top-[100%] left-0 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-6 shadow-xl md:hidden flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
      
      <a href="{base}/" class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all border-b border-gray-200 pb-2" onclick={() => isMenuOpen = false}>
        {t.nav.home}
      </a>

      <a href="{base}/about" class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all border-b border-gray-200 pb-2" onclick={() => isMenuOpen = false}>
        {t.nav.about}
      </a>

      {#each navigationTree as domain}
        <div class="font-bold text-gray-400 text-sm uppercase tracking-widest border-b border-gray-200 pb-2 mt-4">
            {getTranslatedName(domain.slug, domain.name)}
        </div>
        {#each domain.categories as cat}
            <a href={cat.href} class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all pl-4" onclick={() => isMenuOpen = false}>
            {getTranslatedName(cat.slug, cat.name)}
            </a>
        {/each}
      {/each}

      <a href="{base}/contact" class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all border-b border-gray-200 pb-2 mt-4" onclick={() => isMenuOpen = false}>
        {t.nav.contact}
      </a>
    </div>
  {/if}
</nav>
