<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo-link">
        <img src="~/assets/img/RHC_RVB.jpg" alt="RH Conseil 71" class="logo" />
      </NuxtLink>

      <nav class="main-nav" aria-label="Navigation principale">
        <ul class="nav-list">
          <li><NuxtLink to="/qui-sommes-nous" class="nav-link">Qui sommes-nous ?</NuxtLink></li>
          <li><NuxtLink to="/que-faisons-nous" class="nav-link">Que faisons-nous ?</NuxtLink></li>
          <li><NuxtLink to="/particuliers" class="nav-link">Particuliers</NuxtLink></li>
          <li><NuxtLink to="/offres-emplois" class="nav-link">Offres d'emplois</NuxtLink></li>
          <li><NuxtLink to="/contact" class="nav-link">Contact</NuxtLink></li>
        </ul>
      </nav>

      <button class="burger" @click="menuOpen = !menuOpen" aria-label="Ouvrir le menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav class="mobile-nav" :class="{ open: menuOpen }" aria-label="Navigation mobile">
      <ul class="mobile-nav-list">
        <li><NuxtLink to="/qui-sommes-nous" class="mobile-nav-link" @click="menuOpen = false">Qui sommes-nous ?</NuxtLink></li>
        <li><NuxtLink to="/que-faisons-nous" class="mobile-nav-link" @click="menuOpen = false">Que faisons-nous ?</NuxtLink></li>
        <li><NuxtLink to="/particuliers" class="mobile-nav-link" @click="menuOpen = false">Particuliers</NuxtLink></li>
        <li><NuxtLink to="/offres-emplois" class="mobile-nav-link" @click="menuOpen = false">Offres d'emplois</NuxtLink></li>
        <li><NuxtLink to="/contact" class="mobile-nav-link" @click="menuOpen = false">Contact</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const menuOpen = ref(false)
</script>

<style scoped>
.site-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}


.logo-link {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}

/* Navigation desktop */
.main-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: 0.92rem;
  font-weight: 400;
  color: #2d3748;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #e91e8c;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.burger span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #2d3748;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-nav {
  display: none;
  background: #ffffff;
  border-top: 1px solid #e8e8e8;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
}

.mobile-nav.open {
  max-height: 400px;
}

.mobile-nav-list {
  list-style: none;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: 1rem;
  color: #2d3748;
  padding: 0.6rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: block;
  transition: color 0.2s ease;
}

.mobile-nav-link:hover {
  color: #e91e8c;
}

@media (max-width: 900px) {
  .main-nav {
    display: none;
  }

  .burger {
    display: flex;
  }

  .mobile-nav {
    display: block;
  }
}
</style>
