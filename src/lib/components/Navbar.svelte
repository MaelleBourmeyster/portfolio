<script lang="ts">
  import { base } from '$app/paths';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);

  let visualArtsLinks = $derived([
    { name: t.nav.drawing, href: `${base}/drawing` },
    { name: t.nav.sculpture, href: `${base}/sculpture` },
    { name: t.nav.digital, href: `${base}/digital` }
  ]);

  let livingArtsLinks = $derived([
    { name: t.nav.bakery, href: `${base}/bakery` },
    { name: t.nav.horseRiding, href: `${base}/horse-riding` }
  ]);

  let isMenuOpen = $state(false);
  let isVisualArtsOpen = $state(false);
  let isLivingArtsOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function toggleLanguage() {
    language.toggle();
  }
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-4">
  <div class="mx-auto flex max-w-7xl items-center justify-between">
    
    <!-- Desktop Menu (Left Aligned) -->
    <div class="hidden md:flex gap-8 items-center">
      <!-- Home Link -->
      <a href="{base}/" class="text-lg font-bold hover:text-blue-600 hover:underline decoration-2 underline-offset-4 decoration-blue-600 uppercase">
        {t.nav.home}
      </a>

      <!-- About Link -->
      <a href="{base}/about" class="text-lg font-bold hover:text-blue-600 hover:underline decoration-2 underline-offset-4 decoration-blue-600 uppercase">
        {t.nav.about}
      </a>
      
      <!-- Visual Arts Dropdown -->
      <div 
        class="relative group"
        onmouseenter={() => isVisualArtsOpen = true}
        onmouseleave={() => isVisualArtsOpen = false}
        role="group"
      >
        <button class="text-lg font-bold hover:text-blue-600 hover:underline decoration-2 underline-offset-4 decoration-blue-600 flex items-center gap-1 uppercase">
          {t.nav.visualArts}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <div class="absolute top-full left-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
          <div class="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col">
            {#each visualArtsLinks as link}
              <a href={link.href} class="px-4 py-3 font-bold hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 last:border-0 transition-colors">
                {link.name}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <!-- Living Arts Dropdown -->
      <div 
        class="relative group"
        onmouseenter={() => isLivingArtsOpen = true}
        onmouseleave={() => isLivingArtsOpen = false}
        role="group"
      >
        <button class="text-lg font-bold hover:text-blue-600 hover:underline decoration-2 underline-offset-4 decoration-blue-600 flex items-center gap-1 uppercase">
          {t.nav.livingArts}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <div class="absolute top-full left-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
          <div class="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col">
            {#each livingArtsLinks as link}
              <a href={link.href} class="px-4 py-3 font-bold hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 last:border-0 transition-colors">
                {link.name}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <!-- Contact Link -->
      <a href="{base}/contact" class="text-lg font-bold hover:text-blue-600 hover:underline decoration-2 underline-offset-4 decoration-blue-600 uppercase">
        {t.nav.contact}
      </a>
    </div>

    <!-- Language Toggle (Desktop - Right Aligned) -->
    <button 
      onclick={toggleLanguage}
      class="hidden md:block font-mono text-sm font-bold border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors uppercase ml-auto"
    >
      {$language}
    </button>

    <!-- Mobile Header (Home + Controls) -->
    <div class="flex md:hidden w-full justify-between items-center">
      <a href="{base}/" class="text-lg font-bold uppercase" onclick={() => isMenuOpen = false}>
        MAËLLE B.
      </a>
      
      <div class="flex items-center gap-4">
        <button 
          onclick={toggleLanguage}
          class="font-mono text-sm font-bold border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors uppercase"
        >
          {$language}
        </button>
        <button class="pk-btn !px-3 !py-1" onclick={toggleMenu}>
          {isMenuOpen ? t.nav.close : t.nav.menu}
        </button>
      </div>
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

      <div class="font-bold text-gray-400 text-sm uppercase tracking-widest border-b border-gray-200 pb-2 mt-4">{t.nav.visualArts}</div>
      {#each visualArtsLinks as link}
        <a href={link.href} class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all pl-4" onclick={() => isMenuOpen = false}>
          {link.name}
        </a>
      {/each}

      <div class="font-bold text-gray-400 text-sm uppercase tracking-widest border-b border-gray-200 pb-2 mt-4">{t.nav.livingArts}</div>
      {#each livingArtsLinks as link}
        <a href={link.href} class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all pl-4" onclick={() => isMenuOpen = false}>
          {link.name}
        </a>
      {/each}

      <a href="{base}/contact" class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all border-b border-gray-200 pb-2 mt-4" onclick={() => isMenuOpen = false}>
        {t.nav.contact}
      </a>
    </div>
  {/if}
</nav>
