<script lang="ts">
  import CategoryPage from '$lib/components/CategoryPage.svelte';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';
  import type { PageData } from './$types';
  import type { Project } from '$lib/data/projects';

  let { data } = $props<{ data: PageData }>();
  let projects = $derived((data.projects as Project[]) || []);
  let t = $derived(translations[$language]);
</script>

<CategoryPage 
  title={t.nav.bakery}
  description="Explore Maëlle Bourmeyster's bakery creations, from sourdough bread to pastries."
  mainCategory="Bakery"
  projects={projects}
/>
