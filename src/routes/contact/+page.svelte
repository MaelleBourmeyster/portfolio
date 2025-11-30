<script lang="ts">
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	let t = $derived(translations[$language]);
</script>

<svelte:head>
	<title>{t.contact.title} - Maëlle Bourmeyster</title>
	<meta
		name="description"
		content="Get in touch with Maëlle Bourmeyster for collaborations, inquiries, or just to say hello."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://maellebourmeyster.github.io/portfolio/contact" />
	<meta property="og:title" content="Contact - Maëlle Bourmeyster" />
	<meta
		property="og:description"
		content="Get in touch with Maëlle Bourmeyster for collaborations, inquiries, or just to say hello."
	/>
	<meta
		property="og:image"
		content="https://maellebourmeyster.github.io/portfolio/images/maelle/maelle-1.png"
	/>
	<meta property="og:locale" content={$language === 'en' ? 'en_US' : 'fr_FR'} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://maellebourmeyster.github.io/portfolio/contact" />
	<meta name="twitter:title" content="Contact - Maëlle Bourmeyster" />
	<meta
		name="twitter:description"
		content="Get in touch with Maëlle Bourmeyster for collaborations, inquiries, or just to say hello."
	/>
	<meta
		name="twitter:image"
		content="https://maellebourmeyster.github.io/portfolio/images/maelle/maelle-1.png"
	/>

	<!-- Canonical URL -->
	<link rel="canonical" href="https://maellebourmeyster.github.io/portfolio/contact" />
</svelte:head>

<div>
	<div class="border-b-2 border-black bg-white px-6 py-12">
		<h1 class="text-center text-5xl font-bold tracking-tighter break-words uppercase md:text-6xl">
			{t.contact.title}
		</h1>
	</div>

	<section class="px-6 py-16">
		<div class="mx-auto max-w-4xl">
			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				<!-- Contact Info -->
				<div class="space-y-8">
					<div>
						<h2 class="mb-4 text-2xl font-bold uppercase">{t.contact.infoTitle}</h2>
						<p class="mb-6 text-gray-600">
							{t.contact.infoText}
						</p>
					</div>

					<div class="space-y-6">
						<div class="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_#000]">
							<h3 class="mb-2 font-bold uppercase">{t.contact.email}</h3>
							<a
								href="mailto:maelle.bourmeyster@gmail.com"
								class="break-all text-blue-600 hover:underline"
							>
								maelle.bourmeyster@gmail.com
							</a>
						</div>

						<div class="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_#000]">
							<h3 class="mb-2 font-bold uppercase">{t.contact.location}</h3>
							<p class="text-gray-600">Lyon, France</p>
						</div>
					</div>
				</div>

				<!-- Contact Form -->
				<div class="border-2 border-black bg-[#fdfbf7] p-8 shadow-[8px_8px_0px_#000]">
					<h2 class="mb-6 text-2xl font-bold uppercase">{t.contact.formTitle}</h2>
					<form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
						<div>
							<label for="name" class="mb-2 block text-sm font-bold uppercase"
								>{t.contact.name}</label
							>
							<input
								type="text"
								id="name"
								class="w-full border-2 border-black bg-white p-3 focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
								placeholder={t.contact.placeholders.name}
							/>
						</div>

						<div>
							<label for="email" class="mb-2 block text-sm font-bold uppercase"
								>{t.contact.email}</label
							>
							<input
								type="email"
								id="email"
								class="w-full border-2 border-black bg-white p-3 focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
								placeholder={t.contact.placeholders.email}
							/>
						</div>

						<div>
							<label for="message" class="mb-2 block text-sm font-bold uppercase"
								>{t.contact.message}</label
							>
							<textarea
								id="message"
								rows="5"
								class="w-full border-2 border-black bg-white p-3 focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
								placeholder={t.contact.placeholders.message}
							></textarea>
						</div>

						<button type="submit" class="pk-btn w-full justify-center">
							{t.contact.send}
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</div>
