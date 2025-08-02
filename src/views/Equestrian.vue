<template>
  <div class="equestrian-page">
    <div class="container">
      <h1>Ma Passion Équestre</h1>
      <p>Page en cours de développement...</p>
      <router-link to="/" class="back-link">← Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<style scoped>
.equestrian-page {
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

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.back-link {
  color: #00ff88;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #fff;
}
</style> 