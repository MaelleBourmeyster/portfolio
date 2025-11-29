<script lang="ts">
  import { base } from '$app/paths';
  import { language } from '$lib/stores/language';
  import { translations } from '$lib/data/translations';

  let t = $derived(translations[$language]);
</script>

<footer class="border-t-2 border-black bg-white py-8 px-6 text-center mt-auto">
  <div class="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
    <p class="font-mono text-sm text-gray-500">
      {t.footer.copyright}
    </p>
    <a href="{base}/legal" class="font-mono text-sm text-gray-500 hover:text-black hover:underline">
      {t.footer.legal}
    </a>
  </div>
</footer>
