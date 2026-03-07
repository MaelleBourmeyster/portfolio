<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/stores/translations';
	import { siteConfig } from '$lib/config';
	import { getTranslatedNavName } from '$lib/utils';
	import { buildPersonJsonLd } from '$lib/seo';

	import type { HomeCategory } from '$lib/types';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	let jsonLd = $derived(
		buildPersonJsonLd({ jobTitle: $t.meta.jobTitle, description: $t.home.heroDesc })
	);

	let categories = $derived(
		data.categories.map((cat: HomeCategory) => ({
			title: getTranslatedNavName($t, cat.translationKey, cat.name),
			category: $t.home.gallery,
			href: cat.href,
			image: cat.image,
			year: cat.year
		}))
	);
</script>

<PageMeta
	title={siteConfig.author}
	description={$t.home.heroDesc}
	noSuffix
	image={siteConfig.defaultImage}
	{jsonLd}
/>

<Hero />

<section id="work" class="border-t-2 border-pk-ink bg-pk-white px-6 py-20">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12 flex items-end justify-between">
			<div>
				<h2 class="text-4xl font-bold tracking-tighter uppercase">{$t.home.explore}</h2>
				<p class="mt-2 font-mono text-gray-500">{$t.home.subtitle}</p>
			</div>
			<div class="hidden text-right font-mono text-sm md:block">
				{$t.home.categories}: 01 - 0{categories.length}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#if categories.length === 0}
				<div class="col-span-full p-12 text-center">
					<div class="inline-block border-2 border-pk-ink bg-pk-white p-8 shadow-pk-lg">
						<p class="mb-2 text-xl font-bold">{$t.home.explore}</p>
						<p class="text-gray-600">{$t.home.noCategories}</p>
					</div>
				</div>
			{:else}
				{#each categories as cat, i (cat.href)}
					{@const href = cat.href}
					<a href={resolve(href)} class="block">
						<ProjectCard
							title={cat.title}
							category={cat.category}
							year={cat.year}
							image={cat.image}
							priority={i === 0}
						/>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</section>
