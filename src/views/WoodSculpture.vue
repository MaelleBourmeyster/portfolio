<script setup lang="ts">
import { getAssetPath } from '@/utils/assets'
</script>

<template>
  <div class="wood-sculpture-page">
    <div class="container">
      <header class="wood-header">
        <h1>Mes Sculptures en Bois</h1>
        <p class="wood-subtitle">Créations uniques et artisanales</p>
      </header>

      <section class="wood-intro">
        <div class="intro-content">
          <h2>L'Art de la Sculpture sur Bois</h2>
          <p>
            La sculpture sur bois est pour moi une rencontre entre la matière et l'imagination.
            Chaque pièce de bois a sa propre histoire, ses veines, ses imperfections qui deviennent
            des atouts dans la création finale.
          </p>
          <p>
            J'explore différentes essences de bois, chacune apportant sa texture, sa couleur et son
            caractère unique. Du chêne au noyer, en passant par le cerisier, chaque bois m'inspire
            des formes et des créations différentes.
          </p>
        </div>
      </section>

      <section class="wood-gallery">
        <h2>Galerie</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <img :src="getAssetPath('/icons/wood.svg')" alt="Bois" />
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
