<script lang="ts">
	import { resolve } from '$app/paths';
	import { t } from '$lib/stores/translations';
	import Button from '$lib/components/Button.svelte';

	const currentYear = new Date().getFullYear();
</script>

<section
	class="relative flex min-h-[calc(100dvh-var(--spacing-header))] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
>
	<div class="relative z-10 -mt-20 flex max-w-4xl flex-col items-center">
		<div
			class="mb-10 inline-block border-2 border-pk-ink bg-pk-white px-4 py-1 text-sm font-bold tracking-widest uppercase shadow-pk"
		>
			Portfolio {currentYear}
		</div>

		<h1 class="px-4 text-5xl leading-[1.1] font-bold tracking-tighter md:text-8xl">
			{$t.home.heroTitle} <br />
			<span class="text-pk-accent">{$t.home.heroSubtitle}</span>
		</h1>

		<p class="mx-auto mt-8 max-w-2xl text-xl font-medium text-pk-muted-strong md:text-2xl">
			{$t.home.heroDesc}
		</p>

		<div class="flex flex-col items-center justify-center gap-4 pt-16 md:flex-row">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- hash fragment: resolve('/') + '#work' -->
			<Button href={`${resolve('/')}#work`} variant="primary">
				{$t.home.viewProjects}
			</Button>
			<Button href={resolve('/contact')}>
				{$t.home.getInTouch}
			</Button>
		</div>
	</div>
</section>
