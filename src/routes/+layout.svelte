<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/light-favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Navbar />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
