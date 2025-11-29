<script lang="ts">
  import homeIcon from '$lib/assets/home.svg';

  let visualArtsLinks = [
    { name: 'Drawing', href: '/drawing' },
    { name: 'Sculpture', href: '/sculpture' },
    { name: 'Digital', href: '/digital' }
  ];

  let livingArtsLinks = [
    { name: 'Bakery', href: '/bakery' },
    { name: 'Horse Riding', href: '/horse-riding' }
  ];

  let otherLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  let isMenuOpen = $state(false);
  let isVisualArtsOpen = $state(false);
  let isLivingArtsOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-4">
  <div class="mx-auto flex max-w-7xl items-center justify-between">
    <a href="/" class="hover:opacity-70 transition-opacity" onclick={() => isMenuOpen = false} aria-label="Home">
      <img src={homeIcon} alt="Home" class="w-8 h-8" />
    </a>
    
    <!-- Desktop Menu -->
    <div class="hidden md:flex gap-8 items-center">
      
      <!-- Visual Arts Dropdown -->
      <div 
        class="relative group"
        onmouseenter={() => isVisualArtsOpen = true}
        onmouseleave={() => isVisualArtsOpen = false}
        role="group"
      >
        <button class="text-lg font-bold hover:text-blue-600 flex items-center gap-1 uppercase">
          Visual Arts
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
        <button class="text-lg font-bold hover:text-blue-600 flex items-center gap-1 uppercase">
          Living Arts
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

      {#each otherLinks as link}
        <a href={link.href} class="text-lg font-bold hover:underline decoration-2 underline-offset-4 decoration-blue-600 uppercase">
          {link.name}
        </a>
      {/each}
    </div>

    <button class="md:hidden pk-btn !px-3 !py-1" onclick={toggleMenu}>
      {isMenuOpen ? 'CLOSE' : 'MENU'}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div class="absolute top-[100%] left-0 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-6 shadow-xl md:hidden flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
      
      <div class="font-bold text-gray-400 text-sm uppercase tracking-widest border-b border-gray-200 pb-2">Visual Arts</div>
      {#each visualArtsLinks as link}
        <a href={link.href} class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all pl-4" onclick={() => isMenuOpen = false}>
          {link.name}
        </a>
      {/each}

      <div class="font-bold text-gray-400 text-sm uppercase tracking-widest border-b border-gray-200 pb-2 mt-4">Living Arts</div>
      {#each livingArtsLinks as link}
        <a href={link.href} class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all pl-4" onclick={() => isMenuOpen = false}>
          {link.name}
        </a>
      {/each}

      <div class="font-bold text-gray-400 text-sm uppercase tracking-widest border-b border-gray-200 pb-2 mt-4">More</div>
      {#each otherLinks as link}
        <a href={link.href} class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all pl-4" onclick={() => isMenuOpen = false}>
          {link.name}
        </a>
      {/each}
    </div>
  {/if}
</nav>
