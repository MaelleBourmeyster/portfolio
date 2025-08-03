<script setup lang="ts">
import { getAssetPath } from '@/utils/assets'
</script>

<template>
  <div class="art-page">
    <div class="container">
      <header class="art-header">
        <h1>Mes Créations Artistiques</h1>
        <p class="art-subtitle">Dessin, sculpture en bois et en terre</p>
      </header>

      <section class="art-categories">
        <div class="category-card">
          <div class="category-icon">
            <img :src="getAssetPath('/icons/drawing.svg')" alt="Dessin" />
          </div>
          <h2>Dessin</h2>
          <p>Mes créations graphiques et illustrations personnelles</p>
          <div class="art-gallery">
            <div class="art-placeholder">
              <img :src="getAssetPath('/icons/gallery.svg')" alt="Galerie" />
              <p>Galerie en cours</p>
            </div>
          </div>
        </div>

        <div class="category-card">
          <div class="category-icon">
            <img :src="getAssetPath('/icons/wood.svg')" alt="Sculpture Bois" />
          </div>
          <h2>Sculpture en Bois</h2>
          <p>Mes sculptures et créations en bois</p>
          <div class="art-gallery">
            <div class="art-placeholder">
              <img :src="getAssetPath('/icons/gallery.svg')" alt="Galerie" />
              <p>Galerie en cours</p>
            </div>
          </div>
        </div>

        <div class="category-card">
          <div class="category-icon">
            <img :src="getAssetPath('/icons/clay.svg')" alt="Sculpture Terre" />
          </div>
          <h2>Sculpture en Terre</h2>
          <p>Mes créations en céramique et terre cuite</p>
          <div class="art-gallery">
            <div class="art-placeholder">
              <img :src="getAssetPath('/icons/gallery.svg')" alt="Galerie" />
              <p>Galerie en cours</p>
            </div>
          </div>
        </div>
      </section>

      <section class="art-description">
        <h2>L'Art dans ma Vie</h2>
        <div class="description-content">
          <p>
            L'art occupe une place importante dans ma vie, parallèlement à ma passion pour le
            développement web. Le dessin me permet d'exprimer ma créativité de manière spontanée,
            tandis que la sculpture en bois et en terre me connecte à la matière et au travail
            manuel.
          </p>
          <p>
            Ces pratiques artistiques enrichissent ma vision créative et m'aident à développer une
            approche unique dans mes projets de développement. L'attention aux détails, la patience
            et la vision artistique que j'acquiers dans l'art se reflètent dans la conception de mes
            interfaces web.
          </p>
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
