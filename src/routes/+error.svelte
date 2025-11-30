<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{$page.status} - Maëlle Bourmeyster</title>
</svelte:head>

<div
	class="relative flex min-h-[calc(100vh-70px)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
>
	<div class="relative z-10 max-w-2xl space-y-8">
		<div
			class="inline-block border-2 border-black bg-white px-4 py-1 text-sm font-bold tracking-widest uppercase shadow-[4px_4px_0px_#000]"
		>
			Error {$page.status}
		</div>

		<h1 class="text-8xl font-bold tracking-tighter text-blue-600 md:text-9xl">
			{$page.status}
		</h1>

		<h2 class="text-2xl font-bold tracking-tight uppercase md:text-4xl">
			{$page.error?.message || 'Something went wrong'}
		</h2>

		<p class="mx-auto max-w-lg text-lg font-medium text-gray-600">
			It seems you've wandered into uncharted territory. Let's get you back on track.
		</p>

		<div class="pt-8">
			<a href={resolve('/')} class="pk-btn inline-block"> Return Home </a>
		</div>
	</div>

	<!-- Background Grid Accent -->
	<div class="pointer-events-none absolute inset-0 z-0 opacity-10">
		<svg width="100%" height="100%">
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" stroke-width="0.5" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	</div>
</div>
