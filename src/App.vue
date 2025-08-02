<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="app">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <h2>Maelle Bourmeyster</h2>
        </div>
        <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
          <a href="#home" class="nav-link">Accueil</a>
          <a href="#about" class="nav-link">À propos</a>
          <a href="#projects" class="nav-link">Projets</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>
        <div class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Maelle Bourmeyster</h1>
        <p class="hero-subtitle">Développeuse créative & Designer</p>
        <div class="hero-buttons">
          <button class="btn btn-primary">Voir mes projets</button>
          <button class="btn btn-secondary">Me contacter</button>
        </div>
      </div>
      <div class="hero-background">
        <div class="floating-elements">
          <div class="floating-element"></div>
          <div class="floating-element"></div>
          <div class="floating-element"></div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">À propos de moi</h2>
        <div class="about-content">
          <div class="about-text">
            <p>
              Passionnée par la création numérique et le développement web, 
              je combine créativité et expertise technique pour créer des 
              expériences utilisateur exceptionnelles.
            </p>
            <p>
              Spécialisée dans les technologies modernes comme Vue.js, 
              React, et les frameworks CSS, je m'efforce de créer des 
              solutions élégantes et performantes.
            </p>
            <p>
              En dehors du développement, je pratique l'équitation, 
              une passion qui m'apporte équilibre, discipline et une 
              connexion unique avec la nature.
            </p>
          </div>
          <div class="skills">
            <h3>Compétences</h3>
            <div class="skill-tags">
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">CSS3</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Git</span>
              <span class="skill-tag">Équitation</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
      <div class="container">
        <h2 class="section-title">Mes Projets</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-image"></div>
            <div class="project-content">
              <h3>Application E-commerce</h3>
              <p>Une plateforme de vente en ligne moderne avec Vue.js et Node.js</p>
              <div class="project-tags">
                <span class="project-tag">Vue.js</span>
                <span class="project-tag">Node.js</span>
              </div>
            </div>
          </div>
          <div class="project-card">
            <div class="project-image"></div>
            <div class="project-content">
              <h3>Dashboard Analytics</h3>
              <p>Interface de tableau de bord avec visualisations de données</p>
              <div class="project-tags">
                <span class="project-tag">React</span>
                <span class="project-tag">D3.js</span>
              </div>
            </div>
          </div>
          <div class="project-card">
            <div class="project-image"></div>
            <div class="project-content">
              <h3>Application Mobile</h3>
              <p>Application mobile hybride pour la gestion de tâches</p>
              <div class="project-tags">
                <span class="project-tag">React Native</span>
                <span class="project-tag">Firebase</span>
              </div>
            </div>
          </div>
          <div class="project-card">
            <div class="project-image"></div>
            <div class="project-content">
              <h3>Site Web Équestre</h3>
              <p>Site web moderne pour un centre équestre avec réservation en ligne</p>
              <div class="project-tags">
                <span class="project-tag">Vue.js</span>
                <span class="project-tag">CSS3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="container">
        <h2 class="section-title">Contact</h2>
        <div class="contact-content">
          <div class="contact-info">
            <h3>Parlons de votre projet</h3>
            <p>Je suis toujours ouvert aux nouvelles opportunités et collaborations intéressantes.</p>
            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>maelle.bourmeyster@email.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📱</span>
                <span>+33 6 12 34 56 78</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>France</span>
              </div>
            </div>
          </div>
          <form class="contact-form">
            <div class="form-group">
              <input type="text" placeholder="Votre nom" class="form-input">
            </div>
            <div class="form-group">
              <input type="email" placeholder="Votre email" class="form-input">
            </div>
            <div class="form-group">
              <textarea placeholder="Votre message" rows="5" class="form-textarea"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Envoyer le message</button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Maelle Bourmeyster. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: #000;
  overflow-x: hidden;
}

.app {
  background: #000;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo h2 {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #00ff88;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 3px 0;
  transition: 0.3s;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  color: #000;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #00ff88;
}

.btn-secondary:hover {
  background: #00ff88;
  color: #000;
}

/* Floating elements */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #00ff88, transparent);
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.floating-element:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-element:nth-child(2) {
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.floating-element:nth-child(3) {
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Sections */
section {
  padding: 80px 0;
  width: 100%;
  margin: 0;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* About Section */
.about {
  background: #0a0a0a;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #ccc;
}

.skills h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  color: #000;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Projects Section */
.projects {
  background: #000;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  height: 200px;
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  opacity: 0.3;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.project-content p {
  color: #ccc;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
}

.project-tag {
  background: #333;
  color: #00ff88;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
}

/* Contact Section */
.contact {
  background: #0a0a0a;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.contact-info p {
  color: #ccc;
  margin-bottom: 2rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
}

.contact-icon {
  font-size: 1.2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input,
.form-textarea {
  padding: 12px;
  border: 2px solid #333;
  border-radius: 8px;
  background: #1a1a1a;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #00ff88;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Footer */
.footer {
  background: #000;
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid #333;
}

.footer p {
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: left 0.3s ease;
  }

  .nav-menu-open {
    left: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .about-content,
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .container {
    padding: 0 15px;
  }
}

/* Suppression des bordures blanches */
#app {
  margin: 0;
  padding: 0;
  background: #000;
  width: 100%;
  min-height: 100vh;
}
</style>
