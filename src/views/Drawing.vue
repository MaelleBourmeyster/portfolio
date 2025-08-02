<template>
  <div class="drawing-page">
    <div class="container">
      <header class="drawing-header">
        <h1>Mes Dessins</h1>
        <p class="drawing-subtitle">Créations graphiques et illustrations</p>
      </header>

      <section class="drawing-intro">
        <div class="intro-content">
          <h2>L'Art du Dessin</h2>
          <p>
            Le dessin est pour moi un moyen d'expression spontané et direct.
            Chaque trait raconte une histoire, chaque ligne capture une émotion.
            Que ce soit au crayon, à l'encre ou au pastel, chaque technique
            m'offre une nouvelle façon de voir et de représenter le monde.
          </p>
          <p>
            Mes dessins explorent différents thèmes : portraits, paysages,
            compositions abstraites ou illustrations narratives. Chaque œuvre
            est le fruit d'un moment unique, d'une inspiration particulière.
          </p>
        </div>
      </section>

      <section class="drawing-gallery">
        <h2>Galerie</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <img src="/icons/drawing.svg" alt="Dessin" />
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <img src="/icons/art.svg" alt="Art" />
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <img src="/icons/gallery.svg" alt="Galerie" />
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
