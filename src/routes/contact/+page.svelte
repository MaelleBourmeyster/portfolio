<script lang="ts">
  // Contact page
</script>

<svelte:head>
  <title>Contact - Maëlle Bourmeyster</title>
  <meta name="description" content="Get in touch with Maëlle Bourmeyster for collaborations, inquiries, or just to say hello." />
</svelte:head>

<div>
  <div class="px-6 py-12 border-b-2 border-black bg-white">
    <h1 class="text-6xl font-bold uppercase tracking-tighter text-center">Get in Touch</h1>
  </div>

  <section class="py-16 px-6">
    <div class="mx-auto max-w-4xl">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold uppercase mb-4">Contact Information</h2>
            <p class="text-gray-600 mb-6">
              Whether you have a project in mind, a question about my work, or just want to say hello, I'd love to hear from you.
            </p>
          </div>

          <div class="space-y-6">
            <div class="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
              <h3 class="font-bold uppercase mb-2">Email</h3>
              <a href="mailto:maelle.bourmeyster@gmail.com" class="text-blue-600 hover:underline break-all">
                maelle.bourmeyster@gmail.com
              </a>
            </div>

            <div class="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
              <h3 class="font-bold uppercase mb-2">Social</h3>
              <p class="text-gray-600">@maellebourmeyster</p>
            </div>

            <div class="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
              <h3 class="font-bold uppercase mb-2">Location</h3>
              <p class="text-gray-600">Lyon, France</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="border-2 border-black bg-[#fdfbf7] p-8 shadow-[8px_8px_0px_#000]">
          <h2 class="text-2xl font-bold uppercase mb-6">Send a Message</h2>
          <form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
            <div>
              <label for="name" class="block font-bold uppercase text-sm mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                class="w-full border-2 border-black bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="YOUR NAME"
              />
            </div>
            
            <div>
              <label for="email" class="block font-bold uppercase text-sm mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                class="w-full border-2 border-black bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="YOUR EMAIL"
              />
            </div>

            <div>
              <label for="message" class="block font-bold uppercase text-sm mb-2">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                class="w-full border-2 border-black bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="TELL ME ABOUT YOUR PROJECT..."
              ></textarea>
            </div>

            <button type="submit" class="pk-btn w-full justify-center">
              Send Message
            </button>
          </form>
        </div>
      </div>

    </div>
  </section>
</div>
