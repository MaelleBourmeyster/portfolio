<script lang="ts">
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { language } from '$lib/stores/language';
	import './layout.css';
	import favicon from '$lib/assets/light-favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { siteConfig } from '$lib/config';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	onNavigate((navigation) => {
		if (typeof document === 'undefined' || !document.startViewTransition) return;
		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children, data } = $props<{ children: Snippet; data: LayoutData }>();

	onMount(async () => {
		const scheduler = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
		if (typeof scheduler?.yield === 'function') {
			await scheduler.yield();
		}
		language.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta name="author" content={siteConfig.author} />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="flex min-h-[100dvh] flex-col">
	<Navbar navigationTree={data.navigationTree} />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
