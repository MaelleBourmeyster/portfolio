<script lang="ts">
	import { base } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	let t = $derived(translations[$language]);
</script>

<svelte:head>
	<title>{t.about.title} - Maelle Bourmeyster</title>
	<meta
		name="description"
		content="Learn more about Maëlle Bourmeyster, a multidisciplinary artist passionate about sculpture, drawing, and craftsmanship."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://maellebourmeyster.github.io/portfolio/about" />
	<meta property="og:title" content="About - Maëlle Bourmeyster" />
	<meta
		property="og:description"
		content="Learn more about Maëlle Bourmeyster, a multidisciplinary artist passionate about sculpture, drawing, and craftsmanship."
	/>
	<meta
		property="og:image"
		content="https://maellebourmeyster.github.io/portfolio/images/maelle/maelle-1.png"
	/>
	<meta property="og:locale" content={$language === 'en' ? 'en_US' : 'fr_FR'} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://maellebourmeyster.github.io/portfolio/about" />
	<meta name="twitter:title" content="About - Maëlle Bourmeyster" />
	<meta
		name="twitter:description"
		content="Learn more about Maëlle Bourmeyster, a multidisciplinary artist passionate about sculpture, drawing, and craftsmanship."
	/>
	<meta
		name="twitter:image"
		content="https://maellebourmeyster.github.io/portfolio/images/maelle/maelle-1.png"
	/>

	<!-- Canonical URL -->
	<link rel="canonical" href="https://maellebourmeyster.github.io/portfolio/about" />
</svelte:head>

<div>
	<div class="border-b-2 border-black bg-white px-6 py-12">
		<h1 class="text-center text-5xl font-bold tracking-tighter break-words uppercase md:text-6xl">
			{t.about.title}
		</h1>
	</div>

	<section class="px-6 py-16">
		<div class="mx-auto max-w-4xl">
			<!-- Intro -->
			<div class="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
				<div class="border-2 border-black bg-white p-4 shadow-[8px_8px_0px_#000]">
					<div class="aspect-square overflow-hidden border-2 border-black bg-gray-200">
						<!-- Profile Image -->
						<img
							src="{base}/images/maelle/maelle-1.png"
							alt="Maëlle Bourmeyster"
							class="h-full w-full object-cover"
						/>
					</div>
				</div>

				<div class="space-y-6">
					<p class="text-2xl leading-tight font-bold">
						{t.about.intro1} <span class="text-blue-600">Maëlle Bourmeyster</span>{t.about.intro2}
					</p>
					<p class="leading-relaxed text-gray-600">
						{t.about.intro3}
					</p>
				</div>
			</div>

			<!-- Vision -->
			<div class="mb-16 space-y-6">
				<h2 class="border-l-4 border-blue-600 pl-4 text-3xl font-bold tracking-tighter uppercase">
					{t.about.visionTitle}
				</h2>
				<p class="text-lg leading-relaxed text-gray-700">
					{t.about.visionText}
				</p>
			</div>

			<!-- Beyond Art -->
			<div class="mb-16 space-y-6">
				<h2 class="border-l-4 border-blue-600 pl-4 text-3xl font-bold tracking-tighter uppercase">
					{t.about.beyondTitle}
				</h2>
				<p class="text-lg leading-relaxed text-gray-700">
					{t.about.beyondText}
				</p>
			</div>
		</div>
	</section>
</div>
