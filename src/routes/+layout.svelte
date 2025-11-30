<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import './layout.css';
	import favicon from '$lib/assets/light-favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { children, data } = $props<{ children: Snippet; data: LayoutData }>();

	onMount(() => {
		language.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:site_name" content="Maëlle Bourmeyster Portfolio" />
	<meta name="author" content="Maëlle Bourmeyster" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar navigationTree={data.navigationTree} />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
