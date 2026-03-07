<script lang="ts">
	interface Props {
		title: string;
		/** Optional: use text-4xl instead of text-5xl (e.g. legal page) */
		size?: 'default' | 'sm';
	}

	let { title, size = 'default' }: Props = $props();
</script>

<div class="border-b-2 border-pk-ink bg-pk-white px-6 py-12">
	<h1
		class="text-center font-bold tracking-tighter break-words uppercase {size === 'sm'
			? 'text-4xl md:text-6xl'
			: 'text-5xl md:text-6xl'}"
	>
		{title}
	</h1>
</div>
