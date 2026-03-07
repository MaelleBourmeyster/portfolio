<script lang="ts">
	import { t } from '$lib/stores/translations';
	import { siteConfig } from '$lib/config';
</script>

<section id="contact" class="px-6 py-20">
	<div class="mx-auto max-w-4xl">
		<div class="mt-12 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
			<div
				class="flex flex-col items-center justify-center border-2 border-pk-ink bg-pk-white p-6 shadow-pk"
			>
				<h3 class="mb-2 font-bold uppercase">{$t.contact.email}</h3>
				<p class="break-all text-pk-muted-strong">{siteConfig.email}</p>
			</div>
			<div class="border-2 border-pk-ink bg-pk-white p-6 shadow-pk">
				<h3 class="mb-2 font-bold uppercase">{$t.contact.social}</h3>
				<p class="text-pk-muted-strong">{siteConfig.socialHandle}</p>
			</div>
			<div class="border-2 border-pk-ink bg-pk-white p-6 shadow-pk">
				<h3 class="mb-2 font-bold uppercase">{$t.contact.location}</h3>
				<p class="text-pk-muted-strong">{siteConfig.locationDisplay}</p>
			</div>
		</div>
	</div>
</section>
