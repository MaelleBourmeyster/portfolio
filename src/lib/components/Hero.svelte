<script lang="ts">
	import { resolve } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	let t = $derived(translations[$language]);
</script>

<section
	class="relative flex min-h-[calc(100vh-70px)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
>
	<!-- Decorative elements -->
	<!-- Decorative elements removed -->

	<div class="relative z-10 -mt-12 flex max-w-4xl flex-col items-center">
		<div
			class="mb-10 inline-block border-2 border-black bg-white px-4 py-1 text-sm font-bold tracking-widest uppercase shadow-[4px_4px_0px_#000]"
		>
			Portfolio 2025
		</div>

		<h1 class="px-4 text-5xl leading-[1.1] font-bold tracking-tighter md:text-8xl">
			{t.home.heroTitle} <br />
			<span class="text-blue-600">{t.home.heroSubtitle}</span>
		</h1>

		<p class="mx-auto mt-8 max-w-2xl text-xl font-medium text-gray-600 md:text-2xl">
			{t.home.heroDesc}
		</p>

		<div class="flex flex-col items-center justify-center gap-4 pt-16 md:flex-row">
			<a href={resolve('/#work')} class="pk-btn !bg-blue-600 text-white hover:!bg-blue-700">
				{t.home.viewProjects}
			</a>
			<a href={resolve('/contact')} class="pk-btn">
				{t.home.getInTouch}
			</a>
		</div>
	</div>
</section>
