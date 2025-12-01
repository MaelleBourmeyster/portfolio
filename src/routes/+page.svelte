<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { resolve } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';
	import { getAbsoluteUrl, getImageUrl } from '$lib/config';

	import type { CategoryItem } from '$lib/types';
	import type { PageData } from './$types';

	interface Category extends CategoryItem {
		image: string;
		year: string;
	}

	let { data } = $props<{ data: PageData }>();

	let t = $derived(translations[$language]);
	let jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Maëlle Bourmeyster',
		url: getAbsoluteUrl(),
		image: getImageUrl('/images/maelle/maelle-1.png'),
		jobTitle: t.meta.jobTitle,
		description: t.home.heroDesc,
		sameAs: [],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Lyon',
			addressCountry: 'FR'
		},
		email: 'maelle.bourmeyster@gmail.com'
	});
	let jsonLdString = $derived(JSON.stringify(jsonLd));

	function getTranslatedTitle(slug: string, translationKey: string, fallback: string) {
		if (translationKey && t.nav[translationKey as keyof typeof t.nav]) {
			return t.nav[translationKey as keyof typeof t.nav];
		}
		return fallback;
	}

	let categories = $derived(
		((data.categories as Category[]) || []).map((cat) => ({
			title: getTranslatedTitle(cat.slug, cat.translationKey, cat.name),
			category: t.home.gallery,
			href: cat.href,
			image: cat.image,
			year: cat.year
		}))
	);
</script>

<svelte:head>
	<title>Maëlle Bourmeyster</title>
	<meta name="description" content={t.home.heroDesc} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={getAbsoluteUrl()} />
	<meta property="og:title" content="Maëlle Bourmeyster - Multidisciplinary Artist" />
	<meta property="og:description" content={t.home.heroDesc} />
	<meta property="og:image" content={getImageUrl('/images/maelle/maelle-1.png')} />
	<meta property="og:locale" content={$language === 'en' ? 'en_US' : 'fr_FR'} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={getAbsoluteUrl()} />
	<meta name="twitter:title" content="Maëlle Bourmeyster - Multidisciplinary Artist" />
	<meta name="twitter:description" content={t.home.heroDesc} />
	<meta name="twitter:image" content={getImageUrl('/images/maelle/maelle-1.png')} />

	<!-- Canonical URL -->
	<link rel="canonical" href={getAbsoluteUrl()} />

	<!-- JSON-LD Structured Data -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLdString}</scr` + 'ipt>'}
</svelte:head>

<Hero />

<section id="work" class="border-t-2 border-black bg-white px-6 py-20">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12 flex items-end justify-between">
			<div>
				<h2 class="text-4xl font-bold tracking-tighter uppercase">{t.home.explore}</h2>
				<p class="mt-2 font-mono text-gray-500">{t.home.subtitle}</p>
			</div>
			<div class="hidden text-right font-mono text-sm md:block">
				{t.home.categories}: 01 - 0{categories.length}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#if categories.length === 0}
				<div class="col-span-full p-12 text-center">
					<div class="inline-block border-2 border-black bg-white p-8 shadow-[8px_8px_0px_#000]">
						<p class="mb-2 text-xl font-bold">{t.home.explore}</p>
						<p class="text-gray-600">{t.home.noCategories}</p>
					</div>
				</div>
			{:else}
				{#each categories as cat (cat.href)}
					{@const href = cat.href as `/${string}/${string}`}
					<a href={resolve(href)} class="block">
						<ProjectCard
							title={cat.title}
							category={cat.category}
							year={cat.year}
							image={cat.image}
						/>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</section>
