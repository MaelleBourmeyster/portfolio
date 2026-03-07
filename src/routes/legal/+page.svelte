<script lang="ts">
	import { t } from '$lib/stores/translations';
	import { siteConfig } from '$lib/config';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import LegalSection from '$lib/components/LegalSection.svelte';
</script>

<PageMeta title={$t.legal.title} description={$t.legal.metaDescription} path="legal" />

<div>
	<PageHeader title={$t.legal.title} size="sm" />

	<section class="px-6 py-16">
		<div class="mx-auto max-w-4xl space-y-12">
			<LegalSection title={$t.legal.editor}>
				<p><span class="font-bold">{$t.legal.editorName}</span> {siteConfig.author}</p>
				<p>
					<span class="font-bold">{$t.legal.editorContact}</span>
					<a href="mailto:{siteConfig.email}" class="text-pk-accent hover:underline">
						{siteConfig.email}
					</a>
				</p>
				<p><span class="font-bold">{$t.legal.editorStatus}</span> {$t.legal.editorStatusValue}</p>
			</LegalSection>

			<LegalSection title={$t.legal.hosting}>
				<p>{$t.legal.hostingText}</p>
				<p><span class="font-bold">GitHub Inc.</span></p>
				<p>88 Colin P Kelly Jr St</p>
				<p>San Francisco, CA 94107</p>
				<p>United States</p>
				<p>
					<a
						href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
						target="_blank"
						rel="noopener noreferrer"
						class="text-pk-accent hover:underline"
					>
						{$t.legal.privacyLink}
					</a>
				</p>
			</LegalSection>

			<LegalSection title={$t.legal.ip} variant="spaced">
				<p>{$t.legal.ipText1}</p>
				<p>{$t.legal.ipText2}</p>
				<p>{$t.legal.ipText3}</p>
			</LegalSection>

			<LegalSection title={$t.legal.data} variant="spaced">
				<p>{$t.legal.dataText1}</p>
				<p>
					<strong>{$t.legal.dataForm}</strong>
					{$t.legal.dataFormText}
				</p>
				<p>
					<strong>{$t.legal.cookies}</strong>
					{$t.legal.cookiesText}
				</p>
			</LegalSection>
		</div>
	</section>
</div>
