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
            La sculpture en terre est une danse entre mes mains et la matière. 
            Chaque pièce commence comme une boule d'argile informe qui, 
            sous mes doigts, prend vie et forme. C'est un processus 
            méditatif qui me connecte à l'essence même de la création.
          </p>
          <p>
            J'explore différentes techniques : modelage, estampage, 
            tournage et assemblage. Chaque technique m'offre de nouvelles 
            possibilités d'expression. L'émaillage et la cuisson ajoutent 
            une dimension magique, transformant l'argile en céramique durable.
          </p>
        </div>
      </section>

      <section class="clay-gallery">
        <h2>Galerie</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <span>🏺</span>
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <span>🧱</span>
              <p>Œuvre en cours</p>
            </div>
          </div>
          <div class="gallery-item">
            <div class="artwork-placeholder">
              <span>🔥</span>
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
.clay-sculpture-page {
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

.clay-header {
  text-align: center;
  margin-bottom: 4rem;
}

.clay-header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.clay-subtitle {
  font-size: 1.3rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.clay-intro {
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

.clay-gallery h2 {
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
  .clay-header h1 {
    font-size: 2.5rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .clay-intro {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .clay-header h1 {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
}
</style> 