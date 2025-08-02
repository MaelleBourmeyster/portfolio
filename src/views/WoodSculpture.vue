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
            La sculpture sur bois est pour moi une rencontre entre la matière 
            et l'imagination. Chaque pièce de bois a sa propre histoire, 
            ses veines, ses imperfections qui deviennent des atouts dans 
            la création finale.
          </p>
          <p>
            J'explore différentes essences de bois, chacune apportant sa 
            texture, sa couleur et son caractère unique. Du chêne au noyer, 
            en passant par le cerisier, chaque bois m'inspire des formes 
            et des créations différentes.
          </p>
        </div>
      </section>

      <section class="wood-gallery">
        <h2>Galerie</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <span>🪵</span>
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <span>🌳</span>
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <span>🪚</span>
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

<style scoped>
.wood-sculpture-page {
  background: #000;
  color: #fff;
  min-height: 100vh;
  padding: 100px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.wood-header {
  text-align: center;
  margin-bottom: 4rem;
}

.wood-header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wood-subtitle {
  font-size: 1.3rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.wood-intro {
  background: #0a0a0a;
  padding: 3rem;
  border-radius: 15px;
  margin-bottom: 4rem;
}

.intro-content h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-content p {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.wood-gallery h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.gallery-item {
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.artwork-placeholder {
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  padding: 4rem 2rem;
  text-align: center;
  opacity: 0.8;
}

.artwork-placeholder span {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.artwork-placeholder p {
  color: #000;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

.back-link-container {
  text-align: center;
}

.back-link {
  color: #00ff88;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  display: inline-block;
  padding: 12px 24px;
  border: 2px solid #00ff88;
  border-radius: 8px;
}

.back-link:hover {
  color: #000;
  background: #00ff88;
}

/* Responsive Design */
@media (max-width: 768px) {
  .wood-header h1 {
    font-size: 2.5rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .wood-intro {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .wood-header h1 {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
}
</style> 