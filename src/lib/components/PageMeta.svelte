<script lang="ts">
	import { language } from '$lib/stores/language';
	import { getAbsoluteUrl, getImageUrl, getOgLocale } from '$lib/url';
	import { siteConfig } from '$lib/config';
	import { DEFAULTS, OG_IMAGE } from '$lib/constants';

	interface Props {
		title: string;
		description: string;
		path?: string;
		image?: string;
		/** Alt text for og:image (accessibility & social sharing) */
		imageAlt?: string;
		ogType?: 'website' | 'profile' | 'article';
		jsonLd?: object;
		/** Extra article meta (e.g. article:author, article:published_time) */
		articleMeta?: Record<string, string>;
		/** When true, use title as-is (e.g. home page) */
		noSuffix?: boolean;
		/** When true, add robots noindex (e.g. error page) */
		noIndex?: boolean;
		/** When false, skip hreflang (e.g. error page) */
		showHreflang?: boolean;
	}

	let {
		title,
		description,
		path = '',
		image,
		imageAlt = DEFAULTS.IMAGE_ALT,
		ogType = 'website',
		jsonLd,
		articleMeta,
		noSuffix = false,
		noIndex = false,
		showHreflang = true
	}: Props = $props();

	let pageUrl = $derived(getAbsoluteUrl(path));
	let urlEn = $derived(`${pageUrl}${pageUrl.includes('?') ? '&' : '?'}lang=en`);
	let urlFr = $derived(`${pageUrl}${pageUrl.includes('?') ? '&' : '?'}lang=fr`);
	let canonicalUrl = $derived(urlEn);
	let imageUrl = $derived(image ? getImageUrl(image) : getImageUrl(siteConfig.defaultImage));
	let fullTitle = $derived(noSuffix ? title : `${title} - ${siteConfig.author}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if noIndex}
		<meta name="robots" content="noindex" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content={`${OG_IMAGE.WIDTH}`} />
	<meta property="og:image:height" content={`${OG_IMAGE.HEIGHT}`} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:locale" content={getOgLocale($language)} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={siteConfig.socialHandle} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={imageAlt} />

	<!-- Canonical URL (matches hreflang x-default) -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Alternate languages (hreflang) -->
	{#if showHreflang}
		<link rel="alternate" hreflang="en" href={urlEn} />
		<link rel="alternate" hreflang="fr" href={urlFr} />
		<link rel="alternate" hreflang="x-default" href={urlEn} />
	{/if}

	{#if articleMeta}
		{#each Object.entries(articleMeta) as [key, value] (key)}
			<meta property={key} content={value} />
		{/each}
	{/if}

	{#if jsonLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</scr` + 'ipt>'}
	{/if}
</svelte:head>
