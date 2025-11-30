<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  import type { PageData } from './$types';

  interface Category {
    slug: string;
    translationKey: string;
    name: string;
    href: string;
    image: string;
    year: string;
  }

  let { data } = $props<{ data: PageData }>();

  let t = $derived(translations[$language]);

  function getTranslatedTitle(slug: string, translationKey: string, fallback: string) {
    if (translationKey && t.nav[translationKey as keyof typeof t.nav]) {
        return t.nav[translationKey as keyof typeof t.nav];
    }
    return fallback;
  }

  let categories = $derived(((data.categories as Category[]) || []).map((cat) => ({
      title: getTranslatedTitle(cat.slug, cat.translationKey, cat.name),
      category: t.home.gallery,
      href: cat.href,
      image: cat.image,
      year: cat.year
  })));
</script>

<svelte:head>
  <title>Maëlle Bourmeyster</title>
  <meta name="description" content={t.home.heroDesc} />
</svelte:head>

<Hero />

<section id="work" class="py-20 px-6 border-t-2 border-black bg-white">
  <div class="mx-auto max-w-7xl">
    <div class="flex items-end justify-between mb-12">
      <div>
        <h2 class="text-4xl font-bold uppercase tracking-tighter">{t.home.explore}</h2>
        <p class="text-gray-500 font-mono mt-2">{t.home.subtitle}</p>
      </div>
      <div class="hidden md:block text-right font-mono text-sm">
        {t.home.categories}: 01 - 0{categories.length}
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each categories as cat}
        <a href={cat.href} class="block">
          <ProjectCard title={cat.title} category={cat.category} year={cat.year} image={cat.image} />
        </a>
      {/each}
    </div>
  </div>
</section>
