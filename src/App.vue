<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Structure des menus par catégories
const menuCategories = [
  {
    name: 'Portfolio',
    items: [
      { name: 'Accueil', path: '/' },
      { name: 'À propos', path: '/about' },
      { name: 'CV', path: '/cv' },
      { name: 'Contact', path: '/contact' }
    ]
  },
  {
    name: 'Art',
    items: [
      { name: 'Galerie', path: '/art' },
      { name: 'Dessin', path: '/drawing' },
      { name: 'Sculpture Bois', path: '/wood-sculpture' },
      { name: 'Sculpture Argile', path: '/clay-sculpture' }
    ]
  },
  {
    name: 'Projets',
    items: [
      { name: 'Mes Projets', path: '/projects' },
      { name: 'Services', path: '/services' },
      { name: 'Blog', path: '/blog' }
    ]
  },
  {
    name: 'Passions',
    items: [
      { name: 'Équitation', path: '/equestrian' }
    ]
  }
]

const activeDropdown = ref<string | null>(null)
const isMobileMenuOpen = ref(false)
const mobileOpenCategories = ref<Set<string>>(new Set())
const dropdownTimeout = ref<number | null>(null)
const isMouseInDropdown = ref(false)
const focusedIndex = ref<number>(-1)
const currentCategoryIndex = ref<number>(-1)

// Gestion améliorée des menus déroulants
const openDropdown = (categoryName: string) => {
  if (activeDropdown.value !== categoryName) {
    activeDropdown.value = categoryName
    focusedIndex.value = -1
    currentCategoryIndex.value = menuCategories.findIndex(cat => cat.name === categoryName)
  }
}

const closeDropdown = () => {
  if (!isMouseInDropdown.value) {
    activeDropdown.value = null
    focusedIndex.value = -1
    currentCategoryIndex.value = -1
  }
}

const handleMouseEnter = (categoryName: string) => {
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
  openDropdown(categoryName)
}

const handleMouseLeave = () => {
  dropdownTimeout.value = window.setTimeout(() => {
    closeDropdown()
  }, 100) // Délai réduit pour une meilleure réactivité
}

const handleDropdownMouseEnter = () => {
  isMouseInDropdown.value = true
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
}

const handleDropdownMouseLeave = () => {
  isMouseInDropdown.value = false
  dropdownTimeout.value = window.setTimeout(() => {
    closeDropdown()
  }, 100)
}

