<script lang="ts">
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);
</script>

<svelte:head>
  <title>{t.legal.title} - Maëlle Bourmeyster</title>
  <meta name="description" content="Legal notice and privacy policy of Maëlle Bourmeyster's portfolio." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-center">{t.legal.title}</h1>
  </div>

  <section class="py-16 px-6">
    <div class="mx-auto max-w-4xl space-y-12">
      
      <!-- Editeur -->
      <div class="pk-card">
        <h2 class="text-2xl font-bold uppercase mb-4 border-b-2 border-black pb-2">{t.legal.editor}</h2>
        <div class="space-y-2 text-gray-600">
          <p><span class="font-bold">{t.legal.editorName}</span> Maëlle Bourmeyster</p>
          <p><span class="font-bold">{t.legal.editorContact}</span> <a href="mailto:maelle.bourmeyster@gmail.com" class="text-blue-600 hover:underline">maelle.bourmeyster@gmail.com</a></p>
          <p><span class="font-bold">{t.legal.editorStatus}</span> {t.legal.editorStatusValue}</p>
        </div>
      </div>

      <!-- Hébergeur -->
      <div class="pk-card">
        <h2 class="text-2xl font-bold uppercase mb-4 border-b-2 border-black pb-2">{t.legal.hosting}</h2>
        <div class="space-y-2 text-gray-600">
          <p>{t.legal.hostingText}</p>
          <p><span class="font-bold">GitHub Inc.</span></p>
          <p>88 Colin P Kelly Jr St</p>
          <p>San Francisco, CA 94107</p>
          <p>United States</p>
          <p><a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">{t.legal.privacyLink}</a></p>
        </div>
      </div>

      <!-- Propriété Intellectuelle -->
      <div class="pk-card">
        <h2 class="text-2xl font-bold uppercase mb-4 border-b-2 border-black pb-2">{t.legal.ip}</h2>
        <div class="space-y-4 text-gray-600">
          <p>
            {t.legal.ipText1}
          </p>
          <p>
            {t.legal.ipText2}
          </p>
          <p>
            {t.legal.ipText3}
          </p>
        </div>
      </div>

      <!-- Données Personnelles -->
      <div class="pk-card">
        <h2 class="text-2xl font-bold uppercase mb-4 border-b-2 border-black pb-2">{t.legal.data}</h2>
        <div class="space-y-4 text-gray-600">
          <p>
            {t.legal.dataText1}
          </p>
          <p>
            <strong>{t.legal.dataForm}</strong> {t.legal.dataFormText}
          </p>
          <p>
            <strong>{t.legal.cookies}</strong> {t.legal.cookiesText}
          </p>
        </div>
      </div>

    </div>
  </section>
</div>
