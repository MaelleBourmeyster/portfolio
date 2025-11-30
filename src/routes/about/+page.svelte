<script lang="ts">
  import { base } from '$app/paths';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);
</script>

<svelte:head>
  <title>{t.about.title} - Maelle Bourmeyster</title>
  <meta name="description" content="Learn more about Maëlle Bourmeyster, a multidisciplinary artist passionate about sculpture, drawing, and craftsmanship." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-5xl md:text-6xl font-bold uppercase tracking-tighter text-center break-words">{t.about.title}</h1>
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

    </div>
  </section>
</div>
