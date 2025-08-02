<template>
  <div class="art-page">
    <div class="container">
      <header class="art-header">
        <h1>Mes Créations Artistiques</h1>
        <p class="art-subtitle">Dessin, sculpture en bois et en terre</p>
      </header>

      <section class="art-categories">
        <div class="category-card">
          <div class="category-icon">✏️</div>
          <h2>Dessin</h2>
          <p>Mes créations graphiques et illustrations personnelles</p>
          <div class="art-gallery">
            <div class="art-placeholder">
              <span>🖼️</span>
              <p>Galerie en cours</p>
            </div>
          </div>
        </div>

        <div class="category-card">
          <div class="category-icon">🪵</div>
          <h2>Sculpture en Bois</h2>
          <p>Mes sculptures et créations en bois</p>
          <div class="art-gallery">
            <div class="art-placeholder">
              <span>🪵</span>
              <p>Galerie en cours</p>
            </div>
          </div>
        </div>

        <div class="category-card">
          <div class="category-icon">🏺</div>
          <h2>Sculpture en Terre</h2>
          <p>Mes créations en céramique et terre cuite</p>
          <div class="art-gallery">
            <div class="art-placeholder">
              <span>🏺</span>
              <p>Galerie en cours</p>
            </div>
          </div>
        </div>
      </section>

      <section class="art-description">
        <h2>L'Art dans ma Vie</h2>
        <div class="description-content">
          <p>
            L'art occupe une place importante dans ma vie, parallèlement à ma passion 
            pour le développement web. Le dessin me permet d'exprimer ma créativité 
            de manière spontanée, tandis que la sculpture en bois et en terre me 
            connecte à la matière et au travail manuel.
          </p>
          <p>
            Ces pratiques artistiques enrichissent ma vision créative et m'aident à 
            développer une approche unique dans mes projets de développement. 
            L'attention aux détails, la patience et la vision artistique que j'acquiers 
            dans l'art se reflètent dans la conception de mes interfaces web.
          </p>
        </div>
      </section>

      <div class="back-link-container">
        <router-link to="/" class="back-link">← Retour à l'accueil</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.art-page {
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

.art-header {
  text-align: center;
  margin-bottom: 4rem;
}

.art-header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.art-subtitle {
  font-size: 1.3rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.art-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
}

.category-card {
  background: #1a1a1a;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 1px solid #333;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  border-color: #00ff88;
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
}

.category-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.category-card h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
}

.category-card p {
  color: #ccc;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.art-gallery {
  margin-top: 2rem;
}

.art-placeholder {
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  border-radius: 10px;
  padding: 3rem 2rem;
  text-align: center;
  opacity: 0.8;
}

.art-placeholder span {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.art-placeholder p {
  color: #000;
  font-weight: 600;
  margin: 0;
}

.art-description {
  background: #0a0a0a;
  padding: 3rem;
  border-radius: 15px;
  margin-bottom: 3rem;
}

.art-description h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description-content p {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.8;
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
  .art-header h1 {
    font-size: 2.5rem;
  }
  
  .art-categories {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .category-card {
    padding: 1.5rem;
  }
  
  .art-description {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .art-header h1 {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
}
</style> 