// Gestion clavier améliorée
const handleKeyDown = (event: KeyboardEvent, categoryName: string) => {
  const categoryIndex = menuCategories.findIndex(cat => cat.name === categoryName)
  const category = menuCategories[categoryIndex]

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (activeDropdown.value === categoryName) {
        closeDropdown()
      } else {
        openDropdown(categoryName)
        focusedIndex.value = 0
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      if (activeDropdown.value === categoryName) {
        focusedIndex.value = Math.min(focusedIndex.value + 1, category.items.length - 1)
      } else {
        openDropdown(categoryName)
        focusedIndex.value = 0
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (activeDropdown.value === categoryName) {
        focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      }
      break
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
  }
}

const handleDropdownKeyDown = (event: KeyboardEvent, categoryName: string) => {
  const categoryIndex = menuCategories.findIndex(cat => cat.name === categoryName)
  const category = menuCategories[categoryIndex]

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusedIndex.value = Math.min(focusedIndex.value + 1, category.items.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (focusedIndex.value >= 0 && focusedIndex.value < category.items.length) {
        navigateTo(category.items[focusedIndex.value].path)
      }
      break
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
  }
}

// Gestion mobile améliorée
const toggleMobileCategory = (categoryName: string) => {
  if (mobileOpenCategories.value.has(categoryName)) {
    mobileOpenCategories.value.delete(categoryName)
  } else {
    mobileOpenCategories.value.add(categoryName)
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    mobileOpenCategories.value.clear()
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  mobileOpenCategories.value.clear()
}

// Gestion améliorée des clics à l'extérieur
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement

  // Vérifier si le clic est en dehors du header
  if (!target.closest('.header')) {
    closeDropdown()
    if (isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }
}

// Gestion du focus pour l'accessibilité
const handleFocusIn = (event: FocusEvent) => {
  const target = event.target as HTMLElement
  if (target.closest('.nav-category')) {
    const categoryName = target.closest('.nav-category')?.getAttribute('data-category')
    if (categoryName) {
      openDropdown(categoryName)
    }
  }
}

const handleFocusOut = (event: FocusEvent) => {
  const target = event.target as HTMLElement
  const relatedTarget = event.relatedTarget as HTMLElement

  // Vérifier si le focus reste dans le même menu
  if (!relatedTarget?.closest('.nav-category') ||
      !target.closest('.nav-category')?.isSameNode(relatedTarget.closest('.nav-category'))) {
    setTimeout(() => {
      if (!document.activeElement?.closest('.nav-category')) {
        closeDropdown()
      }
    }, 10)
  }
}

const navigateTo = (route: string) => {
  router.push(route)
  closeDropdown()
  closeMobileMenu()
}

// Nettoyage des timeouts
const clearAllTimeouts = () => {
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('focusin', handleFocusIn)
  document.addEventListener('focusout', handleFocusOut)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('focusin', handleFocusIn)
  document.removeEventListener('focusout', handleFocusOut)
  clearAllTimeouts()
})
</script>

<template>
  <div class="app">
    <!-- Header avec Navigation intégrée -->
    <header class="header">
      <div class="nav-container">
        <div class="nav-logo">
          <img
            @click="navigateTo('/')"
            src="/icons/logo.svg"
            alt="Logo"
            style="cursor: pointer; height: 30px; width: auto; filter: brightness(0) invert(1);"
          />
        </div>

        <!-- Navigation Desktop -->
        <nav class="nav-menu desktop-menu" role="navigation" aria-label="Navigation principale">
          <div
            v-for="(category, index) in menuCategories"
            :key="category.name"
            class="nav-category"
            :data-category="category.name"
            @mouseenter="handleMouseEnter(category.name)"
            @mouseleave="handleMouseLeave"
          >
            <button
              class="nav-category-btn"
              :aria-expanded="activeDropdown === category.name"
              :aria-haspopup="true"
              :aria-controls="`dropdown-${category.name}`"
              @keydown="handleKeyDown($event, category.name)"
              @focus="openDropdown(category.name)"
            >
              {{ category.name }}
            </button>

            <div
              v-if="activeDropdown === category.name"
              :id="`dropdown-${category.name}`"
              class="dropdown-menu"
              role="menu"
              @mouseenter="handleDropdownMouseEnter"
              @mouseleave="handleDropdownMouseLeave"
            >
              <button
                v-for="(item, itemIndex) in category.items"
                :key="item.path"
                :class="['dropdown-item', { 'focused': focusedIndex === itemIndex }]"
                role="menuitem"
                @click="navigateTo(item.path)"
                @keydown="handleDropdownKeyDown($event, category.name)"
                @focus="focusedIndex = itemIndex"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
        </nav>

        <!-- Bouton menu mobile -->
        <button
          class="nav-toggle"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          :aria-controls="'mobile-menu'"
          aria-label="Menu mobile"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Navigation Mobile -->
      <nav
        :id="'mobile-menu'"
        class="nav-menu mobile-menu"
        :class="{ 'nav-menu-open': isMobileMenuOpen }"
        role="navigation"
        aria-label="Menu mobile"
      >
        <div
          v-for="category in menuCategories"
          :key="category.name"
          class="nav-category"
        >
          <button
            class="nav-category-btn"
            :aria-expanded="mobileOpenCategories.has(category.name)"
            :aria-controls="`mobile-dropdown-${category.name}`"
            @click="toggleMobileCategory(category.name)"
          >
            {{ category.name }}
          </button>

          <div
            :id="`mobile-dropdown-${category.name}`"
            v-if="mobileOpenCategories.has(category.name)"
            class="dropdown-menu show"
            role="menu"
          >
            <button
              v-for="item in category.items"
              :key="item.path"
              @click="navigateTo(item.path)"
              class="dropdown-item"
              role="menuitem"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Overlay pour mobile -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
      aria-hidden="true"
    ></div>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Maelle Bourmeyster. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Les styles sont maintenant dans src/styles/main.scss */
</style>
