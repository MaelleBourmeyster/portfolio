<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	let t = $derived(translations[$language]);
</script>

<svelte:head>
	<title>404 - Maëlle Bourmeyster</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-[#fdfbf7] px-6">
	<div class="max-w-2xl border-2 border-black bg-white p-12 text-center shadow-[8px_8px_0px_#000]">
		<!-- Error Code -->
		<div
			class="mb-6 inline-block border-2 border-black bg-red-600 px-6 py-3 text-6xl font-bold text-white shadow-[4px_4px_0px_#000]"
		>
			{$page.status}
		</div>

		<!-- Error Message -->
		<h1 class="mb-4 text-4xl font-bold tracking-tighter uppercase">
			{#if $page.status === 404}
				Page Not Found
			{:else}
				Something Went Wrong
			{/if}
		</h1>

		<p class="mb-8 text-lg text-gray-600">
			{#if $page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else}
				{$page.error?.message || 'An unexpected error occurred.'}
			{/if}
		</p>

		<!-- Action Buttons -->
		<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a href={resolve('/')} class="pk-btn">
				{t.nav.home}
			</a>
			<button onclick={() => window.history.back()} class="pk-btn bg-gray-100 hover:bg-gray-200">
				Go Back
			</button>
		</div>
	</div>
</div>
