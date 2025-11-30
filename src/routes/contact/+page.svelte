<script lang="ts">
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);
</script>

<svelte:head>
  <title>{t.contact.title} - Maëlle Bourmeyster</title>
  <meta name="description" content="Get in touch with Maëlle Bourmeyster for collaborations, inquiries, or just to say hello." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-5xl md:text-6xl font-bold uppercase tracking-tighter text-center break-words">{t.contact.title}</h1>
  </div>

  <section class="py-16 px-6">
    <div class="mx-auto max-w-4xl">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold uppercase mb-4">{t.contact.infoTitle}</h2>
            <p class="text-gray-600 mb-6">
              {t.contact.infoText}
            </p>
          </div>

          <div class="space-y-6">
            <div class="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
              <h3 class="font-bold uppercase mb-2">{t.contact.email}</h3>
              <a href="mailto:maelle.bourmeyster@gmail.com" class="text-blue-600 hover:underline break-all">
                maelle.bourmeyster@gmail.com
              </a>
            </div>



            <div class="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
              <h3 class="font-bold uppercase mb-2">{t.contact.location}</h3>
              <p class="text-gray-600">Lyon, France</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="border-2 border-black bg-[#fdfbf7] p-8 shadow-[8px_8px_0px_#000]">
          <h2 class="text-2xl font-bold uppercase mb-6">{t.contact.formTitle}</h2>
          <form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
            <div>
              <label for="name" class="block font-bold uppercase text-sm mb-2">{t.contact.name}</label>
              <input 
                type="text" 
                id="name" 
                class="w-full border-2 border-black bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder={t.contact.placeholders.name}
              />
            </div>
            
            <div>
              <label for="email" class="block font-bold uppercase text-sm mb-2">{t.contact.email}</label>
              <input 
                type="email" 
                id="email" 
                class="w-full border-2 border-black bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder={t.contact.placeholders.email}
              />
            </div>

            <div>
              <label for="message" class="block font-bold uppercase text-sm mb-2">{t.contact.message}</label>
              <textarea 
                id="message" 
                rows="5" 
                class="w-full border-2 border-black bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder={t.contact.placeholders.message}
              ></textarea>
            </div>

            <button type="submit" class="pk-btn w-full justify-center">
              {t.contact.send}
            </button>
          </form>
        </div>
      </div>

    </div>
  </section>
</div>
