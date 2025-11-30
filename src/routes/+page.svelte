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

  function getCategoryImage(mainCat: string, defaultImage: string) {
      const project = projects.find(p => p.mainCategory === mainCat && p.image);
      return project ? project.image : defaultImage;
  }

  let categories = $derived([
    {
      title: t.nav.drawing,
      category: 'Gallery',
      year: '2025',
      image: getCategoryImage('Drawing', `${base}/projects/artwork-1/images/painting-horses.png`),
      href: `${base}/drawing`
    },
    {
      title: t.nav.sculpture,
      category: 'Gallery',
      year: '2025',
      image: getCategoryImage('Sculpture', `${base}/projects/wood-sculpture-1/images/cup-front.png`),
      href: `${base}/sculpture`
    },
    {
      title: t.nav.digital,
      category: 'Gallery',
      year: '2025',
      image: getCategoryImage('Digital', `${base}/projects/digital-painting/images/shoto.png`),
      href: `${base}/digital`
    },
    {
      title: t.nav.bakery,
      category: 'Gallery',
      year: '2025',
      image: getCategoryImage('Bakery', `${base}/projects/sourdough-bread/images/butter-knife.png`),
      href: `${base}/bakery`
    },
    {
      title: t.nav.horseRiding,
      category: 'Gallery',
      year: '2025',
      image: getCategoryImage('Horse Riding', `${base}/projects/horse-head/images/bronze-horse-head.png`),
      href: `${base}/horse-riding`
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
