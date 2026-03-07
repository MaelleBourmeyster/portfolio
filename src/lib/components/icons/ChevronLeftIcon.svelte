<script lang="ts">
	let { class: className = 'h-6 w-6' } = $props<{ class?: string }>();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width="2"
	stroke="currentColor"
	class={className}
	aria-hidden="true"
>
	<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
