<script lang="ts">
	import { base } from '$app/paths';
	import { t } from '$lib/stores/translations';
	import { siteConfig } from '$lib/config';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import AnimatedImage from '$lib/components/AnimatedImage.svelte';
</script>

<PageMeta
	title={$t.about.title}
	description={$t.about.metaDescription}
	path="about"
	image={siteConfig.defaultImage}
	ogType="profile"
/>

<div>
	<PageHeader title={$t.about.title} />

	<section class="px-6 py-16">
		<div class="mx-auto max-w-4xl">
			<!-- Intro -->
			<div class="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
				<div class="border-2 border-pk-ink bg-pk-white p-4 shadow-pk-lg">
					<div class="aspect-square overflow-hidden border-2 border-pk-ink bg-pk-surface-hover">
						<AnimatedImage
							src="{base}{siteConfig.defaultImage}"
							alt={siteConfig.author}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				</div>

				<div class="space-y-6">
					<p class="text-2xl leading-tight font-bold">
						{$t.about.intro1} <span class="text-pk-accent">{siteConfig.author}</span>{$t.about
							.intro2}
					</p>
					<p class="leading-relaxed text-pk-muted-strong">
						{$t.about.intro3}
					</p>
				</div>
			</div>

			<!-- Vision -->
			<div class="mb-16 space-y-6">
				<h2 class="border-l-4 border-pk-accent pl-4 text-3xl font-bold tracking-tighter uppercase">
					{$t.about.visionTitle}
				</h2>
				<p class="text-lg leading-relaxed text-gray-700">
					{$t.about.visionText}
				</p>
			</div>

			<!-- Beyond Art -->
			<div class="mb-16 space-y-6">
				<h2 class="border-l-4 border-pk-accent pl-4 text-3xl font-bold tracking-tighter uppercase">
					{$t.about.beyondTitle}
				</h2>
				<p class="text-lg leading-relaxed text-gray-700">
					{$t.about.beyondText}
				</p>
			</div>
		</div>
	</section>
</div>
