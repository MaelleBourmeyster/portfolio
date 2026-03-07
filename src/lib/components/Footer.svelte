<script lang="ts">
	import { resolve } from '$app/paths';
	import { t } from '$lib/stores/translations';
</script>

<footer class="mt-auto border-t-2 border-pk-ink bg-pk-white px-6 py-8 text-center">
	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
		<p class="font-mono text-sm text-gray-500">
			{$t.footer.copyright}
		</p>
		<a
			href={resolve('/legal')}
			class="font-mono text-sm text-gray-500 hover:text-pk-ink"
		>
			{$t.footer.legal}
		</a>
	</div>
</footer>
