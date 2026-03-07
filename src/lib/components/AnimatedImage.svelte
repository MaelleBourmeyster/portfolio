<script lang="ts">
	let {
		src,
		alt,
		class: className = '',
		loading,
		fetchpriority,
		decoding = 'async'
	}: {
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
		decoding?: 'async' | 'sync' | 'auto';
	} = $props();
	let loaded = $state(false);
</script>

<img
	{src}
	{alt}
	{loading}
	{fetchpriority}
	{decoding}
	class="img-reveal {loaded ? 'loaded' : ''} {className}"
	onload={() => (loaded = true)}
/>
