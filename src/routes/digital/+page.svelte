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
  title={t.nav.digital}
  description="Discover Maëlle Bourmeyster's digital art, including digital painting, 2D animation, and 3D modeling."
  mainCategory="Digital"
  projects={projects}
/>
