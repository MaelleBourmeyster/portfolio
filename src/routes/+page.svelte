<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { base } from '$app/paths';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  import type { PageData } from './$types';
  import type { Project } from '$lib/data/projects';

  let { data } = $props<{ data: PageData }>();
  let projects = $derived((data.projects as Project[]) || []);

  let t = $derived(translations[$language]);

  function getCategoryLatest(mainCat: string) {
      const catProjects = projects.filter(p => p.mainCategory === mainCat && p.image);
      // Sort by year descending to show the most recent work
      catProjects.sort((a, b) => parseInt(b.year || '0') - parseInt(a.year || '0'));
      
      if (catProjects.length > 0) {
          return {
              image: catProjects[0].image,
              year: catProjects[0].year
          };
      }
      // Fallback if no project exists in this category
      return { image: '', year: new Date().getFullYear().toString() };
  }

  let categories = $derived([
    {
      title: t.nav.drawing,
      category: 'Gallery',
      href: `${base}/drawing`,
      ...getCategoryLatest('Drawing')
    },
    {
      title: t.nav.sculpture,
      category: 'Gallery',
      href: `${base}/sculpture`,
      ...getCategoryLatest('Sculpture')
    },
    {
      title: t.nav.digital,
      category: 'Gallery',
      href: `${base}/digital`,
      ...getCategoryLatest('Digital')
    },
    {
      title: t.nav.bakery,
      category: 'Gallery',
      href: `${base}/bakery`,
      ...getCategoryLatest('Bakery')
    },
    {
      title: t.nav.horseRiding,
      category: 'Gallery',
      href: `${base}/horse-riding`,
      ...getCategoryLatest('Horse Riding')
    }
  ]);
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
