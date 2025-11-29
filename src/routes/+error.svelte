<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>{$page.status} - Maëlle Bourmeyster</title>
</svelte:head>

<div class="relative flex min-h-[calc(100vh-70px)] flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
  <div class="relative z-10 max-w-2xl space-y-8">
    <div class="inline-block border-2 border-black bg-white px-4 py-1 text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_#000]">
      Error {$page.status}
    </div>
    
    <h1 class="text-8xl md:text-9xl font-bold tracking-tighter text-blue-600">
      {$page.status}
    </h1>
    
    <h2 class="text-2xl md:text-4xl font-bold uppercase tracking-tight">
      {$page.error?.message || 'Something went wrong'}
    </h2>
    
    <p class="mx-auto max-w-lg text-lg text-gray-600 font-medium">
      It seems you've wandered into uncharted territory. Let's get you back on track.
    </p>
    
    <div class="pt-8">
      <a href="{base}/" class="pk-btn inline-block">
        Return Home
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
</div>
