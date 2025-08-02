<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const searchResults = ref([])
const showResults = ref(false)

const pages = [
  { name: 'Art', path: '/art', description: 'Mes créations artistiques' },
  { name: 'Dessin', path: '/drawing', description: 'Mes dessins et illustrations' },
  { name: 'Sculpture Bois', path: '/wood-sculpture', description: 'Mes sculptures en bois' },
  { name: 'Sculpture Terre', path: '/clay-sculpture', description: 'Mes sculptures en terre' },
  { name: 'Portfolio', path: '/portfolio', description: 'Mon portfolio professionnel' },
  { name: 'À propos', path: '/about', description: 'En savoir plus sur moi' },
  { name: 'Contact', path: '/contact', description: 'Me contacter' },
  { name: 'Équitation', path: '/equestrian', description: 'Ma passion pour l\'équitation' }
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    searchResults.value = pages.filter(page => 
      page.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    showResults.value = true
  } else {
    searchResults.value = []
    showResults.value = false
  }
}

const navigateToPage = (path: string) => {
  router.push(path)
  searchQuery.value = ''
  showResults.value = false
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && searchResults.value.length > 0) {
    navigateToPage(searchResults.value[0].path)
  }
}

// Fonction pour obtenir l'icône de la page
const getPageIcon = (pageName: string): string => {
  const icons: { [key: string]: string } = {
    'Art': '🎨',
    'Dessin': '✏️',
    'Sculpture Bois': '🪵',
    'Sculpture Terre': '🏺',
    'Portfolio': '💼',
    'À propos': '👤',
    'Contact': '📧',
    'Équitation': '🐎'
  }
  return icons[pageName] || '📄'
}
</script>

<template>
  <div class="home">
    <!-- Header avec barre de recherche -->
    <header class="header">
      <div class="header-content">
        <h1 class="main-title">Maelle Bourmeyster</h1>
        <p class="subtitle">Artiste & Créatrice</p>
        
        <!-- Barre de recherche -->
        <div class="search-container">
          <div class="search-box">
            <input 
              v-model="searchQuery"
              @input="handleSearch"
              @keypress="handleKeyPress"
              type="text"
              placeholder="Rechercher une page..."
              class="search-input"
            />
            <div class="search-icon">🔍</div>
          </div>
          
          <!-- Résultats de recherche -->
          <div v-if="showResults && searchResults.length > 0" class="search-results">
            <div 
              v-for="result in searchResults" 
              :key="result.path"
              @click="navigateToPage(result.path)"
              class="search-result-item"
            >
              <h3>{{ result.name }}</h3>
              <p>{{ result.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Section de navigation rapide -->
    <section class="quick-nav">
      <div class="container">
        <h2>Navigation Rapide</h2>
        <div class="nav-grid">
          <div 
            v-for="page in pages" 
            :key="page.path"
            @click="navigateToPage(page.path)"
            class="nav-card"
          >
            <div class="nav-card-icon">
              {{ getPageIcon(page.name) }}
            </div>
            <h3>{{ page.name }}</h3>
            <p>{{ page.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section de présentation -->
    <section class="presentation">
      <div class="container">
        <div class="presentation-content">
          <div class="presentation-text">
            <h2>Bienvenue dans mon univers artistique</h2>
            <p>
              Je suis Maelle Bourmeyster, artiste passionnée par l'expression créative 
              sous toutes ses formes. Mon travail s'articule autour du dessin, de la 
              sculpture en bois et en terre, créant un univers unique où la matière 
              rencontre l'imagination.
            </p>
            <p>
              Chaque création raconte une histoire, capture une émotion ou explore 
              une nouvelle technique. L'équitation, ma passion parallèle, m'apporte 
              équilibre et connexion avec la nature, enrichissant ma vision artistique.
            </p>
            <div class="presentation-buttons">
              <button @click="navigateToPage('/art')" class="btn btn-primary">
                Découvrir mes œuvres
              </button>
              <button @click="navigateToPage('/contact')" class="btn btn-secondary">
                Me contacter
              </button>
            </div>
          </div>
          <div class="presentation-image">
            <div class="image-placeholder">
              <span>🎨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  background: #000;
  color: #fff;
  min-height: 100vh;
}

.header {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
}

.header-content {
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 800px;
  padding: 0 20px;
}

.main-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.5rem;
  color: #ccc;
  margin-bottom: 3rem;
}

.search-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 15px 50px 15px 20px;
  border: 2px solid #333;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #00ff88;
  background: rgba(255, 255, 255, 0.15);
}

.search-input::placeholder {
  color: #999;
}

.search-icon {
  position: absolute;
  right: 15px;
  font-size: 1.2rem;
  color: #ccc;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid #333;
  border-radius: 10px;
  margin-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.search-result-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  border-bottom: 1px solid #333;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: rgba(0, 255, 136, 0.1);
}

.search-result-item h3 {
  color: #fff;
  margin-bottom: 5px;
  font-size: 1rem;
}

.search-result-item p {
  color: #ccc;
  font-size: 0.9rem;
  margin: 0;
}

.quick-nav {
  padding: 80px 0;
  background: #0a0a0a;
}

.quick-nav h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.nav-card {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #333;
}

.nav-card:hover {
  transform: translateY(-5px);
  border-color: #00ff88;
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
}

.nav-card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.nav-card h3 {
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.nav-card p {
  color: #ccc;
  font-size: 0.9rem;
}

.presentation {
  padding: 80px 0;
  background: #000;
}

.presentation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.presentation-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.presentation-text p {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.presentation-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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

.presentation-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  opacity: 0.8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .presentation-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .presentation-buttons {
    flex-direction: column;
  }
  
  .nav-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
}
</style>

 