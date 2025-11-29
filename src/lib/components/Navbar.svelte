<script lang="ts">
  let links = [
    { name: 'Dessin', href: '/dessin' },
    { name: 'Sculpture', href: '/sculpture' },
    { name: 'Numérique', href: '/numerique' },
    { name: 'Boulangerie', href: '/boulangerie' },
    { name: 'Équitation', href: '/equitation' },
    { name: 'Contact', href: '#contact' }
  ];
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-4">
  <div class="mx-auto flex max-w-7xl items-center justify-between">
    <a href="/" class="text-2xl font-bold uppercase tracking-tighter hover:text-blue-600 transition-colors">
      MAELLE BOURMEYSTER
    </a>
    
    <div class="hidden md:flex gap-8">
      {#each links as link}
        <a href={link.href} class="text-lg font-bold hover:underline decoration-2 underline-offset-4 decoration-blue-600">
          {link.name}
        </a>
      {/each}
    </div>

    <button class="md:hidden pk-btn !px-3 !py-1">
      MENU
    </button>
  </div>
</nav>
