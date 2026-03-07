<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { t } from '$lib/stores/translations';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Button from '$lib/components/Button.svelte';
	let errorTitle = $derived($page.status === 404 ? $t.error.notFound : $t.error.generic);
	let errorDesc = $derived(
		$page.status === 404 ? $t.error.notFoundDesc : $page.error?.message || $t.error.genericDesc
	);
</script>

<PageMeta
	title={$page.status?.toString() ?? 'Error'}
	description={errorDesc}
	noSuffix
	noIndex
	showHreflang={false}
/>

<div class="flex min-h-[100dvh] flex-col items-center justify-center bg-pk-bg px-6">
	<div class="max-w-2xl border-2 border-pk-ink bg-pk-white p-12 text-center shadow-pk-lg">
		<div
			class="mb-6 inline-block border-2 border-pk-ink bg-red-600 px-6 py-3 text-6xl font-bold text-white shadow-pk"
		>
			{$page.status}
		</div>

		<!-- Error Message -->
		<h1 class="mb-4 text-4xl font-bold tracking-tighter uppercase">
			{errorTitle}
		</h1>

		<p class="mb-8 text-lg text-pk-muted-strong">
			{errorDesc}
		</p>

		<!-- Action Buttons -->
		<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
			<Button href={resolve('/')}>
				{$t.nav.home}
			</Button>
			<Button onclick={() => window.history.back()} class="bg-pk-surface hover:bg-pk-surface-hover">
				{$t.error.goBack}
			</Button>
		</div>
	</div>
</div>
