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
  title={t.nav.horseRiding}
  description="Discover Maëlle Bourmeyster's passion for horse riding, including show jumping and leisure riding."
  mainCategory="Horse Riding"
  projects={projects}
/>
