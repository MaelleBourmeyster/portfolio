<script lang="ts">
  let links = [
    { name: 'Drawing', href: '/dessin' },
    { name: 'Sculpture', href: '/sculpture' },
    { name: 'Digital', href: '/numerique' },
    { name: 'Bakery', href: '/boulangerie' },
    { name: 'Horse Riding', href: '/equitation' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#contact' }
  ];

  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-4">
  <div class="mx-auto flex max-w-7xl items-center justify-between">
    <a href="/" class="text-2xl font-bold uppercase tracking-tighter hover:text-blue-600 transition-colors" onclick={() => isMenuOpen = false}>
      MAELLE BOURMEYSTER
    </a>
    
    <div class="hidden md:flex gap-8">
      {#each links as link}
        <a href={link.href} class="text-lg font-bold hover:underline decoration-2 underline-offset-4 decoration-blue-600">
          {link.name}
        </a>
      {/each}
    </div>

    <button class="md:hidden pk-btn !px-3 !py-1" onclick={toggleMenu}>
      {isMenuOpen ? 'CLOSE' : 'MENU'}
    </button>
  </div>

  {#if isMenuOpen}
    <div class="absolute top-[100%] left-0 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-6 shadow-xl md:hidden flex flex-col gap-6">
      {#each links as link}
        <a 
          href={link.href} 
          class="text-xl font-bold uppercase tracking-wide hover:text-blue-600 hover:pl-2 transition-all"
          onclick={() => isMenuOpen = false}
        >
          {link.name}
        </a>
      {/each}
    </div>
  {/if}
</nav>
