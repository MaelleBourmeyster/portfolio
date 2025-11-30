<script lang="ts">
  import { base } from '$app/paths';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);

  let tools = $derived([
    { name: t.about.tools.pencils, icon: '✏️' },
    { name: t.about.tools.clay, icon: '🏺' },
    { name: t.about.tools.digital, icon: '🎨' },
    { name: t.about.tools.modeling, icon: '🧊' },
    { name: t.about.tools.animation, icon: '🎬' },
    { name: t.about.tools.wood, icon: '🪵' },
    { name: t.about.tools.pastry, icon: '🥐' },
    { name: t.about.tools.equestrian, icon: '🐎' }
  ]);
</script>

<svelte:head>
  <title>{t.about.title} - Maëlle Bourmeyster</title>
  <meta name="description" content="Learn more about Maëlle Bourmeyster, a multidisciplinary artist passionate about sculpture, drawing, and craftsmanship." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">{t.about.title}</h1>
  </div>

  <section class="py-16 px-6">
    <div class="mx-auto max-w-4xl">
      
      <!-- Intro -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div class="border-2 border-black p-4 shadow-[8px_8px_0px_#000] bg-white">
          <div class="aspect-square bg-gray-200 border-2 border-black overflow-hidden">
             <!-- Profile Image -->
             <img src="{base}/images/maelle/maelle-1.png" alt="Maëlle Bourmeyster" class="w-full h-full object-cover" />
          </div>
        </div>
        
        <div class="space-y-6">
          <p class="text-2xl font-bold leading-tight">
            {t.about.intro1} <span class="text-blue-600">Maëlle Bourmeyster</span>{t.about.intro2}
          </p>
          <p class="text-gray-600 leading-relaxed">
            {t.about.intro3}
          </p>
        </div>
      </div>

      <!-- Vision -->
      <div class="mb-16 space-y-6">
        <h2 class="text-3xl font-bold uppercase tracking-tighter border-l-4 border-blue-600 pl-4">
          {t.about.visionTitle}
        </h2>
        <p class="text-lg text-gray-700 leading-relaxed">
          {t.about.visionText}
        </p>
      </div>

      <!-- Beyond Art -->
      <div class="mb-16 space-y-6">
        <h2 class="text-3xl font-bold uppercase tracking-tighter border-l-4 border-blue-600 pl-4">
          {t.about.beyondTitle}
        </h2>
        <p class="text-lg text-gray-700 leading-relaxed">
          {t.about.beyondText}
        </p>
      </div>

      <!-- Toolbox -->
      <div>
        <h2 class="text-3xl font-bold uppercase tracking-tighter mb-8 text-center">{t.about.toolbox}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {#each tools as tool}
            <div class="border-2 border-black p-4 text-center hover:-translate-y-1 transition-transform bg-white shadow-[4px_4px_0px_#000]">
              <div class="text-4xl mb-2">{tool.icon}</div>
              <div class="font-bold text-sm uppercase">{tool.name}</div>
            </div>
          {/each}
        </div>
      </div>

    </div>
  </section>
</div>
