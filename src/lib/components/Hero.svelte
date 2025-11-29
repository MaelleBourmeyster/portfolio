<script lang="ts">
  import { base } from '$app/paths';
  // No props needed for now
</script>

<section class="relative flex min-h-[calc(100vh-70px)] flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
  <!-- Decorative elements -->
  <!-- Decorative elements removed -->
  
  <div class="relative z-10 max-w-4xl space-y-8">
    <div class="inline-block border-2 border-black bg-white px-4 py-1 text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_#000]">
      Portfolio 2025
    </div>
    
    <h1 class="text-6xl font-bold leading-[1.1] md:text-8xl tracking-tighter">
      MAËLLE <br />
      <span class="text-blue-600">BOURMEYSTER</span>
    </h1>
    
    <p class="mx-auto max-w-2xl text-xl md:text-2xl text-gray-600 font-medium">
      A multidisciplinary journey through Fine Arts, Digital Creation, and Craftsmanship.
    </p>
    
    <div class="flex flex-col items-center justify-center gap-4 md:flex-row pt-8">
      <a href="{base}/#work" class="pk-btn !bg-blue-600 text-white hover:!bg-blue-700">
        View Projects
      </a>
      <a href="{base}/contact" class="pk-btn">
        Get in Touch
      </a>
    </div>
  </div>

  <!-- Background Grid Accent -->
  <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
</section>
