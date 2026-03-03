<script setup>
const { data: news } = await useFetch('/api/news')
const { data: services } = await useFetch('/api/services')
</script>

<template>
  <div>
    <section class="hero-section">
      <div class="hero-inner">
        <div class="hero-text">
          <h1 class="hero-title">
            Une <span class="hero-accent">diversité</span> de&nbsp;compétences pour agir
          </h1>
        </div>
        <div class="hero-img">
          <img src="~/assets/img/Bloc_Accueil.webp" alt="RH Conseil 71 — Diversité de compétences" />
        </div>
      </div>
    </section>

    <!-- Dashboard Section -->
    <section class="dashboard-section">
      <div class="dashboard-inner">

        <!-- Colonne gauche: 2 cards statiques -->
        <div class="left-col">
          <div class="stat-card">
            <div class="stat-card-body">
              <span class="stat-card-label">Statistiques</span>
              <h2 class="stat-card-title">Statistiques 2024-2025</h2>
            </div>
          </div>
          <div class="stat-card actu">
            <div class="stat-card-body">
              <span class="stat-card-label">Agenda</span>
              <h2 class="stat-card-title">Actualités du moment !</h2>
            </div>
          </div>
        </div>

        <!-- Colonne droite: grille dynamique de services -->
        <div class="right-col">
          <div class="services-grid">
            <div
              v-for="service in services"
              :key="service.id"
              class="service-card"
              :style="{ backgroundColor: service.color }"
            >
              <span class="service-title">{{ service.title }}</span>
              <img
                v-if="service.logo"
                :src="`/logos/${service.logo}`"
                :alt="service.title"
                class="service-logo"
              />
            </div>
            <div v-if="!services || services.length === 0" class="service-empty">
              Aucun service configuré.<br />
              <NuxtLink to="/admin/services" class="text-white underline text-sm">Configurer →</NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- News Section -->
    <div class="container mx-auto px-4 py-16">
      <header class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-slate-800 mb-2">Actualités RH Conseil</h2>
        <div class="w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </header>

      <div v-if="news && news.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="item in news" :key="item.id" class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col">
          <div class="p-6 flex-grow">
            <div class="flex items-center text-sm text-blue-600 font-medium mb-3">
              <time :datetime="item.date">{{ new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}</time>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3 leading-tight">{{ item.title }}</h2>
            <p class="text-slate-600 line-clamp-4">{{ item.content }}</p>
          </div>
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <button class="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">Lire la suite →</button>
          </div>
        </article>
      </div>

      <div v-else class="text-center py-20">
        <div class="text-slate-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p class="text-xl text-slate-500">Aucune actualité disponible pour le moment.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === Hero === */
.hero-section {
  background-color: #efefef;
  margin-top: 70px;
  width: 100%;
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0;
  min-height: 300px;
  overflow: hidden;
}

.hero-text {
  flex: 0 0 36%;
  padding: 3.5rem 2.5rem 3.5rem 3rem;
}

.hero-title {
  font-size: clamp(1.6rem, 3vw, 2.6rem);
  font-weight: 700;
  line-height: 1.25;
  color: #1a1a2e;
}

.hero-accent {
  color: #e91e8c;
}

.hero-img {
  flex: 0 0 64%;
  align-self: stretch;
  overflow: hidden;
}

.hero-img img {
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
  object-position: left center;
  display: block;
}

/* === News === */
.container {
  max-width: 1200px;
}

/* === Responsive === */
@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    min-height: auto;
  }

  .hero-text {
    flex: none;
    width: 100%;
    padding: 2rem 1.5rem 1rem;
  }

  .hero-img {
    flex: none;
    width: 100%;
  }

  .hero-img img {
    min-height: auto;
    object-fit: contain;
  }
}

/* === Dashboard === */
.dashboard-section {
  background: #efefef;
  padding: 2rem 0 3rem;
}

.dashboard-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
}

/* Left column */
.left-col {
  flex: 0 0 38%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.stat-card {
  flex: 1;
  border-radius: 16px;
  overflow: hidden;
  background: #4a1942;
  position: relative;
  min-height: 160px;
  display: flex;
  align-items: flex-end;
}

.stat-card.actu {
  background: #2d4a3e;
}

.stat-card-body {
  padding: 1.5rem;
  z-index: 1;
  position: relative;
}

.stat-card-label {
  display: block;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.6);
  margin-bottom: 0.4rem;
}

.stat-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

/* Right column */
.right-col {
  flex: 1;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.service-card {
  border-radius: 14px;
  min-height: 110px;
  padding: 1.25rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.service-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  position: relative;
  z-index: 1;
}

.service-logo {
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  width: 52px;
  height: 52px;
  object-fit: contain;
  opacity: 0.18;
}

.service-empty {
  grid-column: 1 / -1;
  background: rgba(0,0,0,0.1);
  border-radius: 14px;
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

/* === Responsive === */
@media (max-width: 900px) {
  .dashboard-inner {
    flex-direction: column;
  }

  .left-col {
    flex-direction: row;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    min-height: auto;
  }

  .hero-text {
    flex: none;
    width: 100%;
    padding: 2rem 1.5rem 1rem;
  }

  .hero-img {
    flex: none;
    width: 100%;
  }

  .hero-img img {
    min-height: auto;
    object-fit: contain;
  }

  .left-col {
    flex-direction: column;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>