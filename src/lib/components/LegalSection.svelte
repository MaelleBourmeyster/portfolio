<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
		/** 'compact' = space-y-2, 'spaced' = space-y-4 */
		variant?: 'compact' | 'spaced';
	}

	let { title, children, variant = 'compact' }: Props = $props();
</script>

<div class="border-2 border-pk-ink bg-pk-white p-6 shadow-pk-card">
	<h2 class="mb-4 border-b-2 border-pk-ink pb-2 text-2xl font-bold uppercase">
		{title}
	</h2>
	<div class="text-pk-muted-strong {variant === 'spaced' ? 'space-y-4' : 'space-y-2'}">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
