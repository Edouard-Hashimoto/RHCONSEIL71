<script setup>
definePageMeta({ middleware: 'auth' })

const { data: news, refresh } = await useFetch('/api/news')
const newArticle = ref({ title: '', content: '' })
const isSending = ref(false)

const addArticle = async () => {
  if (!newArticle.value.title || !newArticle.value.content) return
  isSending.value = true
  try {
    await $fetch('/api/news', { method: 'POST', body: newArticle.value })
    newArticle.value = { title: '', content: '' }
    await refresh()
  } catch (e) {
    alert("Erreur lors de l'ajout")
  } finally {
    isSending.value = false
  }
}

const deleteArticle = async (id) => {
  if (!confirm('Supprimer définitivement cette actualité ?')) return
  try {
    await $fetch('/api/news', { method: 'DELETE', body: { id } })
    await refresh()
  } catch (e) {
    alert("Erreur lors de la suppression")
  }
}

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    navigateTo('/admin/login')
  } catch (e) {
    alert("Erreur lors de la déconnexion")
  }
}
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="sidebar-logo">RH</span>
        <div>
          <p class="sidebar-title">RH Conseil 71</p>
          <p class="sidebar-subtitle">Administration</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <p class="nav-section-label">Contenu</p>
        <NuxtLink to="/admin" class="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>
          Actualités
        </NuxtLink>
        <NuxtLink to="/admin/services" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          Services
        </NuxtLink>

        <p class="nav-section-label">Outils</p>
        <NuxtLink to="/admin/database" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
          Base de données
        </NuxtLink>
        <NuxtLink to="/" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
          Voir le site
        </NuxtLink>

        <button @click="handleLogout" class="nav-item logout-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
          Déconnexion
        </button>
      </nav>
    </aside>

    <div class="main-content">
      <header class="page-header">
        <div>
          <h1 class="page-title">Actualités</h1>
          <p class="page-desc">Gérez les articles affichés sur le site</p>
        </div>
        <div class="header-stats">
          <div class="stat-pill">
            <span class="stat-value">{{ news?.length ?? 0 }}</span>
            <span class="stat-label">article(s)</span>
          </div>
        </div>
      </header>

      <section class="card">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nouvel article
        </h2>
        <form @submit.prevent="addArticle" class="form-grid">
          <div class="field">
            <label>Titre</label>
            <input v-model="newArticle.title" type="text" placeholder="Titre de l'actualité" required />
          </div>
          <div class="field span-full">
            <label>Contenu</label>
            <textarea v-model="newArticle.content" rows="5" placeholder="Rédigez le contenu de l'article..." required></textarea>
          </div>
          <div class="span-full">
            <button type="submit" :disabled="isSending" class="btn-primary">
              <span v-if="isSending" class="spinner"></span>
              {{ isSending ? 'Publication...' : 'Publier l\'article' }}
            </button>
          </div>
        </form>
      </section>

      <section class="card">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
          Articles publiés
        </h2>
        <div v-if="!news || news.length === 0" class="empty-state">
          Aucun article publié pour le moment.
        </div>
        <div v-else class="news-list">
          <div v-for="item in news" :key="item.id" class="news-item">
            <div class="news-item-info">
              <span class="news-date">{{ new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
              <p class="news-title">{{ item.title }}</p>
              <p class="news-preview">{{ item.content.slice(0, 120) }}{{ item.content.length > 120 ? '…' : '' }}</p>
            </div>
            <button @click="deleteArticle(item.id)" class="btn-delete" title="Supprimer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

.sidebar {
  width: 240px;
  background: #1a1a2e;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sidebar-logo {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #e91e8c, #9c1b5e);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.85rem;
  color: #fff;
  flex-shrink: 0;
}

.sidebar-title {
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.sidebar-subtitle {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.nav-section-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
  padding: 0.6rem 0.6rem 0.3rem;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  transition: all 0.2s;
  text-decoration: none;
}

.nav-item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.nav-item:hover, .nav-item.active {
  background: rgba(255,255,255,0.08);
  color: #fff;
}

.nav-item.active {
  background: rgba(233,30,140,0.2);
  color: #f472b6;
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  color: rgba(255,100,100,0.65);
}

.logout-btn:hover {
  background: rgba(239,68,68,0.12);
  color: #f87171;
}

.sidebar-logout {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
  color: rgba(255,255,255,0.45);
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;
  text-align: left;
  width: 100%;
}

.sidebar-logout svg { width: 18px; height: 18px; }
.sidebar-logout:hover { color: #f87171; }

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.page-desc {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
}

.header-stats {
  display: flex;
  gap: 0.75rem;
}

.stat-pill {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 0.4rem 0.9rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: #e91e8c;
}

.stat-label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.25rem;
}

.card-title svg { width: 18px; height: 18px; flex-shrink: 0; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.span-full { grid-column: 1 / -1; }

.field label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 0.4rem;
}

.field input, .field textarea {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #1e293b;
  background: #f8fafc;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  resize: vertical;
}

.field input:focus, .field textarea:focus {
  border-color: #e91e8c;
  box-shadow: 0 0 0 3px rgba(233,30,140,0.08);
  background: #fff;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #e91e8c, #9c1b5e);
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.news-list { display: flex; flex-direction: column; gap: 0; }

.news-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.news-item:last-child { border-bottom: none; }

.news-date {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #e91e8c;
  margin-bottom: 0.2rem;
}

.news-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #1e293b;
  margin: 0 0 0.3rem;
}

.news-preview {
  font-size: 0.82rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.5;
}

.btn-delete {
  padding: 0.4rem;
  background: none;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  color: #fca5a5;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
}

.btn-delete svg { width: 16px; height: 16px; display: block; }
.btn-delete:hover { background: #fef2f2; border-color: #fca5a5; color: #ef4444; }

.empty-state {
  padding: 3rem;
  text-align: center;
  font-size: 0.9rem;
  color: #94a3b8;
}
</style>
