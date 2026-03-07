<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'default' | 'primary';
		size?: 'default' | 'compact';
		class?: string;
		children?: Snippet;
		onclick?: () => void;
		type?: 'button' | 'submit';
		[key: string]: unknown;
	}

	let {
		href,
		variant = 'default',
		size = 'default',
		class: className = '',
		children,
		onclick,
		type = 'button',
		...rest
	}: Props = $props();

	const base =
		'inline-flex cursor-pointer items-center justify-center border-2 border-pk-ink font-bold uppercase tracking-wide shadow-pk transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pk-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-pk-sm';

	const variants: Record<string, string> = {
		default: 'bg-pk-white',
		primary: 'bg-blue-600 text-white hover:bg-blue-700'
	};

	const sizes: Record<string, string> = {
		default: 'px-6 py-3',
		compact: 'px-3 py-1'
	};

	const classes = $derived(`${base} ${variants[variant]} ${sizes[size]} ${className}`.trim());
</script>

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is pre-resolved by parent -->
	<a {href} class={classes} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button {type} class={classes} {onclick} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}
