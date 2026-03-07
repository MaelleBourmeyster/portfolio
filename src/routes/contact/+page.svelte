<script lang="ts">
	import { t } from '$lib/stores/translations';
	import { siteConfig } from '$lib/config';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<PageMeta
	title={$t.contact.title}
	description={$t.contact.metaDescription}
	path="contact"
	image={siteConfig.defaultImage}
/>

<div>
	<PageHeader title={$t.contact.title} />

	<section class="px-6 py-16 text-center">
		<div class="mx-auto max-w-4xl">
			<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
				<!-- Contact Info -->
				<div class="space-y-8">
					<div>
						<h2 class="mb-4 text-2xl font-bold uppercase">{$t.contact.infoTitle}</h2>
						<p class="mb-6 text-gray-600">
							{$t.contact.infoText}
						</p>
					</div>

					<div class="space-y-6">
						<div class="border-2 border-pk-ink bg-pk-white p-6 shadow-pk">
							<h3 class="mb-2 font-bold uppercase">{$t.contact.email}</h3>
							<a href="mailto:{siteConfig.email}" class="break-all text-blue-600 hover:underline">
								{siteConfig.email}
							</a>
						</div>

						<div class="border-2 border-pk-ink bg-pk-white p-6 shadow-pk">
							<h3 class="mb-2 font-bold uppercase">{$t.contact.location}</h3>
							<p class="text-gray-600">{siteConfig.locationDisplay}</p>
						</div>
					</div>
				</div>

				<!-- Contact Action -->
				<div class="border-2 border-pk-ink bg-pk-bg p-8 shadow-pk-lg">
					<h2 class="mb-6 text-2xl font-bold uppercase">{$t.contact.formTitle}</h2>
					<div class="space-y-6">
						<p class="text-lg leading-relaxed text-gray-700">
							{$t.contact.infoText}
						</p>
						<Button
							href="mailto:{siteConfig.email}?subject={encodeURIComponent($t.contact.mailSubject)}"
							class="w-full justify-center"
						>
							{$t.contact.send}
						</Button>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
