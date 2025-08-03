<script setup lang="ts">
import { getAssetPath } from '@/utils/assets'
</script>

<template>
  <div class="clay-sculpture-page">
    <div class="container">
      <header class="clay-header">
        <h1>Mes Sculptures en Terre</h1>
        <p class="clay-subtitle">Créations en céramique et terre cuite</p>
      </header>

      <section class="clay-intro">
        <div class="intro-content">
          <h2>L'Art de la Céramique</h2>
          <p>
            La sculpture en terre est une danse entre mes mains et la matière. Chaque pièce commence
            comme une boule d'argile informe qui, sous mes doigts, prend vie et forme. C'est un
            processus méditatif qui me connecte à l'essence même de la création.
          </p>
          <p>
            J'explore différentes techniques : modelage, estampage, tournage et assemblage. Chaque
            technique m'offre de nouvelles possibilités d'expression. L'émaillage et la cuisson
            ajoutent une dimension magique, transformant l'argile en céramique durable.
          </p>
        </div>
      </section>

      <section class="clay-gallery">
        <h2>Galerie</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <img :src="getAssetPath('/icons/clay.svg')" alt="Terre" />
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <img :src="getAssetPath('/icons/art.svg')" alt="Art" />
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <img :src="getAssetPath('/icons/gallery.svg')" alt="Galerie" />
              <p>Œuvre en cours</p>
            </div>
          </div>
        </div>
      </section>

      <div class="back-link-container">
        <router-link to="/" class="back-link">← Retour à l'accueil</router-link>
      </div>
    </div>
  </div>
</template>

<style>
/* Les styles sont maintenant dans src/styles/main.scss */
</style>
