<script lang="ts">
	import { resolve } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/data/translations';

	import type { NavigationItem } from '$lib/types';

	let { navigationTree } = $props<{ navigationTree: NavigationItem[] }>();

	let t = $derived(translations[$language]);

	let isMenuOpen = $state(false);
	let openMenu = $state<string | null>(null);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleLanguage() {
		language.toggle();
	}

	type NavKey = keyof typeof translations.en.nav;

	function isNavKey(key: string): key is NavKey {
		return key in translations.en.nav;
	}

	function getTranslatedName(translationKey: string, fallback: string) {
		if (isNavKey(translationKey)) {
			return t.nav[translationKey];
		}
		return fallback;
	}

	function handleDomainKeydown(event: KeyboardEvent, slug: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openMenu = openMenu === slug ? null : slug;
		} else if (event.key === 'Escape') {
			openMenu = null;
			(event.currentTarget as HTMLElement).blur();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			openMenu = slug;
			const menu = document.getElementById(`menu-${slug}`);
			menu?.querySelector<HTMLElement>('a')?.focus();
		}
	}

	function closeIfOutside(event: FocusEvent, slug: string) {
		const next = event.relatedTarget as Node | null;
		const container = event.currentTarget as HTMLElement;
		if (!container.contains(next)) {
			openMenu = openMenu === slug ? null : openMenu;
		}
	}
</script>

<nav class="sticky top-0 z-50 w-full border-b-2 border-black bg-[#fdfbf7] px-6 py-4">
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<!-- Desktop Menu (Left Aligned) -->
		<div class="hidden items-center gap-8 md:flex">
			<!-- Home Link -->
			<a href={resolve('/')} class="nav-link">
				{t.nav.home}
			</a>

			<!-- About Link -->
			<a href={resolve('/about')} class="nav-link">
				{t.nav.about}
			</a>

			<!-- Dynamic Dropdowns -->
			{#each navigationTree as domain (domain.slug)}
				<div
					class="group relative"
					onmouseenter={() => (openMenu = domain.slug)}
					onmouseleave={() => (openMenu = null)}
					onfocusin={() => (openMenu = domain.slug)}
					onfocusout={(event) => closeIfOutside(event, domain.slug)}
					role="group"
				>
					<button
						class="flex items-center gap-1 text-lg font-bold uppercase decoration-blue-600 decoration-2 underline-offset-4 hover:text-blue-600 hover:underline"
						aria-haspopup="true"
						aria-expanded={openMenu === domain.slug}
						aria-controls={`menu-${domain.slug}`}
						onkeydown={(event) => handleDomainKeydown(event, domain.slug)}
					>
						{getTranslatedName(domain.translationKey, domain.name)}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</button>

					<div
						id={`menu-${domain.slug}`}
						class={`invisible absolute top-full left-0 w-48 translate-y-2 transform pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${openMenu === domain.slug ? 'visible translate-y-0 opacity-100' : ''}`}
						role="menu"
					>
						<div class="flex flex-col border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
							{#each domain.categories as cat (cat.slug)}
								<a
									href={resolve(cat.href)}
									class="border-b border-gray-100 px-4 py-3 font-bold transition-colors last:border-0 hover:bg-blue-50 hover:text-blue-600"
									role="menuitem"
								>
									{getTranslatedName(cat.translationKey, cat.name)}
								</a>
							{/each}
						</div>
					</div>
				</div>
			{/each}

			<!-- Contact Link -->
			<a href={resolve('/contact')} class="nav-link">
				{t.nav.contact}
			</a>
		</div>

		<!-- Language Toggle (Desktop - Right Aligned) -->
		<button
			type="button"
			onclick={toggleLanguage}
			class="pk-btn ml-auto hidden !px-3 !py-1 md:block"
		>
			{$language}
		</button>

		<!-- Mobile Header (Controls) -->
		<div class="flex w-full items-center justify-between md:hidden">
			<button type="button" onclick={toggleLanguage} class="pk-btn !px-3 !py-1">
				{$language}
			</button>

			<button
				class="pk-btn !px-3 !py-1"
				onclick={toggleMenu}
				aria-expanded={isMenuOpen}
				aria-controls="mobile-menu"
			>
				{isMenuOpen ? t.nav.close : t.nav.menu}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div
			id="mobile-menu"
			class="absolute top-[100%] left-0 flex max-h-[80vh] w-full flex-col gap-6 overflow-y-auto border-b-2 border-black bg-[#fdfbf7] px-6 py-6 shadow-xl md:hidden"
		>
			<a
				href={resolve('/')}
				class="border-b border-gray-200 pb-2 text-xl font-bold tracking-wide uppercase transition-all hover:pl-2 hover:text-blue-600"
				onclick={() => (isMenuOpen = false)}
			>
				{t.nav.home}
			</a>

			<a
				href={resolve('/about')}
				class="border-b border-gray-200 pb-2 text-xl font-bold tracking-wide uppercase transition-all hover:pl-2 hover:text-blue-600"
				onclick={() => (isMenuOpen = false)}
			>
				{t.nav.about}
			</a>

			{#each navigationTree as domain (domain.slug)}
				<div
					class="mt-4 border-b border-gray-200 pb-2 text-sm font-bold tracking-widest text-gray-400 uppercase"
				>
					{getTranslatedName(domain.translationKey, domain.name)}
				</div>
				{#each domain.categories as cat (cat.slug)}
					<a
						href={resolve(cat.href)}
						class="pl-4 text-xl font-bold tracking-wide uppercase transition-all hover:pl-2 hover:text-blue-600"
						onclick={() => (isMenuOpen = false)}
					>
						{getTranslatedName(cat.translationKey, cat.name)}
					</a>
				{/each}
			{/each}

			<a
				href={resolve('/contact')}
				class="mt-4 border-b border-gray-200 pb-2 text-xl font-bold tracking-wide uppercase transition-all hover:pl-2 hover:text-blue-600"
				onclick={() => (isMenuOpen = false)}
			>
				{t.nav.contact}
			</a>
		</div>
	{/if}
</nav>
