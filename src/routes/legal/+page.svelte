<script lang="ts">
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	let t = $derived(translations[$language]);
</script>

<svelte:head>
	<title>{t.legal.title} - Maëlle Bourmeyster</title>
	<meta
		name="description"
		content="Legal notice and privacy policy of Maëlle Bourmeyster's portfolio."
	/>
</svelte:head>

<div>
	<div class="border-b-2 border-black bg-white px-6 py-12">
		<h1 class="text-center text-4xl font-bold tracking-tighter uppercase md:text-6xl">
			{t.legal.title}
		</h1>
	</div>

	<section class="px-6 py-16">
		<div class="mx-auto max-w-4xl space-y-12">
			<!-- Editeur -->
			<div class="pk-card">
				<h2 class="mb-4 border-b-2 border-black pb-2 text-2xl font-bold uppercase">
					{t.legal.editor}
				</h2>
				<div class="space-y-2 text-gray-600">
					<p><span class="font-bold">{t.legal.editorName}</span> Maëlle Bourmeyster</p>
					<p>
						<span class="font-bold">{t.legal.editorContact}</span>
						<a href="mailto:maelle.bourmeyster@gmail.com" class="text-blue-600 hover:underline"
							>maelle.bourmeyster@gmail.com</a
						>
					</p>
					<p><span class="font-bold">{t.legal.editorStatus}</span> {t.legal.editorStatusValue}</p>
				</div>
			</div>

			<!-- Hébergeur -->
			<div class="pk-card">
				<h2 class="mb-4 border-b-2 border-black pb-2 text-2xl font-bold uppercase">
					{t.legal.hosting}
				</h2>
				<div class="space-y-2 text-gray-600">
					<p>{t.legal.hostingText}</p>
					<p><span class="font-bold">GitHub Inc.</span></p>
					<p>88 Colin P Kelly Jr St</p>
					<p>San Francisco, CA 94107</p>
					<p>United States</p>
					<p>
						<a
							href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline">{t.legal.privacyLink}</a
						>
					</p>
				</div>
			</div>

			<!-- Propriété Intellectuelle -->
			<div class="pk-card">
				<h2 class="mb-4 border-b-2 border-black pb-2 text-2xl font-bold uppercase">{t.legal.ip}</h2>
				<div class="space-y-4 text-gray-600">
					<p>
						{t.legal.ipText1}
					</p>
					<p>
						{t.legal.ipText2}
					</p>
					<p>
						{t.legal.ipText3}
					</p>
				</div>
			</div>

			<!-- Données Personnelles -->
			<div class="pk-card">
				<h2 class="mb-4 border-b-2 border-black pb-2 text-2xl font-bold uppercase">
					{t.legal.data}
				</h2>
				<div class="space-y-4 text-gray-600">
					<p>
						{t.legal.dataText1}
					</p>
					<p>
						<strong>{t.legal.dataForm}</strong>
						{t.legal.dataFormText}
					</p>
					<p>
						<strong>{t.legal.cookies}</strong>
						{t.legal.cookiesText}
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
