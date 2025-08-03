<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAssetPath } from '@/utils/assets'

const router = useRouter()
const searchQuery = ref('')
interface Page {
  name: string
  path: string
  description: string
}

const searchResults = ref<Page[]>([])
const showResults = ref(false)

const pages = [
  { name: 'Art', path: '/art', description: 'Mes créations artistiques' },
  { name: 'Dessin', path: '/drawing', description: 'Mes dessins et illustrations' },
  { name: 'Sculpture Bois', path: '/wood-sculpture', description: 'Mes sculptures en bois' },
  { name: 'Sculpture Terre', path: '/clay-sculpture', description: 'Mes sculptures en terre' },
  { name: 'Portfolio', path: '/portfolio', description: 'Mon portfolio professionnel' },
  { name: 'À propos', path: '/about', description: 'En savoir plus sur moi' },
  { name: 'Contact', path: '/contact', description: 'Me contacter' },
  { name: 'Équitation', path: '/equestrian', description: "Ma passion pour l'équitation" },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    searchResults.value = pages.filter(
      (page) =>
        page.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
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
    Art: getAssetPath('/icons/art.svg'),
    Dessin: getAssetPath('/icons/drawing.svg'),
    'Sculpture Bois': getAssetPath('/icons/wood.svg'),
    'Sculpture Terre': getAssetPath('/icons/clay.svg'),
    Portfolio: getAssetPath('/icons/portfolio.svg'),
    'À propos': getAssetPath('/icons/about.svg'),
    Contact: getAssetPath('/icons/contact.svg'),
    Équitation: getAssetPath('/icons/equestrian.svg'),
  }
  return icons[pageName] || getAssetPath('/icons/portfolio.svg')
}
</script>

<template>
  <div class="home">
    <!-- Section d'accueil avec barre de recherche -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">Maëlle Bourmeyster</h1>
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
            <div class="search-icon">
              <img :src="getAssetPath('/icons/search.svg')" alt="Rechercher" />
            </div>
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
    </section>

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
              <img :src="getPageIcon(page.name)" :alt="page.name" />
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
              Je suis Maëlle Bourmeyster, artiste passionnée par l'expression créative sous toutes
              ses formes. Mon travail s'articule autour du dessin, de la sculpture en bois et en
              terre, créant un univers unique où la matière rencontre l'imagination.
            </p>
            <p>
              Chaque création raconte une histoire, capture une émotion ou explore une nouvelle
              technique. L'équitation, ma passion parallèle, m'apporte équilibre et connexion avec
              la nature, enrichissant ma vision artistique.
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
              <img src="/icons/art.svg" alt="Art" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* Les styles sont maintenant dans src/styles/main.scss */
</style>
